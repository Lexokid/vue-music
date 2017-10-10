// https://binaryify.github.io/NeteaseCloudMusicApi/#/
const musicAPI = {
  install(Vue, options) {
    Vue.prototype.$music = {
      // 手机登录
      login(phone, password) {
        return Vue.axios.get('/login/cellphone', {
          params: {
            phone,
            password,
          },
        });
      },
      // 获取用户详情
      getUserDetail(uid, isTimestamp) {
        return Vue.axios.get('/user/detail', {
          params: {
            uid,
            timestamp: isTimestamp ? new Date().getTime() : null,
          },
        });
      },
      // 获取用户信息,歌单，收藏，mv, dj 数量
      getUserSubcount(uid, isTimestamp) {
        return Vue.axios.get('/user/subcount', {
          params: {
            uid,
            timestamp: isTimestamp ? new Date().getTime() : null,
          },
        });
      },
      // 获取用户歌单
      getUserPlaylist(uid, isTimestamp) {
        return Vue.axios.get('/user/playlist', {
          params: {
            uid,
            timestamp: isTimestamp ? new Date().getTime() : null,
          },
        });
      },
      // 获取歌单详情
      getPlaylistDetail(id, isTimestamp) {
        return Vue.axios.get('/playlist/detail', {
          params: {
            id,
            timestamp: isTimestamp ? new Date().getTime() : null,
          },
        });
      },
      // 获取音乐 url
      getMusicUrl(id) {
        return Vue.axios.get('/music/url', {
          params: {
            id,
          },
        });
      },
      // 获取歌词
      getMusicLrc(id) {
        return Vue.axios.get('/lyric', {
          params: {
            id,
          },
        });
      },
      // 签到
      dailySignin() {
        return Vue.axios.get('/daily_signin');
      },
      getPersonalized() {
        return Vue.axios.get('/personalized');
      },
    };
  },
};

export default musicAPI;
