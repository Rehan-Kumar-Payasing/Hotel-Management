using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Rate
    {
        [Key]
        public int RateId { get; set; }

        [Required]
        [StringLength(50)]
        public string RoomType { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Per night charge must be greater than zero.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal PerNightCharge { get; set; }
    }
}
