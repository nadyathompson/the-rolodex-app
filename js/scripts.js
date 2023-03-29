let pokemonRepository = (function () {
    let repository = [{name: "Bulbasaur", height: 0.7, type: ['grass','poison']}, 
                        {name: "Charmander", height: 0.6, type: ['fire']}, 
                        {name: "Squirtle", height: 1.9, type: ['water']},
                        {name: "Pikachu", height: 0.4, type: ['electric']}];

    function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function () {
    showDetails(pokemon);
    })
    }

    function showDetails(pokemon){
        console.log(pokemon.name)
    }

    function getAll() {
        return repository;
    }

    function add(pokemon) {
        repository.push(pokemon);
        }

    return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});










