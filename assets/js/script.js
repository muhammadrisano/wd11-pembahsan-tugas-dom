const elRoot = document.getElementById('root')
const elPageNumber = document.querySelector('.page-number')
const elBtnPrev = document.getElementById('prev')
const elBtnNext = document.getElementById('next')

console.log(elRoot)
let page = 1
const limit = 12
// 

function fetchingPokemon(){
    const offset = (page - 1) * limit
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((res)=> res.json())
    .then((res)=>{
        const pokemons = res.results
        let content = ''   
        pokemons.map((item)=>{
            const url = item.url
            const prosesSplit = url.split('/')
            const id = prosesSplit[6]
            const urlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            content += `
                <div class="card">
                    <div class="wrapper-img">
                        <img src="${urlImg}">
                    </div>
                    <h4 class="card-title">${item.name}</h4>
                    <a href="${urlImg}" target="_blank">${item.url}</a>
                </div>
            `
        })
      
        elRoot.innerHTML = content
        elPageNumber.innerHTML = page

    }) 
}

elBtnNext.onclick = function(){
    page = page + 1
    fetchingPokemon()
}

elBtnPrev.onclick = function(){
    if(page === 1){
        return
    }
    page = page - 1
    fetchingPokemon()
}

fetchingPokemon()
