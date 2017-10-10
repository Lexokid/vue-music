<template>
  <div class="content-body">
    <p class="line"></p>
    <img class="switch" :class="{active: isPlay}" src="../../assets/img/aac.png">
    <div class="cd" :class="{active: isPlay}">
      <img class="pic" :src="picUrl">
      <img src="../../assets/img/a9t.png">
    </div>
    <div class="music-option">
      <img src="../../assets/img/a_n.png">
      <img src="../../assets/img/a_e.png">
      <img src="../../assets/img/a_a.png">
      <img src="../../assets/img/a_r.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'cd',
  computed: {
    hasMusic() {
      return this.$store.getters.currentMusic;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    picUrl() {
      return this.hasMusic ? this.hasMusic.al.picUrl : null;
    },
  },
};
</script>

<style lang='scss'>
.content-body {
  position: relative;
  width: 100%;
  height: calc(80vh - 50px);
  overflow: hidden;
  .line {
    height: 1px;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 85%);
  }
  .switch {
    position: absolute;
    width: 90px;
    left: 50%;
    top: -14px;
    z-index: 1;
    transform-origin: 14px 14px;
    transform: rotateZ(-30deg);
    transition: all 1s;
    &.active {
      transform: rotateZ(0deg);
      transition: all 1s;
    }
  }
  .cd {
    position: relative;
    width: 45vh;
    height: 45vh;
    margin: 55px auto 0;
    animation: revolve 25s linear infinite;
    animation-play-state: paused;
    &.active {
      animation-play-state: running;
    }
    img {
      position: absolute;
      width: 100%;
    }
    .pic {
      width: 67%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }
  .music-option {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-content: center;
    width: 80%;
    padding: 0 10%;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
@keyframes revolve {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
