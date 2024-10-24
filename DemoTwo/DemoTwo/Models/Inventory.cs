using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoTwo.Models
{
    public class Inventory
    {
        [Key]
        public int InventoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string ItemName { get; set; }

        public string ItemDescription { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Quantity must be zero or greater.")]
        public int Quantity { get; set; }

        [Range(0.00, double.MaxValue, ErrorMessage = "Unit price must be zero or greater.")]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal UnitPrice { get; set; }
    }
}
