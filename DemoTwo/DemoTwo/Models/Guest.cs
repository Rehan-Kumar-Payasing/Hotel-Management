using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Guest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GuestId { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@gmail\.com$", ErrorMessage = "Email must be a valid Gmail address ending with '@gmail.com'.")]
        public string Email { get; set; }

        [Required]
        [StringLength(1)]
        [RegularExpression(@"[MF]", ErrorMessage = "Gender must be either 'M' (Male) or 'F' (Female).")]
        public string Gender { get; set; }

        [StringLength(500)]
        public string Address { get; set; }

        [Required]
        [StringLength(15)]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
