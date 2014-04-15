function Target()
{
    this.create = function()
    {
        var row = Math.floor(Math.random()*20);
        while (row < 4) {
            var row = Math.floor(Math.random()*20);
        }
        var col = Math.floor(Math.random()*20);
        while (col < 4) {
            var col = Math.floor(Math.random()*20);
        }

        m1.setTarget(row, col);
    }
}