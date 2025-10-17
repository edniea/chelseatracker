using System.ComponentModel.DataAnnotations;

namespace ChelseaTracker.Core.Models
{
    public class Match
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Opponent { get; set; } = string.Empty;
        
        public DateTime MatchDate { get; set; }
        
        [StringLength(50)]
        public string? Competition { get; set; }
        
        [StringLength(50)]
        public string? Venue { get; set; }
        
        public int? ChelseaScore { get; set; }
        
        public int? OpponentScore { get; set; }
        
        [StringLength(20)]
        public string? Result { get; set; } // Win, Loss, Draw
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
}
