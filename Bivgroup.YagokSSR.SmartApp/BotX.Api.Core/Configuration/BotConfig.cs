using System.Collections.Generic;

namespace BotX.Api.Configuration;

public class BotConfig
{
    public string ApiBaseUrl { get; set; }

    public List<BotConfigEntry> BotConfigEntry { get; set; }
}