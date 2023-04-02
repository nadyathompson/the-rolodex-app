let pokemonRepository = (function () {
    let repository = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        
    function add(pokemon) {
        if(
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
        repository.push(pokemon);
        } else {
            console.log ("pokemon is not correct");
        }
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon){
        let repository = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listItem.appendChild(button);
        repository.appendChild(listItem);
        button.addEventListener("click", 
        function(Event) {
            showDetails(pokemon);
            });
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);

            let modalContainer = document.querySelector ('#modal-container');

            // Clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add ('modal');

            // Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let titleElement = document.createElement ('h1');
            titleElement.innerText =  (item.name);

            let sprite = document.createElement('img');
            sprite.classList.add('sprite');
            sprite.src = item.imageUrl;

            let pokemonTypes = "";
            if (item.types.length>1){
                pokemonTypes = item.types[0].type.name + ', ' + item.types[1].type.name
                item.secondType = item.types[1].type.name;
            } else {
                pokemonTypes = item.types[0].type.name
            }
            
            let contentElement = document.createElement ('p');
            contentElement.innerText =('Height: ' + item.height + '\n' +  '\n' + 'Types: ' + pokemonTypes);


        modal.appendChild (closeButtonElement);
        modal.appendChild (titleElement);
        modal.appendChild (contentElement);
        modalContainer.appendChild (modal);
        modal.appendChild (sprite);


        modalContainer.classList.add('is-visible');
    
        
        function hideModal() {
            let modalContainer = document.querySelector('#modal-container');
            modalContainer.classList.remove('is-visible');
        
            window.addEventListener('keydown', (e) => {
                let modalContainer = document.querySelector('#modal-container');
                if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
                }
            });
        }
    
        document.querySelector ('button.button-class').addEventListener('click', () => {
            showDetails ('Modal Title', 'Modal Content');
        });
            });
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    
  };
})();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});
