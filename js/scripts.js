let pokemonRepository = (function () {
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function addListItem(pokemon){
        let repository = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        repository.appendChild(listItem);
        button.addEventListener('click', function () {
        showDetails(pokemon);
        });
    }

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
          ) {
            repository.push(pokemon);
          } else {
            console.log("pokemon is not correct");
          }
        }

    function getAll() {
        return repository;
    }
    
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
        }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            if (details.types.length>1){
                item.type = details.types[0].type.name;
                item.secondType = details.types[1].type.name;
                } else {
                item.type = details.types[0].type.name;
                }
        }).catch(function (e) {
            console.error(e);
        });
        }

    function showDetails(pokemon){
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        });  
    }

    return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});










