<template>
  <div class='play-bar' @click='showMusicPage'>
    <div class="music-info">
      <img :src="picUrl || '/static/a8t.png'">
      <div>
        <p>{{title}}</p>
        <p>{{author}}</p>
      </div>
    </div>
    <div class="play-pause" @click.stop="togglePlay">
      <img src="../../assets/img/a8f.png" v-show="!isPlay">
      <img src="../../assets/img/a8d.png" v-show="isPlay">
    </div>
    <i></i>
  </div>
</template>

<script>
export default {
  name: 'play-bar',
  computed: {
    hasMusic() {
      return this.$store.getters.currentMusic;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    title() {
      return this.hasMusic ? this.hasMusic.name : null;
    },
    author() {
      return this.hasMusic ? this.hasMusic.ar[0].name : null;
    },
    picUrl() {
      return this.hasMusic ? this.hasMusic.al.picUrl : null;
    },
  },
  methods: {
    togglePlay() {
      this.$store.commit('togglePlay');
    },
    showMusicPage() {
      this.$store.commit('openMusicPage');
    },
  },
};
</script>

<style lang='scss'>
.play-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #fff;
  .music-info {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin: 5px;
    }
    p:nth-child(1) {
      font-size: 14px;
    }
    p:nth-child(2) {
      font-size: 12px;
      color: #7d7d7d;
      margin-top: 5px;
    }
  }
  i {
    background: url(\/static/aa_.png) no-repeat;
    background-size: cover;
    width: 50px;
    height: 50px;
  }
  .play-pause {
    width: 25px;
    height: 25px;
    img {
      width: 100%;
    }
  }
}
</style>
