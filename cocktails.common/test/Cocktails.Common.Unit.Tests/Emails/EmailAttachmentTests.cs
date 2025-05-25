namespace Cocktails.Common.Unit.Tests.Emails;

using Cocktails.Common.Emails;
using FluentAssertions;

public class EmailAttachmentTests
{
    [Fact]
    public void emailattachment_name_set_get()
    {
        // Arrange
        var emailAttachment = new EmailAttachment();
        var expected = "file.txt";

        // Act
        emailAttachment.Name = expected;
        var actual = emailAttachment.Name;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailattachment_contenttype_set_get()
    {
        // Arrange
        var emailAttachment = new EmailAttachment();
        var expected = "application/json";

        // Act
        emailAttachment.ContentType = expected;
        var actual = emailAttachment.ContentType;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailattachment_identifier_set_get()
    {
        // Arrange
        var emailAttachment = new EmailAttachment();
        var expected = "my-id";

        // Act
        emailAttachment.Identifier = expected;
        var actual = emailAttachment.Identifier;

        // Assert
        actual.Should().Be(expected);
    }
}
