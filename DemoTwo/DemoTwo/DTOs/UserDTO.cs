using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DemoTwo.DTOs
{
    public class UserDTO
    {
        [Required]
        [EmailValidationAttribute]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^(Guest)$", ErrorMessage = "Role must be 'Guest'.")]
        public string Role { get; set; }


    }

    public class EmailValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return new ValidationResult("Email is required.");
            }

            var email = value.ToString();
            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

            if (Regex.IsMatch(email, emailPattern))
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult("Invalid email format.");
            }
        }
    }
}
