namespace Cocktails.Common.Unit.Tests.Emails;

using Cocktails.Common.Emails;
using FluentAssertions;

public class EmailAddressTests
{
    [Fact]
    public void emailaddress_displayname_set_get()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var expected = "John Doe";

        // Act
        emailAddress.DisplayName = expected;
        var actual = emailAddress.DisplayName;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_address_set_get()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var expected = "rvecchi@gmail.com";

        // Act
        emailAddress.Address = expected;
        var actual = emailAddress.Address;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_fulladdress_empty_displayname_and_address()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var expected = string.Empty;

        // Act
        var actual = emailAddress.FullAddress();

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_fulladdress_empty_address()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var displayName = "John Doe";
        emailAddress.DisplayName = displayName;
        var expected = displayName;

        // Act
        var actual = emailAddress.FullAddress();

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_fulladdress_empty_displayname()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var address = "rvecchi@gmail.com";
        emailAddress.Address = address;
        var expected = address;

        // Act
        var actual = emailAddress.FullAddress();

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_fulladdress_with_displayname_and_address()
    {
        // Arrange
        var emailAddress = new EmailAddress();
        var displayName = "John Doe";
        var address = "rvecchi@gmail.com";
        emailAddress.DisplayName = displayName;
        emailAddress.Address = address;
        var expected = $"{displayName} <{address}>";

        // Act
        var actual = emailAddress.FullAddress();

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_joinstring_empty_emails()
    {
        // Arrange
        var emails = new List<EmailAddress>();
        var separator = ", ";
        var expected = string.Empty;

        // Act
        var actual = emails.JoinString(separator);

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_joinstring_single_email()
    {
        // Arrange
        var emails = new List<EmailAddress>
        {
            new() { DisplayName = "John Doe", Address = "johndoe@gmail.com" }
        };
        var separator = ", ";
        var expected = "John Doe <johndoe@gmail.com>";

        // Act
        var actual = emails.JoinString(separator);

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailaddress_joinstring_multiple_emails()
    {
        // Arrange
        var emails = new List<EmailAddress>
        {
            new() { DisplayName = "John Doe", Address = "johndoe@gmail.com" },
            new() { DisplayName = "Jane Smith", Address = "janesmith@gmail.com" },
            new() { DisplayName = "Bob Johnson", Address = "bobjohnson@gmail.com" }
        };
        var separator = ", ";
        var expected = "John Doe <johndoe@gmail.com>, Jane Smith <janesmith@gmail.com>, Bob Johnson <bobjohnson@gmail.com>";

        // Act
        var actual = emails.JoinString(separator);

        // Assert
        actual.Should().Be(expected);
    }
}
