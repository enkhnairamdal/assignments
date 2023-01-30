    let imageEl = document.getElementById('image')
    let titleEl =document.getElementById('title')
    let bodyEl = document.getElementById('posts')
    fetch('https://dummyjson.com/posts')
    .then((res) => res.json())
    .then((postData) => {
        titleEl.innerHTML = postData.posts[0].title
        // bodyEl.innerHTML = postData.posts[0].body
        


    })