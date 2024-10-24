using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DemoTwo.Models;

namespace DemoTwo.Models
{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PaymentId { get; set; }

        [Required]
        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than zero.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        public DateTime PaymentTime { get; set; } = DateTime.UtcNow; // Default value to GETDATE() in SQL

        // Additional Validation can be added here if needed
    }
}
