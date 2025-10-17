using System.ComponentModel.DataAnnotations;

namespace ChelseaTracker.Core.Models
{
    public class Player
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        [StringLength(10)]
        public string? Position { get; set; }
        
        public int? JerseyNumber { get; set; }
        
        public DateTime? DateOfBirth { get; set; }
        
        [StringLength(100)]
        public string? Nationality { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
}
