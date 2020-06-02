<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      （inventory: {{product.inventory}}）<!-- 这里可以自己加一下显示库存 -->
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { currency } from '../../lib/currency'

// Vue.filter('currency', currency) // 转换为 `$19.99` 格式，无需过多关注
export default {
  computed: mapState({
    // 获取所有商品
    products: state => state.products.all
  }),
  methods: mapActions('cart', [
    // 添加商品到购物车
    'addProductToCart'
  ]),
  created () {
    // 加载所有商品
    this.$store.dispatch('products/getAllProducts')
  },
  filters :{
    currency: currency
  }
}
</script>
