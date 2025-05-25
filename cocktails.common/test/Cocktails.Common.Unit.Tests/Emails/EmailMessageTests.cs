namespace Cocktails.Common.Unit.Tests.Emails;

using Cocktails.Common.Emails;
using FluentAssertions;

public class EmailMessageTests
{
    [Fact]
    public void emailmessage_subject_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = "My Subject";

        // Act
        emailMessage.Subject = expected;
        var actual = emailMessage.Subject;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailmessage_body_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = "My Body";

        // Act
        emailMessage.Body = expected;
        var actual = emailMessage.Body;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailmessage_correlationid_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = "My CorrelationId";

        // Act
        emailMessage.CorrelationId = expected;
        var actual = emailMessage.CorrelationId;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailmessage_priority_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = EmailPriority.High;

        // Act
        emailMessage.Priority = expected;
        var actual = emailMessage.Priority;

        // Assert
        actual.Should().Be(expected);
    }

    [Fact]
    public void emailmessage_from_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = new EmailAddress { DisplayName = "John Doe", Address = "rvecchi@gmail.com" };

        // Act
        emailMessage.From = expected;
        var actual = emailMessage.From;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_replyto_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        var expected = new EmailAddress { DisplayName = "John Doe", Address = "rvecchi@gmail.com" };

        // Act
        emailMessage.ReplyTo = expected;
        var actual = emailMessage.ReplyTo;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_to_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected = [];

        // Act
        emailMessage.To = expected;
        var actual = emailMessage.To;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_to_with_item_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected =
        [
            new EmailAddress { DisplayName = "John Doe", Address = "rvecchi@gmail.com" }
        ];

        // Act
        emailMessage.To = expected;
        var actual = emailMessage.To;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_bcc_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected = [];

        // Act
        emailMessage.Bcc = expected;
        var actual = emailMessage.Bcc;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_bcc_with_item_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected =
        [
            new EmailAddress { DisplayName = "John Doe", Address = "rvecchi@gmail.com" }
        ];

        // Act
        emailMessage.Bcc = expected;
        var actual = emailMessage.Bcc;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_cc_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected = [];

        // Act
        emailMessage.Cc = expected;
        var actual = emailMessage.Cc;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_cc_with_item_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAddress> expected =
        [
            new EmailAddress { DisplayName = "John Doe", Address = "rvecchi@gmail.com" }
        ];

        // Act
        emailMessage.Cc = expected;
        var actual = emailMessage.Cc;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_attachments_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAttachment> expected = [];

        // Act
        emailMessage.Attachments = expected;
        var actual = emailMessage.Attachments;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public void emailmessage_attachments_with_item_set_get()
    {
        // Arrange
        var emailMessage = new EmailMessage();
        IList<EmailAttachment> expected =
        [
            new EmailAttachment { Name = "file.txt", ContentType = "application/json", Identifier = "my-id" }
        ];

        // Act
        emailMessage.Attachments = expected;
        var actual = emailMessage.Attachments;

        // Assert
        actual.Should().BeEquivalentTo(expected);
    }
}
