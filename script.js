window.onload = function()
{
    var canvas; 

    var canvasHeith = 600; 
    var canvasWidth = 900; 
    var blockSize = 30;

    var ctx; 
    var delay = 100;

    var xCoord = 0; 
    var yCoord = 0; 

    var snakee; 
    var apple ; 
    var listApple =  []; 
    var appleTime = 0; 

    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeith / blockSize;
    init();

    function init()
    {
        canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeith;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");

        refreshCanvas();
    }


    function refreshCanvas()
    {
        snakee.adavance();

        if(snakee.checkCollision())
        {

        }
        else
        {
            ctx.clearRect(0,0, canvas.width,canvas.height);
        
            snakee.draw();
    
            if (appleTime === 10000)
            {
                console.log("10 -----> now ");
                apple = new Apple();
                listApple.push(apple);
                appleTime = 0; 
            }
            else 
            {
                appleTime += delay;
            }
    
            console.log("before apple")
            console.log("Arrray apple lenght" + listApple.length);
            if(listApple.length > 0  )
            {
                console.log("supp O");
                for(var idx = 0; idx < listApple.length; idx++)
                {
                    var oApple = listApple[idx];
                    console.log("draw apple");
                    oApple.draw();
                }
        
            }
    
            setTimeout(refreshCanvas, delay);
        }
        
    }

    function drawBlock(ctx, position)
    {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x,y,blockSize, blockSize);
    }

    function Snake(body, direction)
    {
        this.body = body;

        this.direction = direction; 

        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.adavance = function() 
        {
            var nextPosition = this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction")
            }
            this.body.unshift(nextPosition);
            this.body.pop();



        };

        this.setDirection = function(newDirection)
        {
            var allowedDirection; 
            switch(this.direction)    
            {
            case "left":
            case "right":
                allowedDirection = ["up", "down"];
                break;
            case "down":
            case "up":
                allowedDirection = ["left", "right"];
                break;
            default:
                throw("Invalid Direction")
            }

            if(allowedDirection.indexOf(newDirection) > -1)
            {
                this.direction = newDirection;
            }

        };

        this.checkCollision = function()
        {
          var wallCollision =  false; 
          var snakeCollision = false;   
          var head = this.body[0];
          var rest = this.body.slice(1);
          var snakeX = head[0];
          var snakeY = head[1]; 
          var minimumX = 0; 
          var minimumY = 0;
          var maxX = widthInBlocks -1;
          var maxY = heightInBlocks -1;
          var isNotBetweenNHorizonWalls = snakeX < minimumX || snakeX > maxX; 
          var isNotBetwennVerticalWalls = snakeY < minimumY || snakeY > maxY;

          if(isNotBetweenNHorizonWalls || isNotBetwennVerticalWalls )
          {
              wallCollision = true; 
          }

          for(var i = 0; i< rest.length ; i++)
          {
              if(snakeX === rest[i][0] && snakeY === rest[i][1])
              {
                    snakeCollision = true; 
              }
          }
          return wallCollision || snakeCollision; 


        };
    }


    function Apple()
    {
        this.xPosition = Math.floor(Math.random() * 30);
        this.yPosition = Math.floor(Math.random() * 20);
     
        this.position = [[this.xPosition,this.yPosition]];

        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#008000";
            drawBlock(ctx, this.position[0]);
            ctx.restore();
        };
        
    }

    document.onkeydown = function handleKeyDown(e)
    {
        console.log("Evt touche");
        var key = e.keyCode;
        var newDirection;
        switch(key)
        {
            case 37:
                newDirection = "left";
                console.log(newDirection);
                break;
            case 38:
                newDirection = "up";
                console.log(newDirection);
                break;
            case 39:
                newDirection = "right";
                console.log(newDirection);
                break;
            case 40:
                newDirection = "down";
                console.log(newDirection);
                break;
            default:
                return;
        }
        console.log("---- Set Direction ----");
        snakee.setDirection(newDirection);
    }

}