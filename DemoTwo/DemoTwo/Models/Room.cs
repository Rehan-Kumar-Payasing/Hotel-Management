using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomId { get; set; }

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; }

        [Required]
        [StringLength(50)]
        [RoomType]  // Custom validation attribute
        public string RoomType { get; set; }

        [Required]
        [StringLength(20)]
        [Status]  // Custom validation attribute
        public string Status { get; set; }
    }

    public class RoomTypeAttribute : ValidationAttribute
    {
        private static readonly string[] AllowedRoomTypes = { "single", "double", "deluxe", "super deluxe" };

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var roomType = value as string;
            if (Array.Exists(AllowedRoomTypes, type => type.Equals(roomType, StringComparison.OrdinalIgnoreCase)))
            {
                return ValidationResult.Success;
            }
            return new ValidationResult("Invalid room type.");
        }
    }

    public class StatusAttribute : ValidationAttribute
    {
        private static readonly string[] AllowedStatuses = { "Available", "Booked", "Maintenance", "Cleaning" };

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var status = value as string;
            if (Array.Exists(AllowedStatuses, s => s.Equals(status, StringComparison.OrdinalIgnoreCase)))
            {
                return ValidationResult.Success;
            }
            return new ValidationResult("Invalid status.");
        }
    }
}
