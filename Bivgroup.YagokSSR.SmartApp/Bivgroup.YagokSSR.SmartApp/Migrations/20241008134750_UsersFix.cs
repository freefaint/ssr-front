using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bivgroup.YagokSSR.SmartApp.Migrations
{
    public partial class UsersFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "SynapseUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SynapseName",
                table: "SynapseUsers",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "SynapseUsers");

            migrationBuilder.DropColumn(
                name: "SynapseName",
                table: "SynapseUsers");
        }
    }
}
