using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DemoTwo.Models
{
    public class Admin
    {
        [Key]
        //[Required(ErrorMessage = "Userid can't be blank")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AdminId { get; set; }

        [Required(ErrorMessage = "Username can't be blank")]
        public string? AdminName { get; set; } = string.Empty;

        public string? Password { get; set; } = string.Empty;

        public string? ConfirmPassword { get; set; } = string.Empty;

        public string? Role { get; set; } = string.Empty;


        public string? Email { get; set; } = string.Empty;
    }
}