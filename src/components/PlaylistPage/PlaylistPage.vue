<template>
  <div class='playlist-page'>
    <v-gradientTitle :name='name' :bgUrl='bgUrl'></v-gradientTitle>
    <v-playlistTop :name='name' :bgUrl='bgUrl' :avatar='avatar' :creator='creator' :count='count'></v-playlistTop>

    <div v-if="loading" class="loading">
      <div class="left"></div>
      <div class="right"></div>
    </div>

    <div v-if="error" class="error">
      error，数据获取失败
    </div>

    <div v-if="content" class="content">
      <div class="split">
        <img src="../../assets/img/zn.png">
        <span>播放全部</span>
        <span>(共{{content.playlist.trackCount}}首)</span>
        <p>
          <img src="../../assets/img/aav.png">
          <span>多选</span>
        </p>
      </div>
      <p class="border-1px"></p>
      <v-playlistItem v-for='(list, index) in content.playlist.tracks' :key='index' :types='true' :item='list' :num='index' :privileges='content.privileges[index]' @updateMusicQueue='updateMusicQueue'></v-playlistItem>
    </div>
    <v-playBar></v-playBar>
  </div>
</template>

<script>
import gradientTitle from '../GradientTitle/GradientTitle';
import playlistTop from '../PlaylistTop/PlaylistTop';
import playBar from '../PlayBar/PlayBar';
import playlistItem from '../PlaylistItem/PlaylistItem';

export default {
  name: 'playlist-page',
  data() {
    return {
      loading: false,
      error: null,
      content: null,
    };
  },
  computed: {
    name() {
      return this.content ? this.content.playlist.name : null;
    },
    bgUrl() {
      return localStorage.getItem('playlistImg');
    },
    avatar() {
      return this.content ? this.content.playlist.creator.avatarUrl : null;
    },
    creator() {
      return this.content ? this.content.playlist.creator.nickname : null;
    },
    count() {
      return this.content ? {
        subscribedCount: this.content.playlist.subscribedCount,
        shareCount: this.content.playlist.shareCount,
        commentCount: this.content.playlist.commentCount,
      } : {};
    },
    filterCopyright() {
      return this.content.playlist.tracks.filter((e, i) => {
        const privileges = this.content.privileges[i];
        return !(privileges.st === -200
          && privileges.pl === 0
          && privileges.dl === 0
          && privileges.sp === 0
          && privileges.cp === 0);
      });
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = null;
      this.content = null;
      this.loading = true;
      const res = await this.$music.getPlaylistDetail(this.$route.query.id, true);
      if (res.data.code === 200) {
        this.loading = null;
        this.content = res.data;
      } else {
        this.loading = null;
        this.error = true;
      }
    },
    updateMusicQueue() {
      localStorage.setItem('musicQueue', JSON.stringify(this.content.playlist.tracks));
      this.$store.commit('setMusicQueue', this.content.playlist.tracks);
    },
  },
  components: {
    'v-gradientTitle': gradientTitle,
    'v-playlistTop': playlistTop,
    'v-playBar': playBar,
    'v-playlistItem': playlistItem,
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';
@import '../../assets/css/border-1px.scss';

.border-1px {
  @include border-1px(#d9d9d9);
}

.playlist-page {
  @extend %full-page;
  background-color: #f2f4f5;

  .loading,
  .error {
    position: absolute;
    left: 0;
    right: 0;
    margin: 20px auto;
  }
  .loading {
    width: 30px;
    height: 30px;
    overflow: hidden;
    animation: rotate 1.5s linear infinite;
    .left {
      overflow: hidden;
      width: 50%;
      height: 100%;
      float: left;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 15px 0 0 15px;
        box-sizing: border-box;
        border-width: 3px;
        border-style: solid;
        border-color: #d33a31 transparent;
        transform-origin: 100% 50%;
        animation: left 2s linear infinite;
      }
    }
    .right {
      overflow: hidden;
      width: 50%;
      height: 100%;
      float: right;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0 15px 15px 0;
        box-sizing: border-box;
        border-width: 3px;
        border-style: solid;
        border-color: #d33a31 #d33a31 #d33a31 transparent;
        transform-origin: 0 50%;
        animation: right 2s linear infinite;
      }
    }
  }
  @keyframes right {
    0% {
      transform: rotateZ(0deg);
    }
    25%,
    50% {
      transform: rotateZ(180deg);
    }
    75%,
    100% {
      transform: rotateZ(360deg);
    }
  }
  @keyframes left {
    0%,
    25% {
      transform: rotateZ(0deg);
    }
    50%,
    75% {
      transform: rotateZ(180deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  @keyframes rotate {
    to {
      transform: rotateZ(360deg);
    }
  }
  .content {
    width: 100%;
    margin-bottom: 50px;
    .split {
      height: 50px;
      img {
        width: 20px;
        height: 20px;
        margin: 15px;
      }
      span:nth-of-type(2) {
        font-size: 14px;
        color: #919293;
      }
      p {
        float: right;
        padding-right: 10px;
        img {
          width: 20px;
          height: 20px;
          margin: 15px 0 15px;
        }
      }
    }
  }
}
</style>
