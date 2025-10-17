using ChelseaTracker.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace ChelseaTracker.Data
{
    public class ChelseaTrackerDbContext : DbContext
    {
        public ChelseaTrackerDbContext(DbContextOptions<ChelseaTrackerDbContext> options) : base(options)
        {
        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<PlayerMatch> PlayerMatches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Player entity
            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Position).HasMaxLength(10);
                entity.Property(e => e.Nationality).HasMaxLength(100);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configure Match entity
            modelBuilder.Entity<Match>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Opponent).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Competition).HasMaxLength(50);
                entity.Property(e => e.Venue).HasMaxLength(50);
                entity.Property(e => e.Result).HasMaxLength(20);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configure PlayerMatch entity (junction table)
            modelBuilder.Entity<PlayerMatch>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Player)
                    .WithMany()
                    .HasForeignKey(e => e.PlayerId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.Match)
                    .WithMany()
                    .HasForeignKey(e => e.MatchId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            });

            // Configure indexes
            modelBuilder.Entity<Player>()
                .HasIndex(e => e.JerseyNumber)
                .IsUnique()
                .HasFilter("[JerseyNumber] IS NOT NULL");

            modelBuilder.Entity<Player>()
                .HasIndex(e => new { e.FirstName, e.LastName });

            modelBuilder.Entity<Match>()
                .HasIndex(e => e.MatchDate);

            modelBuilder.Entity<PlayerMatch>()
                .HasIndex(e => new { e.PlayerId, e.MatchId })
                .IsUnique();
        }
    }
}
