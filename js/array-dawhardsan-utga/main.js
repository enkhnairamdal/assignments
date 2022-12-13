    let input = [4, 2, 34, 4, 1, 12, 1, 4 ]
    let k= 0
    for(let i = 0; i< input.length; i++){
      debugger
         for(let j = i+1 ; j< input.length ; j++){
               if(input[i]== input[j] && input[j] != '*' ){
                  input[j] = '*'
                  k++
                  
               }     
         }
         if(k>0){
            console.log(input[i])
            k=0
         }
    }
  
    
