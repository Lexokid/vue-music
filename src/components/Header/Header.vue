<template>
  <div class='header'>
    <i class="menubtn">
      <img src="../../assets/img/mh.png" alt="menu" @click='showMenu'>
    </i>
    <div class="actionbar">
      <i>
        <!-- v-show has lowerer toggle render costs -->
        <router-link :to="{path:'/MyMusic'}">
          <img v-show='isCurrentePage("MyMusic")' src="../../assets/img/t_actionbar_music_selected.png" alt="MyMusic">
          <img v-show='!isCurrentePage("MyMusic")' src="../../assets/img/t_actionbar_music_normal.png" alt="MyMusic">
        </router-link>
      </i>
      <i>
        <router-link :to="{path:'/CloudMusic'}">
          <img v-show='isCurrentePage("CloudMusic")' src="../../assets/img/t_actionbar_discover_selected.png" alt="CloudMusic">
          <img v-show='!isCurrentePage("CloudMusic")' src="../../assets/img/t_actionbar_discover_normal.png" alt="CloudMusic">
        </router-link>
      </i>
      <i>
        <router-link :to="{path:'/Dynamics'}">
          <img v-show='isCurrentePage("Dynamics")' src="../../assets/img/t_actionbar_friends_selected.png" alt="Dynamics">
          <img v-show='!isCurrentePage("Dynamics")' src="../../assets/img/t_actionbar_friends_normal.png" alt="Dynamics">
        </router-link>
      </i>
    </div>
    <i class="search">
      <router-link to="/Search">
        <img src="../../assets/img/n1.png" alt="search">
      </router-link>
    </i>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      page: ['MyMusic', 'CloudMusic', 'Dynamics'],
    };
  },
  watch: {
    $route(to, from) {
      const nextPage = to.path.split('/')[1];
      if (this.page.includes(nextPage)) {
        this.$store.commit({
          type: 'changPage',
          nextPage,
        });
      }
    },
  },
  methods: {
    isCurrentePage(page) {
      return this.$store.state.currentPage === page;
    },
    showMenu() {
      this.$store.commit({
        type: 'toggleMenu',
      });
    },
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';

.header {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: #d33a31;
  @extend %center-between;
  .menubtn {
    padding-left: 15px;
  }
  .search {
    padding-right: 15px;
  }
  img {
    width: 26px;
    height: 26px;
  }
  .actionbar {
    @extend %center-between;
    img {
      width: 55px;
      height: 44px;
    }
  }
}
</style>
