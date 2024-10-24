using System.ComponentModel.DataAnnotations;

namespace DemoTwo.DTOs
{
    public class RoomDTO
    {
        public int RoomId { get; set; }

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string RoomType { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; }
    }
}
