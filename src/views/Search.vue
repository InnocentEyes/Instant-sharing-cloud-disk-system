
<template>
<!-- 首页搜索组件 -->
  <div class="searchshow" @mousemove="show" @mouseleave="leave">
    <div class="top"></div>
    <div class="item" v-for="(i, index) in searchlist" :key="index + 1">
      <p>{{ i.name }}</p>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import bus from "../utils/bus";
import {GetSearchMessageAPI} from "../request/api"
export default {
  name: "Search",
  data() {
    return {
      searchlist: [],
    };
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  mounted() {
    bus.$off("searchid");
    bus.$on("searchid", this.search);
  },
  methods: {
    show() {
      let searchshow = document.getElementsByClassName("searchshow")[0];
      searchshow.style.display = "block";
    },
    leave() {
      let searchshow = document.getElementsByClassName("searchshow")[0];
      searchshow.style.display = "none";
    },
    
    search(value) {
      //发送search请求，并把数据渲染
      GetSearchMessageAPI({
        token:localStorage.getItem("token"),
        text:value
      }).then(function(res){
        console.log(res)
        //将搜索展示结果的名称数组存储给this.searchlist
      }).catch(function(err){
        console.log(err)
      })
    },
  },
};
</script>
<style scoped>
.searchshow {
  position: relative;
  height: auto;
  width: 30%;
  top: 8%;
  left: 55%;
  background-color: #fff;
  border-radius: 10px;
  z-index: 10;
  box-shadow: #000 0px 0px 10px;
  display: none;
}

.top,
.bottom {
  position: relative;
  height: 15px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
}
.bottom {
  bottom: 0;
}
.item {
  position: relative;
  height: 50px;
  width: 100%;
  cursor: pointer;
}
.item:hover {
  background-color: rgb(218, 218, 218);
}
.item p {
  margin: 0;
  position: absolute;
  width: 80%;
  top: 50%;
  left: 10%;
  transform: translate(0%, -50%);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>