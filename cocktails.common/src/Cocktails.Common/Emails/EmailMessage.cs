namespace Cocktails.Common.Emails;

/// <summary>
/// 
/// </summary>
public class EmailMessage
{
    /// <summary>Gets or sets to.</summary>
    /// <value>To.</value>
    public IList<EmailAddress> To { get; set; } = [];

    /// <summary>Gets or sets the cc.</summary>
    /// <value>The cc.</value>
    public IList<EmailAddress> Cc { get; set; } = [];

    /// <summary>Gets or sets the BCC.</summary>
    /// <value>The BCC.</value>
    public IList<EmailAddress> Bcc { get; set; } = [];

    /// <summary>Gets or sets from.</summary>
    /// <value>From.</value>
    public EmailAddress From { get; set; }

    /// <summary>Gets or sets the reply to.</summary>
    /// <value>The reply to.</value>
    public EmailAddress ReplyTo { get; set; }

    /// <summary>Gets or sets the subject.</summary>
    /// <value>The subject.</value>
    public string Subject { get; set; }

    /// <summary>Gets or sets the body.</summary>
    /// <value>The body.</value>
    public string Body { get; set; }

    /// <summary>Gets or sets the priority.</summary>
    /// <value>The priority.</value>
    public EmailPriority Priority { get; set; } = EmailPriority.Normal;

    /// <summary>Gets or sets the attachments.</summary>
    /// <value>The attachments.</value>
    public IList<EmailAttachment> Attachments { get; set; } = [];

    /// <summary>Gets or sets the correlation identifier.</summary>
    /// <value>The correlation identifier.</value>
    public string CorrelationId { get; set; }
}
