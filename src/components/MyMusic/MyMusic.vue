<template>
  <div class='myMusic'>
    <v-myMusicItem v-for='(item, index) in lists' :key='index' :opt='item'></v-myMusicItem>
    <v-playlist :lists='myPlaylist'>
      <span slot='title'>创建的歌单</span>
    </v-playlist>
    <v-playlist :lists='collectPlaylist'>
      <span slot='title'>收藏的歌单</span>
    </v-playlist>
  </div>
</template>

<script>
import myMusicItem from '../MyMusicItem/MyMusicItem';
import playlist from '../Playlist/Playlist';
import lists from './list.json';

export default {
  name: 'myMusic',
  data() {
    return {
      lists,
    };
  },
  computed: {
    myPlaylist() {
      const id = this.$store.state.userId;
      return this.$store.state.playlist.filter(i => id === i.creator.userId);
    },
    collectPlaylist() {
      const id = this.$store.state.userId;
      return this.$store.state.playlist.filter(i => id !== i.creator.userId);
    },
  },
  components: {
    'v-myMusicItem': myMusicItem,
    'v-playlist': playlist,
  },
};
</script>

<style lang='scss'>
.myMusic {
  background-color: #f2f4f5;
  width: 100%;
  height: calc(100vh - 100px);
  margin: 50px 0;
  overflow: auto;
}
</style>
