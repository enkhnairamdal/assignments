//1
    let itCompanies = ['Facebook', 'Google', 'Microsoft','Apple', 'IBM', 'Oracle', 'Amazon']
    console.log(itCompanies)
    console.log('\n')
//2
    console.log(itCompanies.length)
    console.log('\n')
//3
    console.log(itCompanies[0])
    console.log(itCompanies[6])
    k = Math.floor(itCompanies.length / 2)
    console.log(itCompanies[k])
    console.log('\n')
//4
    for (let i = 0 ; i< itCompanies.length; i++){
        console.log(itCompanies[i])
    }
    console.log('\n')
//5 
    for(let i = 0; i < itCompanies.length; i++){
        console.log(itCompanies[i].toUpperCase())
    }
    console.log('\n')
//6
    console.log(`${itCompanies} зэрэг мэдээллийн технологийн томоохон компаниуд.
    `)