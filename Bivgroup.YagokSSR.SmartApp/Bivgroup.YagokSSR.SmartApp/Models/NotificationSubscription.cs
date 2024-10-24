namespace Bivgroup.YagokSSR.SmartApp.Models
{
    public class NotificationSubscription
    {   //Autovalue (but used as parameter for enabling-disabling)
        public Guid Id { get; set; }

        public Guid NotificationChannelId { get; set; }
        public string FullName { get; set; }
        public string Comment { get; set; }
        public bool Disabled { get; set; }


        //Autovalue
        public string? SynapseUID { get; set; }
        //Autovalue
        public Guid UserId { get; set; }
        //Autovalue
        public DateTime LastTriggerDate { get; set; }
        //Autovalue
        public string LastValue { get; set; }
        //Autovalue
        public DateTime CreationDate { get; set; }

    }
}
