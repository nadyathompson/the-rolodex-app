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
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("btn-primary");
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
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

    function showModal(pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
  
      modalTitle.empty();
      modalBody.empty();
  
      let pokemonName = $("<h1>" + pokemon.name + "</h1>");
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr("src", pokemon.imageUrl);
      let pokemonHeight = $("<p>" + "Height : " + pokemon.height + " m" + "</p>");
      let pokemonTypes = $("")
      if (pokemon.types.length>1){
          pokemonTypes = 'Types: ' + pokemon.types[0].type.name + ', ' + pokemon.types[1].type.name
          pokemon.secondType = pokemon.types[1].type.name;
      } else {
          pokemonTypes = 'Types: ' + pokemon.types[0].type.name
      }

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonTypes);
      console.log(pokemonTypes)
    }

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
        });
      }
 
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
    };
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });