namespace ChelseaTracker.Core.DTOs
{
    public class MatchDto
    {
        public int Id { get; set; }
        public string Opponent { get; set; } = string.Empty;
        public DateTime MatchDate { get; set; }
        public string? Competition { get; set; }
        public string? Venue { get; set; }
        public int? ChelseaScore { get; set; }
        public int? OpponentScore { get; set; }
        public string? Result { get; set; }
        public bool IsActive { get; set; }
    }
    
    public class CreateMatchDto
    {
        public string Opponent { get; set; } = string.Empty;
        public DateTime MatchDate { get; set; }
        public string? Competition { get; set; }
        public string? Venue { get; set; }
        public int? ChelseaScore { get; set; }
        public int? OpponentScore { get; set; }
        public string? Result { get; set; }
    }
    
    public class UpdateMatchDto
    {
        public string? Opponent { get; set; }
        public DateTime? MatchDate { get; set; }
        public string? Competition { get; set; }
        public string? Venue { get; set; }
        public int? ChelseaScore { get; set; }
        public int? OpponentScore { get; set; }
        public string? Result { get; set; }
        public bool? IsActive { get; set; }
    }
}
