using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bivgroup.YagokSSR.SmartApp.Migrations
{
    public partial class NotificationsStructs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isServiceAdmin",
                table: "SynapseUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "NotificationChannels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MinutesFromNow = table.Column<int>(type: "integer", nullable: false),
                    MinutesToNow = table.Column<int>(type: "integer", nullable: false),
                    ReferenceValue = table.Column<decimal>(type: "numeric", nullable: false),
                    TriggerVectorFlag = table.Column<int>(type: "integer", nullable: false),
                    Hysteresis = table.Column<decimal>(type: "numeric", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    InternalName = table.Column<string>(type: "text", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    ApiPathMask = table.Column<string>(type: "text", nullable: false),
                    HumanReadableValueMask = table.Column<string>(type: "text", nullable: false),
                    CreatorSynapseUID = table.Column<string>(type: "text", nullable: true),
                    LastTriggerDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastValue = table.Column<string>(type: "text", nullable: true),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationChannels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotificationSubscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NotificationChannelId = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false),
                    SynapseUID = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LastTriggerDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastValue = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotificationSubscriptions", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotificationChannels");

            migrationBuilder.DropTable(
                name: "NotificationSubscriptions");

            migrationBuilder.DropColumn(
                name: "isServiceAdmin",
                table: "SynapseUsers");
        }
    }
}
