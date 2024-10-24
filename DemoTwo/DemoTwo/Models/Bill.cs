using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DemoTwo.Models;

namespace DemoTwo.Models
{
    public class Bill
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BillId { get; set; }

        [Required]
        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; }

        [Required]
        [StringLength(255)]
        public string StayDates { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Service amounts must be zero or greater.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal ServiceAmounts { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Taxes must be zero or greater.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Taxes { get; set; }

        // Calculated column, no direct mapping
        //[NotMapped]
        public decimal Total => ServiceAmounts + Taxes;

        // Additional validation logic, if needed
    }
}
