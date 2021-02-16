<template>
  <div>
    <div class="pageHeader">
      <h3 class="brand">我爱你祖国ლ(′◉❥◉｀ლ)</h3>
      <div class="menu">
        <router-link class="menu-item" to="/">首页</router-link>
        <router-link class="menu-item" to="/about">基础</router-link>
        <!-- <router-link class="menu-item" to="{name : 'about'}">关于</router-link> -->
        <router-link class="menu-item" to="/posts">内容</router-link>
        <router-link class="menu-item" to="/vuex">Vuex</router-link>
        <router-link class="menu-item" to="/react">反映系统</router-link>
        <router-link class="menu-item" to="/axios">axios</router-link>
        <router-link class="menu-item" to="/auth">用户auth</router-link>
      </div>
    </div>
    <div class="pageBody"><router-view></router-view></div>
  </div>
</template>

<script>
export default {
  created() {
    const user = {
      name: 'lalala,sun of beach',
    };
    const handler = {
      get() {
        return 'hahaha';
      },
    };

    const userProxy = new Proxy(user, handler);

    console.log(userProxy.name);
  },
};
</script>

<style>
@import './styles/app.css';
@import './styles/animate.css';
</style>
