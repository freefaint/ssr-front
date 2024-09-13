namespace Bivgroup.YagokSSR.SmartApp.Models;

public class ReplaceSettings
{
    public ReplaceItem[] ReplaceItems { get; private set; }

    public ReplaceSettings(ReplaceItem[] replaceItems)
    {
        ReplaceItems = replaceItems;
    }
}