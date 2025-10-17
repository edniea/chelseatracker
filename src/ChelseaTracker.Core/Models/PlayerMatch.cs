using System.ComponentModel.DataAnnotations;

namespace ChelseaTracker.Core.Models
{
    public class PlayerMatch
    {
        public int Id { get; set; }
        
        public int PlayerId { get; set; }
        public Player Player { get; set; } = null!;
        
        public int MatchId { get; set; }
        public Match Match { get; set; } = null!;
        
        public bool Started { get; set; }
        
        public int? MinutesPlayed { get; set; }
        
        public int? Goals { get; set; }
        
        public int? Assists { get; set; }
        
        public int? YellowCards { get; set; }
        
        public int? RedCards { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
    }
}
