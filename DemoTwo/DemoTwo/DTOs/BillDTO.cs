using System.ComponentModel.DataAnnotations;

namespace DemoTwo.DTOs
{
    public class BillDTO
    {
        public int BillId { get; set; }

        [Required]
        public int ReservationId { get; set; }

        [Required]
        [StringLength(255)]
        public string StayDates { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Service amounts must be zero or greater.")]
        public decimal ServiceAmounts { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Taxes must be zero or greater.")]
        public decimal Taxes { get; set; }
        public decimal Total { get; set; }
    }
}
