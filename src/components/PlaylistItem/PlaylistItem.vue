<template>
  <div class='playlistItem' v-if='!types' @click='toPlaylistPage'>
    <div class="left">
      <img :src='item.coverImgUrl' />
    </div>
    <div class="right">
      <div class="detail">
        <p class="name">{{item.name}}</p>
        <span>{{item.trackCount}}首</span>
        <img src='../../assets/img/zk.png' />
      </div>
      <p class="border-1px"></p>
    </div>
  </div>
  <div class='playlistItem' @click='playMusic' v-else>
    <div class="left">
      {{num+1}}
    </div>
    <div class="right">
      <div class="detail">
        <p class="name" :class='{opc: isCopyright}'>{{item.name}}</p>
        <span :class='{opc: isCopyright}'>{{item.ar[0].name}}-{{item.al.name}}</span>
        <img src='../../assets/img/zk.png' />
      </div>
      <p class="border-1px"></p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'playlistItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
    types: {
      type: Boolean,
      default: false,
    },
    num: {
      type: Number,
      default: 1,
    },
    privileges: {
      type: Object,
      default: null,
    },
  },
  computed: {
    isCopyright() {
      return this.privileges.st === -200
        && this.privileges.pl === 0
        && this.privileges.dl === 0
        && this.privileges.sp === 0
        && this.privileges.cp === 0;
    },
  },
  methods: {
    toPlaylistPage() {
      localStorage.setItem('playlistImg', this.item.coverImgUrl);
      this.$router.push({ path: '/Playlist', query: { id: this.item.id } });
    },
    playMusic() {
      if (this.isCopyright) return;
      localStorage.setItem('musicNumber', this.num);
      this.$store.commit('playMusic');
      this.$store.commit('setMusicNumber', this.num);
      this.$store.dispatch({
        type: 'updateMusicUrl',
        that: this,
        musicId: this.item.id,
      });
      this.$emit('updateMusicQueue');
    },
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';
@import '../../assets/css/border-1px.scss';

.border-1px {
  @include border-1px(#d9d9d9);
}

.playlistItem {
  display: -webkit-box;
  height: 60px;
  .opc {
    opacity: .3;
  }
  .left {
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    padding: 3px;
    margin: 0 3px;
    @extend %center;
    color: #919293;
    img {
      width: 100%;
      height: 100%;
      vertical-align: initial;
    }
  }
  .right {
    flex: 1;
    position: relative;
    .detail {
      width: calc(100% - 60px);
      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 10px;
        height: 25px;
        line-height: 25px;
        width: 100%;
      }
      span {
        display: block;
        margin-bottom: 10px;
        height: 15px;
        line-height: 15px;
        font-size: 12px;
        width: 100%;
        color: #797979;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 20px;
        height: 20px;
        position: absolute;
        margin: auto;
        padding: 20px;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
}
</style>
