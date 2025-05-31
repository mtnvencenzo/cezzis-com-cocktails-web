namespace Cocktails.Api.Infrastructure.Repositories;

using Cezzi.Applications.Extensions;
using Cocktails.Api.Domain.Aggregates.CocktailAggregate;
using Cocktails.Api.Domain.Aggregates.IngredientAggregate;
using Cocktails.Api.Domain.Common;
using Cocktails.Api.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;

public class CocktailRepository(CocktailDbContext dbContext, IIngredientRepository ingredientRepository) : ICocktailRepository
{
    private readonly static Lock loadSync = new();
    private static List<Cocktail> cachedCocktails;
    private List<Ingredient> cachedIngredients;

    public IUnitOfWork UnitOfWork => dbContext;

    public IQueryable<Cocktail> CachedItems
    {
        get
        {
            if (cachedCocktails == null)
            {
                using (loadSync.EnterScope())
                {
                    if (cachedCocktails == null)
                    {
                        cachedCocktails ??= Task.Run(() => dbContext.Cocktails.AsNoTracking().ToListAsync()).Result;
                        cachedCocktails = [.. cachedCocktails.OrderBy(x => x.Title)];

                        foreach (var cocktail in cachedCocktails)
                        {
                            _ = this.PrepareCocktail(cocktail);
                        }
                    }
                }
            }

            return cachedCocktails.AsQueryable();
        }
    }

    public IQueryable<Cocktail> Items => dbContext.Cocktails;

    public Cocktail Add(Cocktail cocktail) => dbContext.Cocktails.Add(cocktail).Entity;

    public async Task<Cocktail> GetAsync(string cocktailId, CancellationToken cancellationToken)
    {
        var cocktail = await dbContext.Cocktails
            .WithPartitionKey(cocktailId)
            .FirstOrDefaultAsync(x => x.Id == cocktailId, cancellationToken);

        return this.PrepareCocktail(cocktail);
    }

    public void Update(Cocktail cocktail) => dbContext.Entry(cocktail).State = EntityState.Modified;

    public void ClearCache() => cachedCocktails = null;

    public void UpdateCache(Cocktail cocktail)
    {
        if (cachedCocktails == null)
        {
            return;
        }

        using (loadSync.EnterScope())
        {
            var existing = cachedCocktails.FirstOrDefault(x => x.Id == cocktail.Id);

            if (existing != null)
            {
                var index = cachedCocktails.IndexOf(existing);
                cachedCocktails.Remove(existing);
                cachedCocktails.Insert(index, cocktail);
            }
            else
            {
                cachedCocktails.Add(cocktail);
            }
        }
    }

    private Cocktail PrepareCocktail(Cocktail cocktail)
    {
        this.cachedIngredients = [.. ingredientRepository.CachedItems];

        cocktail.Ingredients.ForEach(ci =>
        {
            ci.SetBaseIngredient(this.cachedIngredients.First(x => x.Id == ci.IngredientId));
        });

        return cocktail;
    }
}