const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

    const products = await fetch(url)
    .then((response) => response.json());
    // .then((error) => error.toString());
  
    return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

// fazendo busca de API, aguardando que a resposta volte, para que a resposta seja transformada em formato json