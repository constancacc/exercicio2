# Apresentação da API 

link da documentação: https://api.artic.edu/docs/#collections

O Art Institute of Chicago fornece uma API que permite aos desenvolvedores acessar e interagir com dados relacionados às obras de arte e informações associadas ao museu. 

O *Endpoint* principal da api é https://api.artic.edu/api/v1, mas devido ao objetivo do projeto ser apresentar as obras do museu, adeci à API com o método *fetch()* e pelo link https://api.artic.edu/api/v1/artworks.

A API oferece acesso a uma variedade de recursos, incluindo informações sobre obras de arte, artistas, exposições e mais, sendo que as informações utilizadas neste trabalho foram o id da imagem da obra(info.image_id), o título da obra (info.title), o artista (info.artist_title), o tipo de arte produzido servindo como tag (info.artwork_type_title) e a data do fim da obra (info.date_end).

Devido ao facto desta API ser constantemente atualizada, os resultados das obras podem modificar.
