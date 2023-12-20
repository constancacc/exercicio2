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

        item.appendChild(art);
        item.appendChild(title);
        item.appendChild(artist);
        item.appendChild(artwork_type);

        container.appendChild(item);
    });

    return container;
}

