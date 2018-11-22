import $ from '@src/assets/js/jquery3.3.1'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import List from './List/List.js'

export default class App {
  constructor(id) {
    this.$el = $('#' + id)
    // console.log(this.$el)
  }

  initShoppingCart() {
    let shoppingCart = new ShoppingCart(this)
    shoppingCart.init()
  }

  initList() {
    let list = new List(this)
    list.init() 
  }

  init() {
    // console.log('init')
    this.initShoppingCart()
    this.initList()
  }
}
