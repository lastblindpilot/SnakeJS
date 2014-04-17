/* 	Date: 17/04 
	.blindpilot	 */

function Snake(matrix, row, col, course) {
  	this.matrix = matrix;
  	this.course = course;
	this.body = [];
	
	this.onDie;
	this.onEat;
	
	/* 	Create the snake with length of 3 cells 
		 This.body [0] - snake's head  */

	this.create = function() {
		for (var i = 0; i < 3; i++) {
			this.body.push([row, col]);
   		   	this.matrix.setCell(this.body[i][0], this.body[i][1], 'snake');
			col--;
		};
	}
	
	/* 	This function returns the coordinates of the next cell 
   		By the direction of snake motion or 
	   	By the course direction parameter  */

	this.getNextPosition = function(course)	{
    	var next_pos = this.body[0].slice();
    
	    switch(course ? course : this.course) {
	      case 'up':
	        next_pos[0]--;
	        break;
	      case 'down':
	        next_pos[0]++;
	        break;
	      case 'left':
	        next_pos[1]--;
	        break;
	      case 'right':
	        next_pos[1]++;
	        break;
	    }
	    
	    return next_pos;
	}
	
	/*  This function prohibits the movement of the snake in the opposite direction 
		Course checks the direction and stops the movement if the next cell
		on this direction is the second cell from head  */

	this.isCanMoveTo = function(course) {
    	var next_pos = this.getNextPosition(course);
    	return !(this.body[1][0] == next_pos[0] || this.body[1][1] == next_pos[1]);
	}
	
	// Function for movement of snake
	this.move = function() {
		var new_body = this.getNextPosition(); 	  	// next cell
		
		// if the sneke has exceeded the borders or stumbled upon self cell then it dies
	    if (this.isOutOfMatrix(new_body) || 
	        this.matrix.getCell(new_body[0], new_body[1]) == 'snake' ||
	        this.matrix.getCell(new_body[0], new_body[1]) == 'block') {

		      this.matrix.setCell(this.body[0][0], this.body[0][1], 'die');
		      if (this.onDie) this.onDie(); // вызов обработчика "события" смерти змейки
		      return;
  		}

 		/*  If we stumbled upon the fruit cell then eats the fruit 
     		And leave the tail as is  */

    	if (this.matrix.getCell(new_body[0], new_body[1]) == 'fruit') {
    	 if (this.onEat) this.onEat(); // call eat func
   		} else {
     	 // else cut the last part of tail
      		var last_body = this.body.pop();
      		this.matrix.setCell(last_body[0], last_body[1]);
    	}

	    this.body.unshift(new_body);     // New head of snake
	    this.matrix.setCell(new_body[0], new_body[1], 'snake');
	}
	
	this.trim = function(len) { // This function shortens the snake to "len"
	 	if (this.body.length <= len) return;
	  
		for (var i = len; i < this.body.length; i++) {
			this.matrix.setCell(this.body[i][0], this.body[i][1])
		};
	  
	  	this.body.splice(len, this.body.length - len);
	}
	
	this.isOutOfMatrix = function(pos) { // This function checks if the snake come out the boarders
    	return pos[0] < 1 || pos[0] > this.matrix.rows || pos[1] < 1 || pos[1] > this.matrix.cols;
	}
}