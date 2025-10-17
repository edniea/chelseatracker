using ChelseaTracker.Business.Services;
using ChelseaTracker.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ChelseaTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly ILogger<PlayersController> _logger;

        public PlayersController(IPlayerService playerService, ILogger<PlayersController> logger)
        {
            _playerService = playerService;
            _logger = logger;
        }

        /// <summary>
        /// Gets all active players
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers()
        {
            try
            {
                var players = await _playerService.GetAllPlayersAsync();
                return Ok(players);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving players");
                return StatusCode(500, "An error occurred while retrieving players");
            }
        }

        /// <summary>
        /// Gets a specific player by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayer(int id)
        {
            try
            {
                var player = await _playerService.GetPlayerByIdAsync(id);
                if (player == null)
                {
                    return NotFound($"Player with ID {id} not found");
                }
                return Ok(player);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving player with ID {PlayerId}", id);
                return StatusCode(500, "An error occurred while retrieving the player");
            }
        }

        /// <summary>
        /// Creates a new player
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<PlayerDto>> CreatePlayer(CreatePlayerDto createPlayerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var player = await _playerService.CreatePlayerAsync(createPlayerDto);
                return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, player);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating player");
                return StatusCode(500, "An error occurred while creating the player");
            }
        }

        /// <summary>
        /// Updates an existing player
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<PlayerDto>> UpdatePlayer(int id, UpdatePlayerDto updatePlayerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var player = await _playerService.UpdatePlayerAsync(id, updatePlayerDto);
                if (player == null)
                {
                    return NotFound($"Player with ID {id} not found");
                }

                return Ok(player);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating player with ID {PlayerId}", id);
                return StatusCode(500, "An error occurred while updating the player");
            }
        }

        /// <summary>
        /// Deletes a player (soft delete)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlayer(int id)
        {
            try
            {
                var result = await _playerService.DeletePlayerAsync(id);
                if (!result)
                {
                    return NotFound($"Player with ID {id} not found");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting player with ID {PlayerId}", id);
                return StatusCode(500, "An error occurred while deleting the player");
            }
        }
    }
}