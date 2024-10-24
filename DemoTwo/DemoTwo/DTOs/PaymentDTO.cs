using System;
using System.ComponentModel.DataAnnotations;

namespace DemoTwo.DTOs
{
    public class PaymentDTO
    {
        public int PaymentId { get; set; }

        [Required]
        public int ReservationId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than zero.")]
        public decimal TotalAmount { get; set; }

        // [Required]
        public DateTime PaymentTime { get; set; } = DateTime.UtcNow;
    }
}
