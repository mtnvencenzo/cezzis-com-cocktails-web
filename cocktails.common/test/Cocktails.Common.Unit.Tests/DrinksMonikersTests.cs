namespace Cocktails.Common.Unit.Tests;

using Cocktails.Common;
using FluentAssertions;

public class CocktailsMonikersTests
{
    [Fact]
    public void cocktail_id_should_be_cz_cocktailid()
    {
        // Arrange
        var monikers = new CocktailsMonikers();

        // Act
        var cocktailId = monikers.CocktailId;

        // Assert
        cocktailId.Should().Be("@cz_cocktailid");
    }
}
