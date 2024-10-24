using System;
using System.ComponentModel.DataAnnotations;
using DemoTwo.Models;

namespace DemoTwo.DTOs
{
    public class ReservationDTO
    {
        public int ReservationId { get; set; }

        public int? GuestId { get; set; }

        public int? RoomId { get; set; }

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
        public string BookingStatus { get; set; }

        // Custom validation to ensure CheckInDate is earlier than CheckOutDate
        public bool IsValidCheckInCheckOutDate => CheckInDate < CheckOutDate;

        // Validation method for dates (can be used in custom validation logic)
        public ValidationResult ValidateDates()
        {
            if (CheckInDate <= CheckOutDate)
            {
                return new ValidationResult("Check-in date must be earlier than check-out date.");
            }
            return ValidationResult.Success;
        }
    }
}
