const {should, expect, assert} = require('chai')
const {add, mul, cube, square, cover} = require('../src/math');



describe('#math', () => {
  describe('add', () => {
    it('should return 5 when 2 + 3', () => {
      expect(add(2, 3), 5)
    })

    // skip  / only 
    it.skip('should return 5 when 2 - 3', () => {
      expect(add(2, -3), -1);
    })
  })

  describe('mul', ()=>{
    it('should return 6 when 2 * 3', () => {
      expect(mul(2, 3), 6)
    })
  })

  describe('cube', () => {
    it('should return 2 where 2 * 2 * 2', ()=>{
      expect(cube(2), 8)
    })
  })

  describe('square', () => {
    it('should return 4 when 2 * 2', () =>{
      expect(square(2)).to.equal(4)
    })
  })

  describe('cover', () => {
    it('should return 1 when cover(2, 1)', () => {
      expect(cover(2, 1)).to.equal(1);
    })
    it('should return 3 when cover(1, 2)', () => {
      expect(cover(1, 2)).to.equal(3);
    })

    it('should return 4 when cover(2, 2)', () => {
      expect(cover(2, 2)).to.equal(4);
    })
  })


})