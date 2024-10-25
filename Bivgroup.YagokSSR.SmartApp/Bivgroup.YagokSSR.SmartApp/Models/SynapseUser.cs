namespace Bivgroup.YagokSSR.SmartApp.Models
{
    public class SynapseUser
    {
        public Guid Id { get; set; }
        public string? SynapseUID { get; set; }

        public string? SynapseName { get; set; }
        public string? Comment { get; set; }
        public bool isBlocked { get; set; }

        public bool isServiceAdmin { get; set; }
    }
}
