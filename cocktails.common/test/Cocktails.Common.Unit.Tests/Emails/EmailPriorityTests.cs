namespace Cocktails.Common.Unit.Tests.Emails;

using Cocktails.Common.Emails;
using FluentAssertions;

public class EmailPriorityTests
{
    [Fact]
    public void emailpriority_enum_value_normal()
    {
        // Arrange
        var expected = 0;

        // Act
        var actual = (int)EmailPriority.Normal;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailpriority_enum_value_low()
    {
        // Arrange
        var expected = 1;

        // Act
        var actual = (int)EmailPriority.Low;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailpriority_enum_value_high()
    {
        // Arrange
        var expected = 2;

        // Act
        var actual = (int)EmailPriority.High;

        // Assert
        actual.Should().Be(expected);
    }
}
