/*async function getArt() 
{
  let response = await fetch(`https://api.artic.edu/api/v1/artworks?ids=208131,240935,142595,120300,13454,151363,102611,191556,117266,137125,126414&fields=id,title,image_id`);
  let data = await response.json()
  return data;
}

getArt()
  .then(data => console.log(data)); */


  fetch("https://api.artic.edu/api/v1/artworks")
  .then(function (response) {
      return response.json();
  }).then(function (json) {
    document.body.appendChild(Painting(json,0));
    console.log(json)
});

function Painting(json,i){

    let container = document.createElement("main");
    

    json.data.forEach(function(rest){

        let art = document.createElement("img");
        art.src= "https://www.artic.edu/iiif/2/"+rest.image_id+"/full/843,/0/default.jpg";

        let title = document.createElement("h5");
        title.innerText="título da obra:" + rest.title;

        let artist = document.createElement("h5");
        artist.innerText="artista:" + rest.artist_display;

        let artwork_type = document.createElement("h5");
        artwork_type.innerText="Tipo de Arte:" + rest.artwork_type_title;

        container.appendChild(art);
        container.appendChild(title);
        container.appendChild(artist);
        container.appendChild(artwork_type);
    });

    return container;
}

