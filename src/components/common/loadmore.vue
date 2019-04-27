<template>
  <div class="loadmore">
    <div class="load-more" :class="showload==true?'load-more-show':''">
      <div v-show="state===0">
        <span class="load-more-span" @click="handelGetdata">获取更多数据</span>
      </div>
      <div v-show="state===1">
        <span class="iconfont icon-jiazaizhong load-more-span loadding-animate"></span>
        <span class="load-more-span">加载中...</span>
      </div>
      <div v-show="state===2">
        <span class="load-more-span">没有更多了</span>
      </div>
      <div v-show="state===3" @click="handelRest">
        <span
          class="iconfont icon-shuaxin load-more-span"
          :class="throttle==true?'loadding-animate':''"
        ></span>
        <span class="load-more-span">加载失败，点击重试</span>
      </div>
    </div>
  </div>
</template>

<script>
// state 当前状态
// pretrigger 预触发高度/px 必须大于0
// throttle 节流 防止重复请求
export default {
  name: "loadmore",
  props: ["state", "pretrigger", "throttle"],
  data() {
    return {
      showload: true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll);
  },
  methods: {
    windowScroll: function() {
      // 滚动高度
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 屏幕高度
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 网页高度
      const htmlHeight = document.body.scrollHeight;

      if (htmlHeight < viewHeight) {
        // 网页高度必须大于视窗高度
        return;
      }

      let pretrigger = this.pretrigger || 0;

      if (scrollTop + viewHeight + pretrigger >= htmlHeight) {
        // 触底
        this.$emit("onBottom");
      }
    },
    handelGetdata: function() {
      // 点击获取数据
      this.$emit("onGetdata");
    },
    handelRest: function() {
      // 点击重试
      this.$emit("onRest");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  background: rgb(17, 100, 0);
}

.item p {
  color: #ffffff;
  font-size: 2em;
}

.load-more {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  opacity: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.load-more p {
  color: #ffffff;
  font-size: 1em;
}

.load-more-show {
  opacity: 1;
}

.load-more-span {
  font-size: 14px;
  color: #0c0c0c;
  cursor: pointer;
}

@-webkit-keyframes loadmoreanimate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loadmoreanimate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.loadding-animate {
  display: inline-block;
  -webkit-animation: loadmoreanimate 1s linear infinite;
  animation: loadmoreanimate 1s linear infinite;
}
</style>