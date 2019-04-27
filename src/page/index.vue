<template>
  <div class="index">
    <h1>{{datalist.length>1?'文章列表页':'获取数据中...'}}</h1>
    <ul class="index-content" v-show="datalist.length>0">
      <li v-for="(item,index) in datalist" :key="index">
        <p>{{index}}、{{item.title}}</p>
        <router-link :to="'/read/'+item.id">阅读</router-link>
      </li>
    </ul>
    <loadmore
      :state="lm.state"
      :throttle="lm.throttle"
      :pretrigger="5"
      @onGetdata="triggerBottom"
      @onBottom="triggerBottom"
      @onRest="handelRest"
      v-show="count>limit && datalist.length>1"
    ></loadmore>
  </div>
</template>

<script>
// 加载更多
import loadmore from "@/components/common/loadmore";

export default {
  name: "index",
  data() {
    return {
      datalist: [],
      count: 999999999,
      page: 1,
      limit: 2,
      lm: {
        state: 0,
        throttle: false
      }
    };
  },
  components: {
    loadmore
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      const that = this;

      this.lm.throttle = true;
      this.lm.state = 1;

      this.$axios
        .get(API.Open.topics, {
          params: {
            page: that.page,
            limit: that.limit
          }
        })
        .then(function(response) {
          if (response.data.success == true) {
            that.datalist = that.datalist.concat(response.data.data);
            that.page++;
            that.lm.state = that.datalist.length >= that.count ? 2 : 0;
            that.lm.throttle = false;
          }
        })
        .catch(function(error) {
          that.lm.throttle = false;
          that.lm.state = that.datalist.length >= that.count ? 2 : 3;
        });
    },
    triggerBottom: function() {
      // 触发底部 做什么...
      if (this.datalist.length < this.count && this.lm.throttle === false) {
        this.getData();
      }
    },
    handelRest: function() {
      // 点击重试 做什么...
      this.triggerBottom();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  margin-bottom: 40px;
}

.index h1 {
  text-align: center;
}

.index-content {
  margin: 0 auto;
  padding: 20px 50px;
  max-width: 800px;
  box-sizing: border-box;
}

.index-content li {
  margin-bottom: 20px;
  padding: 100px 20px;
  width: 100%;
  text-align: left;
  background: rgb(233, 233, 233);
  box-sizing: border-box;
  cursor: pointer;
}
</style>


