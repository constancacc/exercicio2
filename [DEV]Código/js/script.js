
/*PESQUISA DE OBRAS*/
let pesquisa = [];
let searchinput= document.querySelector("#data-search");

searchinput.addEventListener("input", function(e){
let value = e.target.value.toLowerCase();
   
    pesquisa.forEach((pesquisa) => {
        let pesquisado =  pesquisa.titulo.toLowerCase().includes(value) || pesquisa.art.toLowerCase().includes(value)
        pesquisa.element.classList.toggle("hide", !pesquisado);
    });
});


/*ACEDER À API*/
class App {
    constructor(){
        this._onJsonReady = this._onJsonReady.bind(this);
        this._onAscClick = this._onAscClick.bind(this);

        this.obras = {};

        const ascButton = document.querySelector('#asc');
        ascButton.addEventListener('click', this._onAscClick);
    }

    _onAscClick(){
        this.obras.sort(function (a,b){
            return a.date_end - b.date_end;
        });
        
        this._renderObras();
    }

    loadObras(){
        fetch("https://api.artic.edu/api/v1/artworks")
        .then(this._onResponse)
        .then (this._onJsonReady);
    }

    _onJsonReady(json){
        this.obras = json.data;
        this._renderObras();
    }

    _renderObras(){
        const container = document.querySelector('main');
        container.innerHTML = '';
        
        for(const info of this.obras){
            const obra = new Obra(container, info.image_id, 
                info.title, info.artist_title, 
                info.artwork_type_title, info.date_end);
                
        }
        
    }

    _onResponse(response){
        return response.json();
    }

};

/*CONSTRUIR NO HTML*/
class Obra{
    constructor (containerElement, imageID, artTitle, artistName, tag, artYear){
        let item = document.createElement("div");
        item.classList.add("item");

        const image = new Image();
        image.src = "https://www.artic.edu/iiif/2/" + imageID + "/full/843,/0/default.jpg";
        
        let title = document.createElement("h3");
        title.innerText= artTitle;

        let artist = document.createElement("h5");
        artist.innerText= artistName + " | " + artYear ;

        let artwork_type = document.createElement("h6");
        artwork_type.innerText = tag;

        item.appendChild(image);
        item.appendChild(title);
        item.appendChild(artist);
        item.appendChild(artwork_type);

        containerElement.append(item);

        pesquisa.push({titulo: artTitle, artista: artistName, art: tag, element: item});
    } 
}

const app = new App();
app.loadObras();