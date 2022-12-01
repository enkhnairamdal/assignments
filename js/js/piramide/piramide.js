    let n = 10
        let od = ''
        for ( i = 1; i <= n ; i++)
        {
            for ( j = 1; j <= n - i; j++)
            {
                od += " ";
            }
            for ( k = 0; k < 2 * i - 1; k++)
            {
                od +="*";
            }
            od+="\n";
            
        }
    console.log(od)