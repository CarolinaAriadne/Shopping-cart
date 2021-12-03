require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('se a função fecthProducts é uma função', () => {
    const now = typeof fetchProducts;
    const expected = 'function';
    expect(now).toBe(expected);
  });

//   test('2 - Testa se a função fecthProducts é chamada com o argumento computador', () => {
 
//   });
});
