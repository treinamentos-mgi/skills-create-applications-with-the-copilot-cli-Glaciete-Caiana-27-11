#!/usr/bin/env node
/**
 * Calculadora CLI em Node.js.
 *
 * Operações suportadas:
 *   - addition        (add, +)      : soma
 *   - subtraction     (sub, -)      : subtração
 *   - multiplication  (mul, x, *)   : multiplicação
 *   - division        (div, /)      : divisão (erro em caso de divisão por zero)
 *   - modulo          (mod, %)      : resto da divisão (erro em caso de divisor zero)
 *   - exponentiation  (pow, ^)      : potência (base elevada ao expoente)
 *   - square root     (sqrt)        : raiz quadrada (erro para números negativos)
 *
 * Uso:
 *   node src/calculator.js <operação> <número1> <número2>
 *   node src/calculator.js add 2 3     # 5
 *   node src/calculator.js div 10 4    # 2.5
 *   node src/calculator.js mod 10 3    # 1
 *   node src/calculator.js pow 2 8     # 256
 *   node src/calculator.js sqrt 9      # 3
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

// Módulo: resto da divisão de a por b
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

// Potência: base elevada a exponent
function power(base, exponent) {
  return Math.pow(base, exponent);
}

// Raiz quadrada de n (números negativos não são permitidos)
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(n);
}

const operations = {
  add, '+': add,
  sub: subtract, subtract, '-': subtract,
  mul: multiply, multiply, x: multiply, '*': multiply,
  div: divide, divide, '/': divide,
  mod: modulo, modulo, '%': modulo,
  pow: power, power, '^': power,
};

// Operações que recebem apenas um operando
const unaryOperations = {
  sqrt: squareRoot,
};

function main(args) {
  const [op, rawA, rawB] = args;
  const unary = op in unaryOperations;
  const fn = unary ? unaryOperations[op] : operations[op];
  const a = Number(rawA);
  const b = Number(rawB);
  const validArgs = unary
    ? args.length === 2 && !Number.isNaN(a)
    : args.length === 3 && !Number.isNaN(a) && !Number.isNaN(b);

  if (!fn || !validArgs) {
    console.error('Uso: node src/calculator.js <add|sub|mul|div|mod|pow> <n1> <n2> | sqrt <n>');
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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };
