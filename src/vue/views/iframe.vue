<template>
  <div class="robot-window-wrap">
    <div class="robot-window-inner">
      <iframe
      id="robot-window-iframe"
      src="https://www.baidu.com/"
      frameborder="0">
      </iframe>
      <!-- src="http://180.213.8.245:65314/robot/#/robotWindow?token=222823841270816768&amp;userId=123456" -->
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.robot-window-wrap {
  
  .robot-window-inner {
    width: 600px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    #robot-window-iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>