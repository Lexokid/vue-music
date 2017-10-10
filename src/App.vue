<template>
  <div id='app'>
    <v-audio></v-audio>
    <!-- header -->
    <v-header></v-header>
    <!-- sildeBar -->
    <v-sildeBar></v-sildeBar>
    <!-- musicPage -->
    <v-musicPage></v-musicPage>
    <router-view></router-view>
    <v-playBar></v-playBar>
    <transition name="sildeUp">
      <router-view name="fullPage"></router-view>
    </transition>
  </div>
</template>

<script>
import header from './components/Header/Header';
import sildeBar from './components/SildeBar/SildeBar';
import playBar from './components/PlayBar/PlayBar';
import audio from './components/Audio/Audio';
import musicPage from './components/MusicPage/MusicPage';

export default {
  name: 'app',
  data() {
    return {
      page: ['MyMusic', 'CloudMusic', 'Dynamics'],
    };
  },
  components: {
    'v-header': header,
    'v-sildeBar': sildeBar,
    'v-playBar': playBar,
    'v-audio': audio,
    'v-musicPage': musicPage,
  },
  created() {
    // Load userId from localstorage to vuex
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.$store.commit('setUserId', user.account.id);
      this.$store.dispatch({
        type: 'updateUserDetail',
        that: this,
      });
      this.$store.dispatch({
        type: 'updatePlaylist',
        that: this,
      });
    }
    if (localStorage.getItem('musicQueue')) {
      const musicQueue = JSON.parse(localStorage.getItem('musicQueue'));
      this.$store.commit('setMusicQueue', musicQueue);
    }
    if (localStorage.getItem('musicNumber')) {
      const musicNumber = localStorage.getItem('musicNumber');
      this.$store.commit('setMusicNumber', Number(musicNumber));
    }
  },
  mounted() {
    const nextPage = this.$route.path.split('/')[1];
    if (this.page.includes(nextPage)) {
      this.$store.commit({
        type: 'changPage',
        nextPage,
      });
    }
  },
};
</script>

<style lang='scss'>
.sildeUp-enter-active {
  transition: transform .2s;
}

.sildeUp-leave-active {
  transition: transform .3s, opacity .3s;
}

.sildeUp-enter {
  transform: translateY(20%);
}

.sildeUp-leave-to {
  transform: translateY(20%);
  opacity: 0;
}
</style>
