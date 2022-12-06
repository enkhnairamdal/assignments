    let a = [5,6,9,12,19,121,1,7,4,63]
    let tegsh = 0
    let sondgoi = 0
    for(let i = 0 ; i < a.length; i++){
        if(a[i] % 2 == 0){
            tegsh ++
        }
        else {
            sondgoi++
        }
    }
    console.log(tegsh)
    console.log(sondgoi)