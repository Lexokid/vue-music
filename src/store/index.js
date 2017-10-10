import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    currentPage: 'MyMusic',
    // 是否打开侧滑菜单
    isShowMenu: false,
    // 是否在播放
    isPlay: false,
    // 是否打开音乐页
    isShowMusic: false,
    // 用户id
    userId: 0,
    // 用户详细信息
    userDetail: {},
    // 歌单
    playlist: [],
    // 播放音乐的url
    musicUrl: {},
    // 待播放队列位置
    musicNumber: 0,
    // 待播放队列
    musicQueue: [],
    // 当前播放时间
    musicTime: 0,
    // 音乐时长
    musicDuration: 0,
    // 选择的时间
    selectTime: 0,
    // 歌词
    lrc: {},
  },
  getters: {
    currentMusic: state => state.musicQueue[state.musicNumber],
    precentage: state => (state.musicTime / state.musicDuration) * 100,
  },
  mutations: {
    changPage(state, payload) {
      state.currentPage = payload.nextPage;
    },
    toggleMenu(state) {
      state.isShowMenu = !state.isShowMenu;
    },
    playMusic(state) {
      state.isPlay = true;
    },
    pauseMusic(state) {
      state.isPlay = false;
    },
    openMusicPage(state) {
      state.isShowMusic = true;
    },
    closeMusicPage(state) {
      state.isShowMusic = false;
    },
    togglePlay(state) {
      state.isPlay = !state.isPlay;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUserDetail(state, userDetail) {
      state.userDetail = userDetail;
    },
    setPlaylist(state, playlist) {
      state.playlist = playlist;
    },
    setMusicUrl(state, musicUrl) {
      state.musicUrl = musicUrl;
    },
    setMusicNumber(state, musicNumber) {
      state.musicNumber = musicNumber;
    },
    incrementMusicNumber(state) {
      state.musicNumber += 1;
    },
    decreaseMusicNumber(state) {
      state.musicNumber -= 1;
    },
    setMusicQueue(state, musicQueue) {
      state.musicQueue = musicQueue;
    },
    updateMusicTime(state, musicTime) {
      state.musicTime = musicTime;
    },
    setMusicDuration(state, musicDuration) {
      state.musicDuration = musicDuration;
    },
    updateSelectTime(state, selectTime) {
      state.selectTime = selectTime;
    },
    updateLrc(state, lrc) {
      state.lrc = lrc;
    },
  },
  actions: {
    // 更新、获取用户信息
    async updateUserDetail({
      commit,
      state,
    }, {
      that,
      isTimestamp = false,
    }) {
      const res = await that.$music.getUserDetail(state.userId, isTimestamp);
      commit('setUserDetail', res.data);
    },
    // 更新、获取用户歌单
    async updatePlaylist({
      commit,
      state,
    }, {
      that,
      isTimestamp = false,
    }) {
      const res = await that.$music.getUserPlaylist(state.userId, isTimestamp);
      commit('setPlaylist', res.data.playlist);
    },
    // 获取音乐地址、及歌词
    async updateMusicUrl({
      commit,
      dispatch,
    }, {
      that,
      musicId,
    }) {
      const res = await that.$music.getMusicUrl(musicId);
      commit('setMusicUrl', res.data.data[0]);
      if (res.data.data[0].url === null) {
        dispatch({
          type: 'nextMusic',
          that,
        });
        return;
      }
      const lrc = await that.$music.getMusicLrc(musicId);
      commit('updateLrc', lrc.data);
    },
    // 下一首音乐
    async nextMusic({
      dispatch,
      commit,
      getters,
      state,
    }, {
      that,
    }) {
      commit('pauseMusic');
      commit('incrementMusicNumber');
      localStorage.setItem('musicNumber', state.musicNumber);
      await dispatch({
        type: 'updateMusicUrl',
        that,
        musicId: getters.currentMusic.id,
      });
      if (state.musicUrl.url) {
        commit('playMusic');
      }
    },
    // 上一首音乐
    async preMusic({
      dispatch,
      commit,
      getters,
      state,
    }, {
      that,
    }) {
      commit('pauseMusic');
      commit('decreaseMusicNumber');
      localStorage.setItem('musicNumber', state.musicNumber);
      dispatch({
        type: 'updateMusicUrl',
        that,
        musicId: getters.currentMusic.id,
      });
      commit('playMusic');
    },
  },
  strict: debug,
});
