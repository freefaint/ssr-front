namespace Bivgroup.YagokSSR.SmartApp.Models
{
    public class NotificationChannel
    {
        public Guid Id { get; set; }
       
        public int MinutesFromNow { get; set; }
        public int MinutesToNow { get; set; }
        public decimal ReferenceValue { get; set; }

        //0 - any,-1 down,1 - up
        public int TriggerVectorFlag { get; set; }

        //Dont Create new notification if absolute value change smaller than what value
        public decimal Hysteresis { get; set; }
        public string FullName { get; set; }
        //mostly for frontend usage
        public string InternalName { get; set; }
        public string Comment { get; set; }
        //@from @to in ApiPathMask is replaced with Now-MinutesFromNow and Now+MinutesToNow
        public string  ApiPathMask { get; set; }

        //@value in HumanReadableValueMask is replaced to value from api - sample Груз превысил @value тонн = Груз 10 тонн
        public string HumanReadableValueMask { get; set; }

        public string? CreatorSynapseUID { get; set; }

        //Autovalue
        public DateTime LastTriggerDate { get; set; }
        //Autovalue
        public string? LastValue { get; set; }

        public bool Disabled { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
