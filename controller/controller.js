/* 	Date: 17/04 
	.blindpilot	 */
	
window.onload = function()
{
  var playerName = prompt('Enter your name');
  if (!playerName) return;
  
  var game = new Game('#snakeGame', 20, 20, playerName);

  game.create();
  game.start();
}