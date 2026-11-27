const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('operações básicas', () => {
  test('addition: 2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
  test('subtraction: 5 - 3 = 2', () => expect(subtract(5, 3)).toBe(2));
  test('multiplication: 4 * 5 = 20', () => expect(multiply(4, 5)).toBe(20));
  test('division: 10 / 4 = 2.5', () => expect(divide(10, 4)).toBe(2.5));
  test('division por zero lança erro', () => {
    expect(() => divide(1, 0)).toThrow('Divisão por zero');
  });
});

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('divisão exata retorna 0', () => expect(modulo(6, 3)).toBe(0));
  test('dividendo menor que divisor retorna o dividendo', () => expect(modulo(2, 5)).toBe(2));
  test('dividendo negativo mantém o sinal', () => expect(modulo(-5, 2)).toBe(-1));
  test('números decimais', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('módulo por zero lança erro', () => {
    expect(() => modulo(5, 0)).toThrow('Módulo por zero');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('qualquer base elevada a 0 é 1', () => expect(power(7, 0)).toBe(1));
  test('0 ^ 0 = 1', () => expect(power(0, 0)).toBe(1));
  test('expoente negativo', () => expect(power(2, -2)).toBe(0.25));
  test('expoente fracionário (raiz)', () => expect(power(9, 0.5)).toBe(3));
  test('base negativa com expoente ímpar', () => expect(power(-2, 3)).toBe(-8));
  test('base negativa com expoente par', () => expect(power(-2, 2)).toBe(4));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√2 aproximado', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('número decimal: √0.25 = 0.5', () => expect(squareRoot(0.25)).toBe(0.5));
  test('número negativo lança erro', () => {
    expect(() => squareRoot(-1)).toThrow('Raiz quadrada de número negativo');
  });
});
