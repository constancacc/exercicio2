
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

/*FILTRAR POR CATEGORIAS*/
let tags = [];


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

        /*caso o nome do artista esteja a null*/
        if(artistName === null){
            artist.innerText = artYear;
        }else{
        artist.innerText= artistName + " | " + artYear ;
        }

        let artwork_type = document.createElement("h6");
        artwork_type.innerText = tag;

        /*caso o link da imagem esteja a null*/
        let indisponivel = document.createElement("h5");
        indisponivel.style.color = "red";
        indisponivel.innerText = "imagem indisponivel";
        
        if(imageID === null){
            item.appendChild(indisponivel);
        }else{
            item.appendChild(image);
        }
        
        item.appendChild(title);
        item.appendChild(artist);
        item.appendChild(artwork_type);

        containerElement.append(item);

         /* array de pesquisar*/
         pesquisa.push({titulo: artTitle, artista: artistName, art: tag, element: item});

      /* array das tags*/
        tags.push(tag);

        
        function removeDuplicates(arr) {
            let unique = [...new Set(arr)]; // Usando Set para remover duplicatas
            let tagsContainer = document.querySelector(".tags-container");
        
            // Remover todos os elementos dentro do container antes de adicionar os novos
            tagsContainer.innerHTML = '';
        
            unique.forEach(element => {
            // Criar um novo botão para cada tag única
            let categorias = document.createElement("button");
            categorias.classList.add("categoria");
            categorias.value = element;
            categorias.innerText = element;
            
            // Adicionar ouvinte de evento diretamente após criar o botão
            categorias.addEventListener('click', () => {
                let valor = categorias.value;
                console.log(valor);
        
                pesquisa.forEach(pesquisa => {
                let tag_ativa = pesquisa.art.includes(valor);
                pesquisa.element.classList.toggle("hide", !tag_ativa);
                });
            });
        
            tagsContainer.appendChild(categorias);
            });
        
            return unique;
        }

        tags = removeDuplicates(tags);
        
    } 
}

const app = new App();
app.loadObras();