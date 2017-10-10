<template>
  <div class='audio'>
    <audio ref='audio' :src='musicUrl' @canplay='canplay' @pause='pause' @playing='playing' @ended='next' @timeupdate='timeupdate'></audio>
  </div>
</template>

<script>
export default {
  name: 'audio',
  computed: {
    musicUrl() {
      return this.$store.state.musicUrl.url;
    },
    musicState() {
      return this.$store.state.isPlay;
    },
    selectTime() {
      return this.$store.state.selectTime;
    },
  },
  watch: {
    musicState() {
      if (this.musicState) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    selectTime() {
      this.$refs.audio.currentTime = this.selectTime;
    },
    // musicUrl() {
    //   if (this.musicUrl === null) {
    //     this.next();
    //   }
    // },
  },
  methods: {
    // 在媒体数据已经有足够的数据（至少播放数帧）可供播放时触发
    canplay() {
      if (this.musicState) {
        this.$refs.audio.play();
      }
      // 诡异的uc读不到audio的duration
      this.$store.commit('setMusicDuration', this.$refs.audio.duration);
    },
    // 播放时commit播放状态
    playing() {
      this.$store.commit('playMusic');
    },
    // 暂停时commit暂停状态
    pause() {
      this.$store.commit('pauseMusic');
    },
    // 播放结束时播放下一首
    next() {
      this.$store.dispatch({
        type: 'nextMusic',
        that: this,
      });
    },
    timeupdate() {
      this.$store.commit('updateMusicTime', this.$refs.audio.currentTime);
    },
  },
  mounted() {
    if (!this.$store.getters.currentMusic) return;
    this.$store.dispatch({
      type: 'updateMusicUrl',
      that: this,
      musicId: this.$store.getters.currentMusic.id,
    });
  },
};
</script>

<style lang='scss'>

</style>
