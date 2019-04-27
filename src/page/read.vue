<template>
  <div class="read-container">
      <!-- <h1>这里是文章详情页</h1> -->
    <h1>{{datalist.title||'正在加载文章...'}}</h1>
    <div class="datalist-content" v-html="datalist.content" v-show="datalist.content"></div>

      <ul class="replies">
        <li
          class="replies-item"
          v-for="(item,index) in datalist.replies"
          :key="index"
          v-html="item.content"
        ></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "read",
  data() {
    return {
      datalist: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {

      const that = this;

      this.$axios
        .get(API.Open.topic + that.$route.params.id, {
          params: {}
        })
        .then(function(response) {
          if (response.data.success == true) {
            that.datalist = response.data.data;
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.read-container {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
}

.datalist-content {
  padding: 20px;
  width: 100%;
  background: #e6e6e6;
  box-sizing: border-box;
}

.markdown-text {
  width: 100%;
  word-wrap: break-word;
}

.prettyprint {
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: scroll;
}

.markdown-text p {
  word-wrap: break-word;
}

.markdown-text img {
  max-width: 100%;
}

.replies-item {
  margin-bottom: 20px;
  padding: 20px;
  color: #ffffff;
  background: rgb(5, 5, 5);
  box-sizing: border-box;
}
</style>


