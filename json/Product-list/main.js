    let imageEl = document.getElementById('image')

    let n = 200
    fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((cardData) =>{
            for(let i = 0; i<n; i++){
            let divEl = document.createElement('div')
            divEl.innerHTML = `<div class="card">
                <img id="image" src= "${cardData.products[i].thumbnail}"/>
                <div class="card-body">
                  <h5 class="card-title">${cardData.products[i].title}</h5>
                  <p class="card-text" id="price">${cardData.products[i].price}$</p>
                </div>
              </div>`
              imageEl.append(divEl)
            }
    })