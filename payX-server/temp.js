import 'babel-polyfill';
async function foo() {
  return 42;
}

async function print() {
  for (let i = 0; i < 10; i++) {
    const bar = await foo();
    console.log(bar);
  }
}

const a = await print();

