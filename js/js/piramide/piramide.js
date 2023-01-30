    let n = 5
        let od = ''
        let row = 5
        let col = 5
        for ( i = 1; i <= n ; i++)
        {
            for ( j = 1; j <= n - i; j++)
            {
                od += "   ";
            }
            for ( k = 0; k < 2 * i - 1; k++)
            {
                od +="*  ";
            }
            od+="\n";
        }
        for ( i = 1; i <= n ; i++)
        {
            for ( j = 1; j <= n - i; j++)
            {
                od += "   ";
            }
            for ( k = 0; k < 2 * i - 1; k++)
            {
                od +="*  ";
            }
            od+="\n";
        }
        for ( i = 1; i <= n ; i++)
        {
            for ( j = 1; j <= n - i; j++)
            {
                od += "   ";
            }
            for ( k = 0; k < 2 * i - 1; k++)
            {
                od +="*  ";
            }
            od+="\n";
        }
        for(let i = 1; i < row; i++) 
        od +="  "
        {   
             for(let k = 1; k < col; k++ )
             {
                 od += ' *  *  *\n       ' 
                //  od += ' *'
                //  if(k == col - 1)
                //  {
                //      od += ' \n          '
                //  }  
             }
             od += '  * * * *' 
        }
    console.log(od)
    