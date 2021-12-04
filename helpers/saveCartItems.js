const saveCartItems = (item) => localStorage.setItem('cartItems', item);
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

// obs: localStorage.setItem() - quando passo chave e valor, essa chave será adicionada ao storage, ou atualizar o valor, se a chave já existir. Set de setar, colocar algo no localStorage.
// obs: cartItemns - minha chave. Valor: li ou lis, do carrinho (produtos). 