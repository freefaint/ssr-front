using Bivgroup.YagokSSR.SmartApp.Models;
using Microsoft.EntityFrameworkCore;

namespace Bivgroup.YagokSSR.SmartApp.PGContext
{
    public class PostgresContext:DbContext
    {
        public PostgresContext(DbContextOptions<PostgresContext> options)
              : base(options)
        {
        }
        public PostgresContext()
        {

        }
        public DbSet<SynapseUser> SynapseUsers{ get; set; }
        public DbSet<NotificationChannel> NotificationChannels  { get; set; }
        public DbSet<NotificationSubscription> NotificationSubscriptions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           
            base.OnConfiguring(optionsBuilder);
        }
    }
}
