// 函数性能测试
// 

const {num1, num2} = require('../src/math');

const Benchmark = require('benchmark')

// const suite = new Benchmark.Suite;

var suite = new Benchmark.Suite;

suite.add('parseInt', () => {
  num1('123456')
}).add('Number', () => {
  num2('123456');
}).on('cycle', event => {
  console.log(String(event.target));
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({'async': true})

// add tests
// suite.add('RegExp#test', function() {
//   /o/.test('Hello World!');
// })
// .add('String#indexOf', function() {
//   'Hello World!'.indexOf('o') > -1;
// })
// .add('String#match', function() {
//   !!'Hello World!'.match(/o/);
// })
// // add listeners
// .on('cycle', function(event) {
//   console.log(String(event.target));
// })
// .on('complete', function() {
//   console.log('Fastest is ' + this.filter('fastest').map('name'));
// })
// // run async
// .run({ 'async': true });
