# Funcionalidades Implementadas

Com a utilização da API e baseando-me no código fornecido nas aulas teóricas, as funcionalidades implementadas neste trabalho foram:

- **Desenho das Obras inicialmente pela ordem que a API fornece** — dentro de um *container* que tem o nome de *item* que contém a imagem da obra, o título, o ano em que a obra ficou finalizada e a respetiva tag;
- **A pesquisa de obras** — feita a partir de um elemento *input[type=text]* onde aparecem as imagens em que o valor escrito nesse mesmo input está contido no título ou na tag da obra;
- **Organização de todas as obras por Ordem Cronologica** — obras organizadas da data mais antiga de finalização para a mais recente;
- **Filtragem por Tags** — cada tag contida no array proveniente da API é desenhada em formato de botão que quando o utilizador clica nesse mesmo botão só ficam visiveis as obras cuja tag é igual ao valor do mesmo.

## Dificuldades Encontradas

Inicialmente não estava a organizar o código da API em classes e devido a isso não estava a conseguir fazer o código do botao *ordem cronologica*, após essa adaptação e organização do código relativo ao acesso da API e ao desenho das informações na página, o botão *ordem cronologica* ficou a funcionar.

Os botões das tags também tiveram a sua quantidade de dificuldade, visto que, cada vez que eles se faziam copiavam o processo da função *filter()* sendo que o objetivo era só aparecer o resultado e não o processo. Após perceber isto, deixei de fazer a filtragem com o *filter()* e usei outro método o *Set()* em conjunto com a limpeza desse container que, posteriormente, apresenta os botões de cada tag na página.
