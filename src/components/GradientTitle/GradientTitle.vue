<template>
  <div class='gradientTitle'>
    <div class="bg">
      <img :src="bgUrl">
    </div>
    <div class="title">
      <div class="left">
        <img src="../../assets/img/mv.png" @click="goBack">
        <p>{{name||'歌单'}}</p>
      </div>
      <div class="right">
        <img src="../../assets/img/n1.png">
        <img src="../../assets/img/mu.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gradientTitle',
  props: {
    name: {
      type: String,
      default: '',
    },
    bgUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang='scss'>
.gradientTitle {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  z-index: 1;
  .bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      filter: blur(20px);
      transform-origin: center;
      transform: scale(2);
    }
  }
  .title {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
      p {
        color: #fff;
        font-size: 18px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
}
</style>
