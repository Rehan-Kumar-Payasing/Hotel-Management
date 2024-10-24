using Microsoft.EntityFrameworkCore;
using DemoTwo.Models;
using DemoTwo.Services;

namespace DemoTwo.Models
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
        {
            // Additional configuration or initialization if needed
        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Inventory> InventoryItems { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Rate> Rate { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            Password a = new Password();
            modelBuilder.Entity<Admin>().HasData(new Admin()
            {
                AdminId = 1,
                AdminName = "Rehan",
                Email = "Rehan@gmail.com",
                Role = "Owner",
                Password = a.HashPassword("Rehan@123"),
                ConfirmPassword = a.HashPassword("Rehan@123")
            });
            modelBuilder.Entity<Admin>().HasData(new Admin()
            {
                AdminId = 2,
                AdminName = "Sai Chandra",
                Email = "Sai@gmail.com",
                Role = "Manager",
                Password = a.HashPassword("Sai@123"),
                ConfirmPassword = a.HashPassword("Sai@123")
            });
            modelBuilder.Entity<Admin>().HasData(new Admin()
            {
                AdminId = 3,
                AdminName = "Sashi",
                Email = "Sashi@gmail.com",
                Role = "Receptionist",
                Password = a.HashPassword("Sashi@123"),
                ConfirmPassword = a.HashPassword("Sashi@123")
            });

        }
    }

}
