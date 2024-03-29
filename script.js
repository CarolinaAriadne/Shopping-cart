const somaValoresItens = (valorProduto) => {
  let buscaValorAtual = parseFloat(localStorage.getItem('precoTotal'));
  if (Number.isNaN(buscaValorAtual) || buscaValorAtual === undefined || buscaValorAtual == null) { 
     buscaValorAtual = 0;
    }
   const soma = (buscaValorAtual + valorProduto).toFixed(2); 
   const seleciondoSectionPrice = document.querySelector('.total-price');
   seleciondoSectionPrice.innerHTML = soma;
   localStorage.setItem('precoTotal', soma);
};

const criaBotaoLimpa = () => {
 const buscarOl = document.querySelector('ol');
  const pegandoBotaoLimpar = document.querySelector('.empty-cart');
  pegandoBotaoLimpar.addEventListener('click', () => {
    buscarOl.innerHTML = '';
    localStorage.setItem('cartItems', '');
    localStorage.setItem('precoTotal', 0);
    somaValoresItens(0);
  });
};

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

const subtraiValoresItens = (valorProduto) => {
  let buscaValorAtual = parseFloat(localStorage.getItem('precoTotal'));
  if (Number.isNaN(buscaValorAtual) || buscaValorAtual === undefined || buscaValorAtual == null) { 
     buscaValorAtual = 0;
    }

  const subtracao = (buscaValorAtual - valorProduto).toFixed(2); 

   const seleciondoSectionPrice = document.querySelector('.total-price');
   seleciondoSectionPrice.innerHTML = subtracao;
   localStorage.setItem('precoTotal', subtracao);
};

function cartItemClickListener(event) {
  const elementoClicado = event.target;
  const precoComoString = elementoClicado.firstElementChild.innerText;
  const price = parseFloat(precoComoString);
  subtraiValoresItens(price);
  elementoClicado.remove();
  const selecionaOl = document.querySelector('ol');
  saveCartItems(selecionaOl.innerHTML);
}

function carregaAindaRomove() {
const pegalis = document.querySelectorAll('.cart__item');
pegalis.forEach((element) => {
  element.addEventListener('click', cartItemClickListener);
});
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerHTML = `SKU: ${sku} | NAME: ${name} | PRICE: $<span class='price'>${salePrice}</span>`;
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
  somaValoresItens(dados.price);
 createCartItemElement(dados);
  const selecionaOl = document.querySelector('ol');
  saveCartItems(selecionaOl.innerHTML);
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
  const buscarLoading = document.querySelector('.loading');
  const products = await fetchProducts('computador');
  buscarLoading.remove();
  const mapeandoInfo = products.results.map((currentValue) => 
  ({ sku: currentValue.id, name: currentValue.title, image: currentValue.thumbnail }));

  mapeandoInfo.forEach((currentValue) => {
    const resultado = createProductItemElement(currentValue);
    appendElementToItems(resultado);
  });
  listenerButtons();
  criaBotaoLimpa();
  const getItens = localStorage.getItem('cartItems');
  const selecionandoOl = document.querySelector('ol');
  selecionandoOl.innerHTML = getItens;
  somaValoresItens(0);
  carregaAindaRomove();
  };
 
// REQUISITO 1: Chamando função fetchProducts, linha 57, que me traz o array de objetos API mercado livre. Ao carregar a página, espera a função fetchProducts terminar assincronamente, trazer os resultados que são as os produtos na tela. 
// na linha  82 mapeio meus produtos, e crio um objeto para cada, contendo só as informações que desejo.
// pego os objetos criados no map, com suas informações. Passo um forEach nestes objetos criados, para que a cada iteração ele mostre o produto na tela. Chamo a função que cria os elementos na tela (linha 23 createProductItemElement), e passo como parâmetros meus objetos, ou seja, serão adicionadas no html os elementos criados contendo as especificifações que veio do objeto map (id, name, img).
// linhas 85 : chamei a função append dentro de onload, pois depois de criados todos os elementos no html com as informações que vieram do objeto, tenho que colocar esses elementos como filho da sections class itemns no html. É isso que essas linhas fazem, seleciono meu elemento pai section items, e passo o element (que é o resultado da minha função for each - elementos html criados com suas informações e imagens), como filhos desta section, sendo assim ,após isso, os produtos são mostrados na tela. OBS: existe o await aqui : window.onload = async () => { const products = await fetchProducts('computador'); - pq se não houver, ele retorna uma promise (em status pendente) do objeto, o dado bruto, porém em promise, pq pode falhar. O await, é usado,pq só depois do resultado positivo da busca da url, é que há o retorno do dado bruto em si e não da promessa destte

