# vue-music

![](https://img.shields.io/badge/vue-2.4.2-brightgreen.svg) ![](https://img.shields.io/badge/vue--router-2.7.0-green.svg) ![](https://img.shields.io/badge/vuex-2.4.0-yellowgreen.svg) ![](https://img.shields.io/badge/axios-0.16.2-yellow.svg) ![](https://img.shields.io/badge/vue--axios-2.0.2-orange.svg)

## 简介

本项目是一个从零开始学习vue的练手项目，用了vue全家桶（vue+vue-router+vuex）

想在学习vue时配合实践，做的是一个仿照网易云音乐（andriod）app的spa，用了[网易云音乐的api](https://github.com/Binaryify/NeteaseCloudMusicApi)，可以进行登录（只能用手机号进行登录），可以播放歌单里的歌等，只完成了播放器最基本的功能

虽然做的不多但我从之中学到了许多的知识，除了对vue的基本用法和概念，还有html5的\<audio\>标签的使用和localStorage的使用和跨域的知识，对spa也有了基本的认识

由于本人也是一个前端小白，对vue也是第一次接触，所以本项目也有许多不足之处，还需要进行多多进行学习和改进，希望看到不足之处的各位能提出宝贵的意见，让我们共同学习和进步

## 使用

代码在src文件夹下，dist是编译好的文件，直接放到静态服务器里

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```
还需配合[网易云音乐的api](https://github.com/Binaryify/NeteaseCloudMusicApi)来使用

## 在线预览

建议用手机的chrome浏览器进行预览（未做浏览器之间的兼容）
由于云主机的带宽小，所有加载会比较慢
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/liantu.png)

[http://123.207.98.119](http://123.207.98.119)

## 界面预览

### 登录
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/login.gif)

### 歌单
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/playlist.gif)

### 播放
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/play.gif)

### 改变进度
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/select.gif)

### 切换歌曲
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/change.gif)

### 中、英歌词
![](https://raw.githubusercontent.com/Lexokid/vue-music/master/gif/lyric.gif)

## ToDoList

- [x] 登录
- [ ] 签到（本来已实现后来登录的字段改了）
- [x] 获取歌单
- [ ] 创建歌单
- [ ] 删除歌单
- [x] 播放音乐
- [ ] 收藏音乐
- [ ] 下载音乐
- [ ] 搜索音乐
- [x] 歌词
- [ ] 评论
- [ ] 播放记录
- [ ] mv
- [ ] 电台
- [ ] 私人FM
- [ ] 排行榜
