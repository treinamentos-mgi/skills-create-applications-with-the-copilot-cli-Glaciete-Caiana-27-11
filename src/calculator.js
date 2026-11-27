#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Operações suportadas:
 *   - addition        (add, +)      : soma
 *   - subtraction     (sub, -)      : subtração
 *   - multiplication  (mul, x, *)   : multiplicação
 *   - division        (div, /)      : divisão (erro em caso de divisão por zero)
 *   - modulo          (mod, %)      : resto da divisão (erro em caso de módulo por zero)
 *   - exponentiation  (pow, power, ^): potência (erro se o resultado não for finito)
 *   - square root     (sqrt)        : raiz quadrada (erro para números negativos)
 *
 * Uso:
 *   node src/calculator.js <operação> <número1> <número2>
 *   node src/calculator.js sqrt <número>
 *   node src/calculator.js add 2 3     # 5
 *   node src/calculator.js div 10 4    # 2.5
 *   node src/calculator.js mod 10 3    # 1
 *   node src/calculator.js pow 2 10    # 1024
 *   node src/calculator.js sqrt 16     # 4
 */

// Adição: a + b
function add(a, b) {
  return a + b;
}

// Subtração: a - b
function subtract(a, b) {
  return a - b;
}

// Multiplicação: a * b
function multiply(a, b) {
  return a * b;
}

// Divisão: a / b (divisão por zero não é permitida)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

// Módulo: resto de a / b (módulo por zero não é permitido)
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Exponenciação: a elevado a b (resultado deve ser um número finito)
function power(base, exponent) {
  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result)) {
    throw new Error('Resultado da exponenciação não é um número finito.');
  }
  return result;
}

// Raiz quadrada: √a (não definida para números negativos)
function squareRoot(a) {
  if (a < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(a);
}

const operations = {
  add, '+': add,
  sub: subtract, subtract, '-': subtract,
  mul: multiply, multiply, x: multiply, '*': multiply,
  div: divide, divide, '/': divide,
  mod: modulo, modulo, '%': modulo,
  pow: power, power, '^': power,
  sqrt: squareRoot, squareRoot,
};

function main(args) {
  const [op, ...rawNumbers] = args;
  const fn = operations[op];
  const numbers = rawNumbers.map((n) => (n.trim() === '' ? NaN : Number(n)));

  if (!fn || numbers.length !== fn.length || numbers.some(Number.isNaN)) {
    console.error('Uso: node src/calculator.js <add|sub|mul|div|mod|pow> <número1> <número2>');
    console.error('     node src/calculator.js sqrt <número>');
    process.exit(1);
  }

  try {
    console.log(fn(...numbers));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
