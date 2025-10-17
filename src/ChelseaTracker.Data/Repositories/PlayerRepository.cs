using ChelseaTracker.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace ChelseaTracker.Data.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly ChelseaTrackerDbContext _context;

        public PlayerRepository(ChelseaTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetAllAsync()
        {
            return await _context.Players
                .Where(p => p.IsActive)
                .OrderBy(p => p.LastName)
                .ThenBy(p => p.FirstName)
                .ToListAsync();
        }

        public async Task<Player?> GetByIdAsync(int id)
        {
            return await _context.Players
                .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
        }

        public async Task<Player?> GetByJerseyNumberAsync(int jerseyNumber)
        {
            return await _context.Players
                .FirstOrDefaultAsync(p => p.JerseyNumber == jerseyNumber && p.IsActive);
        }

        public async Task<Player> CreateAsync(Player player)
        {
            _context.Players.Add(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<Player> UpdateAsync(Player player)
        {
            player.UpdatedAt = DateTime.UtcNow;
            _context.Players.Update(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null)
                return false;

            player.IsActive = false;
            player.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Players
                .AnyAsync(p => p.Id == id && p.IsActive);
        }
    }
}
