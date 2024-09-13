using Newtonsoft.Json;

namespace Bivgroup.YagokSSR.SmartApp.Models;

public class ReplaceItem
{
    [JsonProperty("originalString")]
    public string OriginalString { get; set; }

    [JsonProperty("replacedString")]
    public string ReplacedString { get; set; }
}