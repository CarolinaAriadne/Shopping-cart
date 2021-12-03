// const { fetchProducts } = require('./helpers/fetchProducts');

// const { fetchProducts } = require('./helpers/fetchProducts');

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

// function cartItemClickListener(event) {
//   // coloque seu código aqui
// }

// function createCartItemElement({ sku, name, salePrice }) {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// }

const appendElementToItems = (element) => {
  const pegandoSection = document.querySelector('.items');
  pegandoSection.appendChild(element);
};

window.onload = async () => {
  const products = await fetchProducts();
  console.log(products);

  const mapeandoInfo = products.results.map((currentValue) => 
  ({ sku: currentValue.id, name: currentValue.title, image: currentValue.thumbnail }));

  mapeandoInfo.forEach((currentValue) => {
    //  debugger;
    const resultado = createProductItemElement(currentValue);

    appendElementToItems(resultado);
  });
};

// REQUISITO 1: Chamando função fetchProducts, linha 57, que me traz o array de objetos API mercado livre. Ao carregar a página, espera a função fetchProducts terminar assincronamente, trazer os resultados que são as os produtos na tela. 
// na linha  60 mapeio meus produtos, e crio um objeto para cada, contendo só as informações que desejo.
// pego os objetos criados no map, com suas informações. Passo um forEach nestes objetos criados, para que a cada iteração ele mostre o produto na tela. Chamo a função que cria os elementos, e passo como parâmetros meus objetos, ou seja, serão adicionadas no html os elementos criados contendo as especificifações que veio do objeto map (id, name, img).
// linhas 50 a 52: chamei a função append dentro de onload, pois depois de criados todos os elementos no html com as informações que vieram do objeto, tenho que colocar esses elementos como filho da sections class itemns no html. É isso que essas linhas fazem, seleciono meu elemento pai section items, e passo o element (que é o resultado da minha função for each - elementos html criados com suas informações e imagens), como filhos desta section, sendo assim ,após isso, os produtos são mostrados na tela. 