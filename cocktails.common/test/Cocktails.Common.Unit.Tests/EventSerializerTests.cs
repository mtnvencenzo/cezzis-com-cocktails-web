namespace Cocktails.Common.Unit.Tests;

using Cocktails.Common.Emails;
using FluentAssertions;

public class EventSerializerTests
{
    [Fact]
    public void eventserializer_serialize_round_trip_test()
    {
        var expected = new EmailMessage
        {
            Subject = "My Subject",
            Body = "My Body",
            CorrelationId = "My CorrelationId",
            Priority = EmailPriority.High,
            From = new EmailAddress
            {
                DisplayName = "John Doe",
                Address = "rvecchi@gmail.com"
            },
            ReplyTo = new EmailAddress
            {
                DisplayName = "Jane Doe",
                Address = "janedoe@cezzis.com"
            },
            Attachments =
            [
                new()
                {
                    Name = "MyFile.txt",
                    ContentType = "application/json",
                    Identifier = "MyId"
                },
                new()
                {
                    Name = "MyFile2.txt",
                    ContentType = "text/json",
                    Identifier = "MyId2"
                }
            ],
            Bcc =
            [
                new()
                {
                    DisplayName = "Bcc Doe",
                    Address = "bccdoe@cezzis.com"
                }
            ],
            Cc =
            [
                new()
                {
                    DisplayName = "Cc Doe",
                    Address = "ccdoe@cezzis.com"
                }
            ],
            To =
            [
                new()
                {
                    DisplayName = "To Doe",
                    Address = "todoe@cezzis.com"
                }
            ]
        };

        var json = EventSerializer.ToJsonString(expected);

        var actual = EventSerializer.FromJsonString<EmailMessage>(json);
        actual.Should().BeEquivalentTo(expected);

        var bytes = EventSerializer.ToUtfBytes(actual);
        actual = EventSerializer.FromUtfBytes<EmailMessage>(bytes);
        actual.Should().BeEquivalentTo(expected);
    }
}