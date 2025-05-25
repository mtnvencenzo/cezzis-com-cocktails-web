namespace Cocktails.Common.Emails;

/// <summary>
/// 
/// </summary>
public class EmailAddress
{
    /// <summary>Gets or sets the display name.</summary>
    /// <value>The display name.</value>
    public string DisplayName { get; set; }

    /// <summary>Gets or sets the address.</summary>
    /// <value>The address.</value>
    public string Address { get; set; }
}

/// <summary>
/// 
/// </summary>
public static class EmailAddressExtensions
{
    /// <summary>Gets the full address.</summary>
    /// <value>The full address.</value>
    public static string FullAddress(this EmailAddress email) => string.IsNullOrWhiteSpace(email?.DisplayName)
        ? email?.Address?.Trim() ?? string.Empty
        : $"{email.DisplayName} <{email.Address?.Trim()}>"?.Replace("<>", "").Trim();

    /// <summary>Joins the string.</summary>
    /// <param name="emails">The emails.</param>
    /// <param name="separator">The separator.</param>
    /// <returns></returns>
    public static string JoinString(this IEnumerable<EmailAddress> emails, string separator = ", ") =>
        string.Join(
            separator: separator,
            values: emails.Select(e => e.FullAddress()).Where(x => !string.IsNullOrWhiteSpace(x)));
}
