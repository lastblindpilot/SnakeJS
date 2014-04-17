/*  Date: 17/04 
    .blindpilot  */

function Game(gameContainer, fieldWidth, fieldHeight, playerName) {
  this.KEYS = {
    KEY_UP:     38,
    KEY_DOWN:   40,
    KEY_LEFT:   37,
    KEY_RIGHT:  39
  }
  
  var self = this;
  
  this.timerId      = null; // timer id
  this.delay        = 300;  // game speed
  this.score        = 0;    // score
  this.scoreMult    = 1.0;  // score multiplier 
  this.level        = 1;    // current level
  this.targetFruits = 2;   // how many fruits for next level
  this.fruitsEaten  = 0;    // how many fruits have eaten
  this.playerName   = playerName;

  this.container = $(gameContainer);
  this.container.append('<div id="gameField"></div>');
  this.container.append('<div id="gameState"><center>Snake</center><hr></div>');
  this.container.append('<div id="gameRecords"><center>Records</center><hr></div>');

  this.gameState = $('#gameState');
  this.gameState.append('<span id="gameInfo">Score: 0<br />Level: 1</span>');

  this.gameInfo = $('#gameInfo');
  this.gameRecords = $('#gameRecords');
  
  this.matrix = new Matrix('#gameField', fieldHeight, fieldWidth);
  this.snake = new Snake(this.matrix, fieldHeight / 2, fieldWidth / 2, 'right');
  
  function getDist(sx, sy, dx, dy) {
    return Math.sqrt(Math.pow(dx - sx, 2) + Math.pow(dy - sy, 2));
  }
  
  this.create = function() {
    this.updateRecords();

    this.matrix.create(); // creating the matrix
    this.snake.create();  // creating the snake
    this.spawnFruit();    // creating fruits

    // snake event handler death - 
    // reached the border or has eaten itself

    this.snake.onDie = function() {
      if (self.score) {
        self.saveRecord(self.playerName, self.score);
        self.updateRecords();
      }
      
      if (confirm('Game over! Restart?')) // start again
        self.restart();

      self.stop(); // or stop the game 
    }
  
    // eating fruits event handler
    this.snake.onEat = function() {
      self.score += Math.ceil(100 * self.scoreMult);
      self.fruitsEaten++;
      self.spawnFruit();  // new fruit
      
      if (self.fruitsEaten == self.targetFruits) {
        self.snake.trim(2);     // shortening snake
        self.fruitsEaten = 0;
        self.targetFruits++;
        self.level++;           // level up
        self.scoreMult += 0.2;  // increase the multiplier
        
        // additional barrier every even level 
        // increase the speed of the game every odd level
        if (self.level % 2 == 0)
          self.spawnBlock();
        else
          self.increaseSpeed();
      }
    }
  
    document.onkeydown = function(event) {
      var keyCode = (event == null) ? window.event.keyCode : event.keyCode;
      var new_course;
      
      if (keyCode < self.KEYS.KEY_LEFT || keyCode > self.KEYS.KEY_DOWN)
        return;
      
      switch(keyCode) {
        case self.KEYS.KEY_UP:
          new_course = 'up';
          break;
        case self.KEYS.KEY_DOWN:
          new_course = 'down';
          break;
        case self.KEYS.KEY_LEFT:
          new_course = 'left';
          break;
        case self.KEYS.KEY_RIGHT:
          new_course = 'right';
          break;
      }
      
      // if the motion to the desired direction is possibly then change the course
      if (self.snake.isCanMoveTo(new_course))
        self.snake.course = new_course; 
    }
  }
  
  // function for addition the record to the container
  this.addRecord = function(player, score) {
    var recNum = $('.record').length;
    
    this.gameRecords.append('<div class="record"><div class="recordName">' + (recNum + 1) + '. ' + player + '</div><div class="recordScore">' + score + '</div></div>');
  }
  
  // Function for saving the record
  this.saveRecord = function(player, score) {
    $.post('records.php', {'player': player, 'score': score});
  }
  
  // Function for updating highscores
  this.updateRecords = function() {
    $('#gameRecords > .record').remove();
    $.getJSON('model/Backend/records.php?action=getrecords', function(data) {
      $.each(data, function(i, item) {
        self.addRecord(item[0], item[1]);
        console.log(item[0], item[1]);
      })
    });
  }

  // Function for creating fruits
  this.spawnFruit = function() {
    var row = Math.ceil(Math.random() * fieldHeight);
    var col = Math.ceil(Math.random() * fieldWidth);
    
    while (this.matrix.getCell(row, col)) {
      row = Math.ceil(Math.random() * fieldHeight);
      col = Math.ceil(Math.random() * fieldWidth);
    }
    
    this.matrix.setCell(row, col, 'fruit');
  }
  
  // Function for creating barriers
  this.spawnBlock = function() {
    var row = Math.ceil(Math.random() * fieldHeight);
    var col = Math.ceil(Math.random() * fieldWidth);
    
    while (this.matrix.getCell(row, col) && getDist(col, row, this.snake.body[0][1], this.snake.body[0][0]) < 4) {
      row = Math.ceil(Math.random() * fieldHeight);
      col = Math.ceil(Math.random() * fieldWidth);
    }
    
    this.matrix.setCell(row, col, 'block');
  }
  
  // Function for increasing the speed
  this.increaseSpeed = function() {
    // increasing delay
    if (self.delay > 50)
      self.delay -= 20;
    else
      self.delay = 50;

    // reload new timer
    self.stop();
    self.start();
  }

  // Function for update game status
  // called by timer
  this.update = function() {
    this.snake.move();
    this.gameInfo.html('Score: ' + this.score + '<br>Level: ' + this.level);
  }
  
  // Function for starting the game
  this.start = function() {
    this.timerId = setInterval(function(){self.update()}, self.delay);
  }
  
  // Stop the game
  this.stop = function() {
    clearInterval(this.timerId);
  }

  // reload the game  
  this.restart = function() {
    window.location.reload();
  }
}
		
