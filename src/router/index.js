import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import myMusic from '../components/MyMusic/MyMusic';
import loginPage from '../components/LoginPage/LoginPage';
import playlistPage from '../components/PlaylistPage/PlaylistPage';

Vue.use(Router);

const error = {
  template: '<div>error</div>',
};
const CloudMusic = {
  template: `
  <div>\
    <h2>CloudMusic</h2>\
    <router-view></router-view>\
  </div>`,
};
const a = {
  template: '<div>a</div>',
};
const b = {
  template: '<div>b</div>',
};
const c = {
  template: '<div>c</div>',
};

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    name: 'App',
    redirect: '/MyMusic',
  },
  {
    path: '/MyMusic',
    name: 'MyMusic',
    component: myMusic,
  },
  {
    path: '/CloudMusic',
    component: CloudMusic,
    children: [{
      path: '/',
      component: a,
      alias: 'a',
    },
    {
      path: 'b',
      component: b,
    },
    {
      path: 'c',
      component: c,
    },
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    components: {
      fullPage: loginPage,
    },
  },
  {
    path: '/Playlist',
    name: 'PlaylistPage',
    components: {
      fullPage: playlistPage,
    },
  },
  {
    path: '*',
    component: error,
  },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
