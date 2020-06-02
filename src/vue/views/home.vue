<template>
  <div>
    <div class="todo-list">
      <Input @add="addHandler" />
      <List
        :list="list"
        @delete="deleteHandler"
      />
      <formLogin v-if="showForm" />
      <button @click="showForm = true">show form</button>
    </div>
    <div class="shop-car">
      <ProductList/>
      <ShoppingCart/>
    </div>
  </div>
</template>

<script>
import Input from "@vue/views/Input.vue";
import List from "@vue/views/List.vue";
import ProductList from "@vue/views/cart/ProductList.vue";
import ShoppingCart from "@vue/views/cart/ShoppingCart.vue";

export default {
  components: {
    Input,
    List,
    ProductList,
    ShoppingCart,
    // 异步加载组件
    formLogin: () => import("@vue/views/Test.vue")
  },
  data () {
    return {
      list: [
        {
          id: "id-1",
          title: "标题1"
        },
        {
          id: "id-2",
          title: "标题2"
        }
      ],
      showForm: false
    };
  },
  methods: {
    addHandler(title) {
      this.list.push({
        id: `id-${Date.now()}`,
        title
      });
    },
    deleteHandler(id) {
      this.list = this.list.filter(item => item.id !== id);
    }
  },
  created() {
    // eslint-disable-next-line
    console.log("index created");
  },
  mounted() {
    // eslint-disable-next-line
    console.log("index mounted");
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log("index before update");
  },
  updated() {
    // eslint-disable-next-line
    console.log("index updated");
  }
};
</script>

<style lang="scss" scoped>
</style>