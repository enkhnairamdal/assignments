    let n =[3, 45, 23, 78, 34]
    let b = [4, 2, 34, 4, 12, 1]
    let c = 1
    let k='';
    let zoruu;
    zoruu = b.length - n.length
    n.length = n.length + zoruu
    for (let i = 5 ; i < n.length; i++){
        n[i]=1
    }
    for(let i=0 ; i< n.length; i++){
        c = n[i] * b[i]
        k = k + c; 
        k += ' ';
    }
    console.log (k);


   
   