require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  test(' a - se a função fecthProducts é uma função', () => {
    const now = typeof fetchProducts;
    const expected = 'function';
    expect(now).toBe(expected);
  });
  test('b  - Testa se a função fecthProducts é chamada com o argumento computador', () => {
     fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  test('c - Testa se a função fecthProducts chamada com argumento computador, a função fetch utiliza a url descrita na variável url', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);

  });
  test('d- Testa se o retorno da função fetchProducts com argumento computador é uma estrutra de dados igual ao objeto computadorSearch', async () => {
   const now2 = await fetchProducts('computador');
    expect(now2).toEqual(computadorSearch);
  });
  test('e - Testa se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem You must provide an url',async () => {
    const now3 = await fetchProducts();
    const erro = new Error('You must provide an url');
    expect(now3).toEqual(erro);
  });
});
