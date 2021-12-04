require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  const url = 'https://api.mercadolibre.com/items/MLB1615760527';
  test(' a - se a função fecthItem é uma função', () => {
    const testa = typeof fetchItem;
    const expected = 'function';
    expect(testa).toBe(expected);
  });
  test('b  - Testa se a função fechItem é chamada com o argumento MLB1615760527 ', () => {
    fetchItem('MLB1615760527');
   expect(fetch).toHaveBeenCalled();
    });
    test('c - Testa se ao chamar a função fechItem  com argumento MLB1615760527, se função fetch utiliza a url descrita na variável url', () => {
      fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith(url);
  
    });
    test('d- Testa se o retorno da função fechItem com argumento MLB1615760527 é uma estrutra de dados igual ao objeto item', async () => {
      const testa2 = await fetchItem('MLB1615760527');
       expect(testa2).toEqual(item);
     });
     test('e - Testa se ao chamar a função fechItem sem argumento, retorna um erro com a mensagem You must provide an url',async () => {
      const testa3 = await fetchItem();
      const erro = new Error('You must provide an url');
      expect(testa3).toEqual(erro);
    });
});
