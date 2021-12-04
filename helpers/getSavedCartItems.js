const getSavedCartItems = () => {
 const getItens = localStorage.getItem('cartItems');
 const selecionandoOl = document.querySelector('ol');
 selecionandoOl.innerHTML = getItens;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