// REQUISTO 2, colocar produtos no carrinho: após requisito 1, linha 89. Chamo minha função listenerButtons, e por meio dela, seleciono todos os meus buttons criados. É necessário que ao clicar nos botões, o produto selecionado seja adicionada ao carrinho.  Na linha  70, cada botão recebe um evento de clique, e quando este clique ocorre, na linha 72 acesso o elemento pai desses botões que é uma section-class, acesso seu primeiro filho que é um span e por fim, acesso o texto dessa span que é o id (sku) do produto. 
// linha 73 chamo a função addItemCard, passando como parâmetro o id do produto. Essa função é assíncrona, em razão da função fetchItem estar como assíncrona, ela precisa acontecer, depois que temos a resposta do fetchItem. Assim que a fetchItem é executada e retorna sua resposta com o id do produto, chamamos então a função creatCartItemElement, já com a resposta da fetchItem que são os produtos com os dados (id, title, price)
// linha 48, chamada a função createCartItemElement com o parâmetro dos dados dos produtos, desustruturamos esses dados, para poder utilizar na função. 
// li são criadas e possuem como texto, os dados de cada produto (id,title,price).Seleciono a ol, e coloco todas as li's criadas como filhas de ol para que os dados do produto clicado, aparecem no carrinho (id,name, price).

// REQUISITO 3: Romovendo itens do carrinho. Evento de clique no botão já feito linha 51.Depois do clique, função Linhas 42 a 44 é chamada, guardei meu elemento clicado, minha li no caso, e passei a função remove para minha li clicada, assim, removendo minha li clicada,  que possui um produto.

// REQUISITO 6: Limpando todo o carrinho (ou seja, lis), ao clicar no botão esvaziar. Linhas 1 a 5. Selecionei minha ol pai das lis. Linhas 3 e 4 , adicionei evento de clique no botão esvaziar, assim que clicado, a função anônima é executada, ou seja, passo minha ol que está na variável, seleciono o que existe dentro dela com inner.html (o que existem são as lis), e reatribuo seu valor para vazio, ou seja, ao clicar no botão esvaziar, todas minhas lis filhas da ol, passam a não mais existir, porque a ol, passou a ter como valor, o valor vazio, sem nada. 

// REQUISITO 4: Salva itens do carrinho no localStorage, recuperar os itens do carrinho quando a página é carregada, e após carregada, precisamos conseguir excluir o item do carrinho se quisermos. Linha 72, chamo minha função saveCartItemns, pois onde ela está sendo chamada, tudo já ocorreu, os elementos já estão na tela e caso clicado no produto, os produtos já terão sido apensados no carrinho. Meu parâmetro é o innerHtml da minha ol, ou seja, tudo que existe nela, as lis que são os produtos adicionados no carrinho. Assim, essas lis que estão como parâmetro da minha função que salva o item no locaStorage, faz de fato esse salvamento de forma que meus produtos aparecem no localStorage assim que aparecem no carrinho. 
// Requisito 4 segunda parte: linhas 98 a 100 (remoção dos itens do localStorage (tirados do localStorage e colocados na página novamente, após carregamento de página):  getItem get de pegar, estou pegando minhas lis que foram para o localStorage na linha 2. Na linha 3, eu seleciono a minha ol (pai das lis). Na linha 4, eu pego minha ol (que após carregar a página ficaria vazia), e reatribuo o valor dela (ou seja innerHtml, valor) para que a ol receba as lis que estavam no localStorage, receba as lis que peguei do localStorage.Assim ao carregar a página, minhas meus produtos (lis) voltam pro carrinho, pq o que estava guardado no localStorage  (lis) são colocados no carrinho novamente. Função chamada no window.onload.
// Requisito 4 terceira parte: ao carregar minha página, meus produtos voltam pro carrinho, pq o histórico do localStorage é tirado de lá e setado no carrinho. Os itens sendo setados noc arrinho novamente após carregamento, ficam estáticos, sem poderem ser excluídos. Para que possam ser excluídos:  linha 47 a 50, seleciono todas minhas lis, passo um forEach nelas. Cada li recebe um evento de clique, assim que a li é clicada, a função cartItemClickListener é chamada, e essa função remove a li que é clicada. Desta forma, após o carregamento da página, com os produtos no carrinho vindos do localStorage, estes ainda podem ser removidos individualmente. 

// REQUISITO 7: criada tag p no html com o texto carregando. Enquanto a linha 119 não ocorre,ou seja, enquanto estamos aguardando a resposta da requisição da API, o texto carregando fica aparecendo na tela. Assim que a requisição é atendida e a resposta retorna, linha 120, ou seja, removo meu texto carregando da tela (que havia sido coletado pela classe na linha 118).