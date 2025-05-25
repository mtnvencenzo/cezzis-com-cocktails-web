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
    private List<Cocktail> cachedCocktails;
    private List<Ingredient> cachedIngredients;

    public IUnitOfWork UnitOfWork => dbContext;

    public IQueryable<Cocktail> CachedItems
    {
        get
        {
            if (this.cachedCocktails == null)
            {
                using (loadSync.EnterScope())
                {
                    if (this.cachedCocktails == null)
                    {
                        this.cachedCocktails ??= Task.Run(() => dbContext.Cocktails.AsNoTracking().ToListAsync()).Result;
                        this.cachedIngredients = [.. ingredientRepository.CachedItems];

                        foreach (var cocktail in this.cachedCocktails)
                        {
                            cocktail.Ingredients.ForEach(ci =>
                            {
                                ci.SetBaseIngredient(this.cachedIngredients.First(x => x.Id == ci.IngredientId));
                            });
                        }
                    }
                }
            }

            return this.cachedCocktails.AsQueryable();
        }
    }

    public IQueryable<Cocktail> Items => dbContext.Cocktails;

    public Cocktail Add(Cocktail cocktail) => dbContext.Cocktails.Add(cocktail).Entity;

    public async Task<Cocktail> GetAsync(string cocktailId, CancellationToken cancellationToken) => await dbContext.Cocktails
        .WithPartitionKey(cocktailId)
        .FirstOrDefaultAsync(x => x.Id == cocktailId, cancellationToken);

    public void Update(Cocktail cocktail) => dbContext.Entry(cocktail).State = EntityState.Modified;

    public void ClearCache() => this.cachedCocktails = null;

    public void UpdateCache(Cocktail cocktail)
    {
        if (this.cachedCocktails == null)
        {
            return;
        }

        using (loadSync.EnterScope())
        {
            var existing = this.cachedCocktails.FirstOrDefault(x => x.Id == cocktail.Id);

            if (existing != null)
            {
                var index = this.cachedCocktails.IndexOf(existing);
                this.cachedCocktails.Remove(existing);
                this.cachedCocktails.Insert(index, cocktail);
            }
            else
            {
                this.cachedCocktails.Add(cocktail);
            }
        }
    }
}