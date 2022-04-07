<template>
  <div class="first" @mousemove="hide">
    <el-carousel :interval="5000" height="850px" arrow="always">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <img :src="item.url" class="v_img">
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "First",
  data() {
    return {
      list: [{url:require('../img/chart.jpg')}, {url:require('../img/storageimg.jpg')}],
    }
  },
    methods:{
      hide(){
        let pearsonal = document.getElementsByClassName("pearsonal")[0];
        pearsonal.style.display = "none";
      }
    }
};
</script>

<style scoped>
.first {
  position: absolute;
  height: 90%;
  width: 98%;
  left: 1%;
  top: 9%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.v_img{
  position: absolute;
  height: 100%;
}
</style>