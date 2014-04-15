window.onload = function()
{
	m1 = new Matrix('matrix1', 20, 20);
	m1.create();

    var target = new Target();
    target.create();

	var square = new Square(1, 1, 'right');
	square.create();
	square.move();

	setInterval(function() { square.move.call(square); }, 300);

    document.onkeydown = function()
    {
        square.getKey(event);
    }
}