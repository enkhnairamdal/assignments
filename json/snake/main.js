


let area = document.getElementById('area');
    area.style.width = `${areaWidth * slace}px`;
    area.style.height = `${areaHeight * slace}px`;

    let direction = initialDirection
    let positions = initialPosition

    
    let food ;
    generateFood ();

    document.addEventListener('keyup',(event) => {
        switch(event.key){
            case 'ArrowDown':
            changeDirection ('down');
            break;
            
            case 'ArrowUp':
            changeDirection ('up');
            break;
            case 'ArrowLeft':
            changeDirection ('left');
            break;
            case 'ArrowRight':
            changeDirection ('right');
            break;
        }
    });

    function changeDirection(value){
        if(direction === 'up'|| direction=== 'down'){
            if(value === 'right' || value === 'left'){
                direction = value;
            }
        }
         else if(direction === "right"|| direction=== 'left'){
            if(value === 'up' || value === 'down'){
                direction = value;
            }
        }
    };

    function generateFood(){
        food ={
            x:Math.floor(Math.random() * areaWidth),
            y:Math.floor(Math.random() * areaHeight),
        }
        let hoolDavhardsan = false;
    for (let i = 0; i< positions.length; i++){
        if( positions[i].x === food.x && positions[i].y === food.y){
            hoolDavhardsan = true;
            break
        }
    }

    if(hoolDavhardsan){
        generateFood()
    }
    };
    
    function beep (){
        let snd = new Audio('beep-02.wav')
        snd.play()
        generateFood()
    }
   

    function goLeft (){
        let newPositions = [];

        newPositions.push({
          y:positions[0].y,
          x:positions[0].x === 0 ? areaWidth - 1 : positions[0].x - 1,
        });

        for(let i = 0; i < positions.length -1 ; i++){
            newPositions.push(positions[i]);
        }
        positions=newPositions;
    }


    function goRight (){
        let newPositions = [];

        newPositions.push({
          y:positions[0].y,
          x:positions[0].x === areaWidth - 1 ? 0: positions[0].x + 1,
        });
        for(let i = 0; i < positions.length -1 ; i++){
            newPositions.push(positions[i]);
        }
        positions=newPositions;
    }   


    function goUp (){
        let newPositions = [];

        newPositions.push({
          x:positions[0].x,
          y:positions[0].y === 0 ? areaHeight - 1: positions[0].y - 1,
        });
        for(let i = 0; i < positions.length -1; i++){
            newPositions.push(positions[i]);
        }
        positions = newPositions;
    }

    function goDown (){
        let newPositions = []; 

        newPositions.push({
          x:positions[0].x,
          y:positions[0].y === areaHeight - 1 ? 0: positions[0].y+1
        })
        for(let i = 0; i < positions.length -1;i++){
            newPositions.push(positions[i]);
        };
        positions=newPositions;
    }

    function resetGame(){
        positions = initialPosition;
        direction = initialDirection;
        generateFood()
    }
  

    setInterval(()=>{
            switch(direction){
                case 'right':
                    goRight();
                    break;
                case 'left':
                    goLeft();
                    break;
                case 'up':
                    goUp();
                    break;
                case 'down':
                    goDown();
                    break;    
            }    
            

            const snakeBodyHtml = positions
            .map((position) => `<div class="body" style="width:${slace}px; height:${slace}px; top: ${position.y * slace}px; left: ${position.x * slace}px;"></div>`)
            .join('');

            let foodHtml = `<div class="food"  style="width:${slace}px; height:${slace}px; top: ${food.y * slace}px; left: ${food.x * slace}px;"></div>`
            area.innerHTML = foodHtml + snakeBodyHtml;
            

           let head = positions[0];
           if(food.x === head.x && food.y === head.y){
            
            positions.push({});
            generateFood();
           }

           for(let i = 1; i < positions.length; i++ ){
            if (head.x === positions[i].x && head.y === positions[i].y){
                alert('Game over');
                resetGame();
                break;
            }
           }
        
    },speed);
       
  
  
   
    


  