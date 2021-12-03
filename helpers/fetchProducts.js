const fetchProducts = async (buscaProdutos) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${buscaProdutos}`;
  try {
    const products = await fetch(url)
    .then((response) => response.json());
    return products;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// fazendo busca de API, aguardando que a resposta volte, para que a resposta seja transformada em formato json