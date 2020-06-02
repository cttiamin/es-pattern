<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: 'app text'
    }
  },
  components: {
    // appHeader,
  }
}
</script>
<style lang="scss">
html,body,#app{
		width:100%;
		height: 100%;
	}
#app {
  font-size: 0.16rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
}
</style>