const getSavedCartItems = () => {
 const getItens = localStorage.getItem('cartItems');
 const selecionandoOl = document.querySelector('ol');
 selecionandoOl.innerHTML = getItens;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// Requisito 4 - remover itens do localStorage e mandar pro meu carrinho novamente, depois que a página é carregada: getItem get de pegar, estou pegando minhas lis que foram para o localStorage na linha 2. Na linha 3, eu seleciono a minha ol (pai das lis). Na linha 4, eu pego minha ol (que após carregar a página ficaria vazia), e reatribuo o valor dela (ou seja innerHtml, valor) para que a ol receba as lis que estavam no localStorage, receba as lis que peguei do localStorage.Assim ao carregar a página, minhas meus produtos (lis) voltam pro carrinho, pq o que estava guardado no localStorage  (lis) são colocados no carrinho novamente. Função chamada no window.onload.