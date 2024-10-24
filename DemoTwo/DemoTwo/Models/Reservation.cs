using DemoTwo.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Reservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }

        [ForeignKey("Guest")]
        public int? GuestId { get; set; }
        public Guest Guest { get; set; }

        [ForeignKey("Room")]
        public int? RoomId { get; set; }
        public Room Room { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; }

        [Required]
        public DateTime CheckInDate { get; set; }

        [Required]
        public DateTime CheckOutDate { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Number of guests must be zero or greater.")]
        public int NumberOfGuest { get; set; }

        [Required]
        [StringLength(255)]
        [BookingStatus]  // Custom validation attribute for status
        public string Status { get; set; }

        // Custom validation method
        [NotMapped]
        public bool IsValidCheckInCheckOutDate
        {
            get
            {
                return CheckInDate < CheckOutDate;
            }
        }

        // Custom validation attribute to validate dates
        public ValidationResult ValidateDates()
        {
            if (CheckInDate <= CheckOutDate)
            {
                return new ValidationResult("Check-in date must be earlier than check-out date.");
            }
            return ValidationResult.Success;
        }
    }

    public class BookingStatus : ValidationAttribute
    {
        private static readonly string[] AllowedStatuses = { "Reserved", "Checked-In", "Checked-Out" };

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
