let n = prompt ('number')
let a1 = 0;
console.log(a1)
let a2 = 1;
let a3 = 0
for(let i = 0 ; i < n ; i++){
    a1 = a2;
    a2 = a3;
    a3 = a1+a2

    console.log(a3)
}