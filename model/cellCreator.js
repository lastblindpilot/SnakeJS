function Square(row, col, course)
{
	this.body = [row, col];
	this.course = course;
	var that = this; 

	this.create = function()
	{
		m1.setCell(that.body[0], that.body[1], true);
	}
	
	this.move = function()
	{
		var last_body = this.body.slice();

        switch(this.course)
		{
			case 'right':
                if (this.body[1] < 20)
                {
                    m1.getCell(this.body[0], this.body[1])
                    this.body[1]++;
                } else if (this.body[1] == 20)
                {
                    this.fail();
                    break;
                }
				break;
            case 'left':
                if (this.body[1] > 1)
                {
                    m1.getCell(this.body[0], this.body[1])
                    this.body[1]--;
                } else if (this.body[1] == 1)
                {
                    this.fail();
                    break;
                }
                break;
            case 'up':
                if (this.body[0] > 1)
                {
                    m1.getCell(this.body[0], this.body[1])
                    this.body[0]--;

                } else if (this.body[0] == 1)
                {
                    this.fail();
                    break;
                }
                break;
            case 'down':
                if (this.body[0] < 20)
                {
                    m1.getCell(this.body[0], this.body[1])
                    this.body[0]++;
                } else if (this.body[0] == 20)
                {
                    this.fail();
                    break;
                }
                break;
		}
		
		m1.setCell(last_body[0], last_body[1], false);
		m1.setCell(this.body[0], this.body[1], true);
	}

    this.getKey = function(event)
    {
        switch (event.keyCode)
        {
            case 37:
                this.course = 'left';
                break;
            case 39:
                this.course = 'right';
                break;
            case 38:
                this.course = 'up';
                break;
            case 40:
                this.course = 'down';
                break;
        }
    }

    this.fail = function()
    {
        alert('YOU FAIL!');
        location.reload();
    }
}