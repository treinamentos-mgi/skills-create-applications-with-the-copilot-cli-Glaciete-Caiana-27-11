#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Operações suportadas:
 *   - addition        (add, +)      : soma
 *   - subtraction     (sub, -)      : subtração
 *   - multiplication  (mul, x, *)   : multiplicação
 *   - division        (div, /)      : divisão (erro em caso de divisão por zero)
 *
 * Uso:
 *   node src/calculator.js <operação> <número1> <número2>
 *   node src/calculator.js add 2 3     # 5
 *   node src/calculator.js div 10 4    # 2.5
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

const operations = {
  add, '+': add,
  sub: subtract, subtract, '-': subtract,
  mul: multiply, multiply, x: multiply, '*': multiply,
  div: divide, divide, '/': divide,
};

function main(args) {
  const [op, rawA, rawB] = args;
  const fn = operations[op];
  const a = Number(rawA);
  const b = Number(rawB);

  if (!fn || args.length !== 3 || Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Uso: node src/calculator.js <add|sub|mul|div> <número1> <número2>');
    process.exit(1);
  }

  try {
    console.log(fn(a, b));
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { add, subtract, multiply, divide };
