function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

// function getSkuFromProductItem(item) {
//   // eslint-disable-next-line quotes
//   return item.querySelector('span.item__sku").innerText');
// }

function cartItemClickListener(event) {
  const elementoClicado = event.target; 
  return elementoClicado.remove();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  const selecionandoOl = document.querySelector('ol');
  selecionandoOl.appendChild(li);
}

const appendElementToItems = (element) => {
  const pegandoSection = document.querySelector('.items');
  pegandoSection.appendChild(element);
};

const addItemCard = async (id) => {
 const dados = await fetchItem(id);
  createCartItemElement(dados);
};

const listenerButtons = () => {
  const selecionandoButton = document.querySelectorAll('.item__add');
  
   selecionandoButton.forEach((button) => button.addEventListener('click', (event) => {
        const buttonClicado = event.target;
       const id = buttonClicado.parentElement.firstChild.innerText;
       addItemCard(id);
   }));
  };

window.onload = async () => {
  const products = await fetchProducts('computador');

  const mapeandoInfo = products.results.map((currentValue) => 
  ({ sku: currentValue.id, name: currentValue.title, image: currentValue.thumbnail }));

  mapeandoInfo.forEach((currentValue) => {
    const resultado = createProductItemElement(currentValue);

    appendElementToItems(resultado);
  });
  listenerButtons();
  // const chamandoOl = document.querySelector('ol');
  // saveCartItems();
};
 
// REQUISITO 1: Chamando função fetchProducts, linha 57, que me traz o array de objetos API mercado livre. Ao carregar a página, espera a função fetchProducts terminar assincronamente, trazer os resultados que são as os produtos na tela. 
// na linha  82 mapeio meus produtos, e crio um objeto para cada, contendo só as informações que desejo.
// pego os objetos criados no map, com suas informações. Passo um forEach nestes objetos criados, para que a cada iteração ele mostre o produto na tela. Chamo a função que cria os elementos na tela (linha 25 createProductItemElement), e passo como parâmetros meus objetos, ou seja, serão adicionadas no html os elementos criados contendo as especificifações que veio do objeto map (id, name, img).
// linhas 87 : chamei a função append dentro de onload, pois depois de criados todos os elementos no html com as informações que vieram do objeto, tenho que colocar esses elementos como filho da sections class itemns no html. É isso que essas linhas fazem, seleciono meu elemento pai section items, e passo o element (que é o resultado da minha função for each - elementos html criados com suas informações e imagens), como filhos desta section, sendo assim ,após isso, os produtos são mostrados na tela. OBS: existe o await aqui : window.onload = async () => { const products = await fetchProducts('computador'); - pq se não houver, ele retorna uma promise (em status pendente) do objeto, o dado bruto, porém em promise, pq pode falhar. O await, é usado,pq só depois do resultado positivo da busca da url, é que há o retorno do dado bruto em si e não da promessa destte

// REQUISTO 2, colocar produtos no carrinho: após requisito 1, linha 89. Chamo minha função listenerButtons, e por meio dela, seleciono todos os meus buttons criados. É necessário que ao clicar nos botões, o produto selecionado seja adicionada ao carrinho.  Na linha  70, cada botão recebe um evento de clique, e quando este clique ocorre, na linha 72 acesso o elemento pai desses botões que é uma section-class, acesso seu primeiro filho que é um span e por fim, acesso o texto dessa span que é o id (sku) do produto. 
// linha 73 chamo a função addItemCard, passando como parâmetro o id do produto. Essa função é assíncrona, em razão da função fetchItem estar como assíncrona, ela precisa acontecer, depois que temos a resposta do fetchItem. Assim que a fetchItem é executada e retorna sua resposta com o id do produto, chamamos então a função creatCartItemElement, já com a resposta da fetchItem que são os produtos com os dados (id, title, price)
// linha 48, chamada a função createCartItemElement com o parâmetro dos dados dos produtos, desustruturamos esses dados, para poder utilizar na função. 
// li são criadas e possuem como texto, os dados de cada produto (id,title,price).Seleciono a ol, e coloco todas as li's criadas como filhas de ol para que os dados do produto clicado, aparecem no carrinho (id,name, price).
