using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DemoTwo.Migrations
{
    /// <inheritdoc />
    public partial class addAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    AdminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConfirmPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.AdminId);
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "AdminId", "AdminName", "ConfirmPassword", "Email", "Password", "Role" },
                values: new object[,]
                {
                    { 1, "Rehan", "zF1HHEnSpamFoS32oGfKmw==.MbGks0bfJJb2ORZgE4O7EO5h4DKG1MxJ/tBIIS6XvDE=", "Rehan@gmail.com", "BKHq8ecNmFVXvpf0+WzKeQ==.tEdin7rNKVoBwAshqB0D0GM9WqBLVzobp+Uj/durswY=", "Owner" },
                    { 2, "Sai Chandra", "wotAr2NokhgkCMujnGcpvQ==.8+RLi5YFfblhrCjcCzpDlB26C9oSn5WA46iKmSf31x8=", "Sai@gmail.com", "ZBDLFEGFj0yNPknEOjBt3A==.bxqX1iHxi82tS/Oa2Y62pHhirgDyWis/zk91whrlWG0=", "Manager" },
                    { 3, "Sashi", "3n6oIiufXwcTl1XKboMFOw==.k1Vgtm6+bePdwBSuSd2xm3XAD+7wIH0bRlrM3aQIPkk=", "Sashi@gmail.com", "iZW0+5MIuFwHer1SMxqmvA==.eMcz8s+nskLT0Y8n4Xpw1s3XpcKaXXKxdzEcjlo3+Bs=", "Receptionist" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");
        }
    }
}
