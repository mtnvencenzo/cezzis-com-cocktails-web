namespace Cocktails.Common;

using System.Text.Json;
using System.Text.Json.Serialization;

/// <summary>
/// 
/// </summary>
public class EventSerializer
{
    private readonly static JsonSerializerOptions jsonSerializerOptions;

    static EventSerializer()
    {
        jsonSerializerOptions = new JsonSerializerOptions
        {
            AllowTrailingCommas = true,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        jsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(namingPolicy: JsonNamingPolicy.CamelCase, allowIntegerValues: true));
    }

    /// <summary>Froms the json string.</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="json">The json.</param>
    /// <returns></returns>
    public static T FromJsonString<T>(string json) => JsonSerializer.Deserialize<T>(json, jsonSerializerOptions);

    /// <summary>Converts to jsonstring.</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="messageObj">The message object.</param>
    /// <returns></returns>
    public static string ToJsonString<T>(T messageObj) => JsonSerializer.Serialize(messageObj, messageObj.GetType(), jsonSerializerOptions);

    /// <summary>Converts to utfbytes.</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="messageObj">The message object.</param>
    /// <returns></returns>
    public static byte[] ToUtfBytes<T>(T messageObj) => JsonSerializer.SerializeToUtf8Bytes(messageObj, messageObj.GetType(), jsonSerializerOptions);

    /// <summary>Froms the utf bytes.</summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="bytes">The bytes.</param>
    /// <returns></returns>
    public static T FromUtfBytes<T>(byte[] bytes) => JsonSerializer.Deserialize<T>(bytes, jsonSerializerOptions);
}
