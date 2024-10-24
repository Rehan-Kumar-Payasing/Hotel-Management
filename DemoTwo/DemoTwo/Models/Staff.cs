using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Staff
    {
        [Key]
        public int StaffId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Range(19, int.MaxValue, ErrorMessage = "Age must be greater than 18.")]
        public int Age { get; set; }

        [StringLength(255)]
        public string Address { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Salary must be greater than zero.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Salary { get; set; }

        [StringLength(50)]
        public string Designation { get; set; }
    }
}
