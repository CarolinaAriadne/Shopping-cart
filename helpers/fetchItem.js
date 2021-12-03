const fetchItem = async (idProdutos) => {
  const url2 = `https://api.mercadolibre.com/items/${idProdutos}`;

  const product2 = await fetch(url2)
  .then((response) => response.json());

  return product2;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

// fetchItem recebe o id de cada produto. Faço a requisição da API, e aguardo a resposta da promessa. Quando tenho a resposta, pego essa resposta e coloco ela para ser
// recebida em formato json.