
  /*PESQUISA DE OBRAS*/
  let obras = [];
  let searchinput= document.querySelector("#data-search");

  searchinput.addEventListener("input", function(e){

    let value = e.target.value.toLowerCase();
    console.log(obras);

    obras.forEach(obras =>{
      let pesquisado =  obras.titulo.toLowerCase().includes(value) || obras.art.toLowerCase().includes(value) || obras.artista.toLowerCase().includes(value);
      obras.element.classList.toggle("hide", !pesquisado);
    })

  });



let ascendente = document.querySelector("#asc");
let datas = {};

ascendente.addEventListener('click', function(){

  const item = document.querySelector("main");
  item.innerHTML=''; 

  datas.sort(function(a, b) {
    return a.year - b.year;
  });
  
  console.log(datas);
});


  /*IR BUSCAR A API*/
  fetch("https://api.artic.edu/api/v1/artworks")
  .then(function (response) {
      return response.json();
  }).then(function (json) {
    document.body.appendChild(Painting(json));
    console.log(json)
    
});

function Painting(json){

    let container = document.createElement("main");
    

   obras =  json.data.map(function(rest){
        let item = document.createElement("div");
        item.classList.add("item");

        let art = document.createElement("img");
        art.src= "https://www.artic.edu/iiif/2/"+rest.image_id+"/full/843,/0/default.jpg";

        let title = document.createElement("h3");
        title.innerText= rest.title;

        let artist = document.createElement("h4");
        artist.innerText= rest.artist_title;

        let artwork_type = document.createElement("h6");
        artwork_type.innerText= rest.artwork_type_title;

        /*se não houver imagem disponivel*/
        if (rest.image_id === null){
          let img_indisponivel = document.createElement("h3");
          img_indisponivel.style.color = "red";
          img_indisponivel.innerText = "imagem indisponivel";
          
          item.appendChild(img_indisponivel);

        }else{
          item.appendChild(art);
        }

        item.appendChild(title);
        item.appendChild(artist);
        item.appendChild(artwork_type);

        container.appendChild(item);

        return {titulo: rest.title, artista: rest.artist_title, art: rest.artwork_type_title, element: item};
    });


    datas =  json.data.map(function(rest){
        return { ano: rest.date_end}

    });

    return container;
};
