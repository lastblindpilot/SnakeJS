/* 	Date: 17/04 
	.blindpilot	 */
	
function Matrix(matrixContainer, rows, cols) {

  	this.matrix = $(matrixContainer); 	// Matrix container
  	this.cellClassName = 'cell';   		// The cell class name
	this.rows = rows;					// Row number
	this.cols = cols;					// Columns number
	
	// Creating the grid
	this.create = function() {
		var n = this.rows * this.cols;	
	    this.matrix.css({'width': this.cols * 20 + 'px', 'height': this.rows * 20 + 'px'});

			for (var i = 0; i < n; i++)
				this.matrix.append('<div class="' + this.cellClassName + '"></div>');
	}
	
 	// Cell index
  	this.getCellIndex = function(row, col) {
    	return (row - 1) * this.cols + (col - 1);
  	}

	// Get the cell position
	this.getCell = function(row, col) {
    	var cell = this.getCellIndex(row, col);
	    return this.matrix.children()[cell].className.substr(this.cellClassName.length + 1);
	}
	
	// Set the cell position
	this.setCell = function(row, col, val) {
    	var cell = this.getCellIndex(row, col);
		
		this.matrix.children()[cell].className = (val ? this.cellClassName + ' ' + val : this.cellClassName);
	}	
}
		
