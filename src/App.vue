<template>
  <div id="app">
    <p>登录状态：{{getStats===true?'你好，xxx':'未登录'}}</p>
    <p @click="handeLoginin">点击登录</p>
    <p @click="handeLoginout">退出登录</p>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import ProductListOne from "./components/ProductListOne.vue";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    "product-list-one": ProductListOne
  },
  computed: {
    getStats: function() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    handeLoginin: function() {
      this.$store.commit("login_in", true);
    },
    handeLoginout: function() {
      this.$store.commit("login_out", false);
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/iconfont.css";
@import "./assets/css/index.scss";
@import "./assets/css/common/_base.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
