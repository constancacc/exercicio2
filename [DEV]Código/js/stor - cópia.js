
class Obra{
    constructor (containerElement, imageID, artTitle, artistName, tag){
        let item = document.createElement("div");
        item.classList.add("item");

        const image = new Image();
        image.src = "https://www.artic.edu/iiif/2/" + imageID + "/full/843,/0/default.jpg";
        
        let title = document.createElement("h3");
        title.innerText= artTitle;

        let artist = document.createElement("h5");
        artist.innerText= artistName;

        let artwork_type = document.createElement("h6");
        artwork_type.innerText = tag;

        item.appendChild(image);
        item.appendChild(title);
        item.appendChild(artist);
        item.appendChild(artwork_type);

        console.log(tag);
       
        containerElement.append(item);
    } 
}

const container = document.querySelector('main');

class App {
    loadObras(){
        fetch("https://api.artic.edu/api/v1/artworks")
        .then(this._onResponse)
        .then (this._onJsonReady);
    }

    _onJsonReady(json){
        const obras = json.data;
        const container = document.querySelector('main');

        for(const info of obras){
            const obra = new Obra(container, info.image_id, info.title, info.artist_title, info.artwork_type_title);
            console.log(info);
        }
    }

    _onResponse(response){
        return response.json();
    }

}

const app = new App();
app.loadObras();