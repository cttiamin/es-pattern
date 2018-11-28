const {should, expect, assert} = require('chai')
const {add, mul} = require('../src/math');

// if(add(2, 3) === 5) {
//   console.log('add(2, 3) === 5, error')
// } else {
//   console.log('add(2, 3) !== 5, error')
// }

// 使用 assert 
// const assert = require('assert');
// assert.equal(add(2, 3), 5)


// chai
should();
add(2, 3).should.equal(5);
// expect(add(2, 3)).to.be(5)

// TDD
assert.equal(add(2,3), 5)
