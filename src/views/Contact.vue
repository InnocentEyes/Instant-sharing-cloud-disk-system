<template>
  <div class="contact">
      <img src="../img/Wechartcode1.png" alt="">
      <img src="../img/Wechartcode2.jpg" alt="">
  </div>
</template>
<script>
export default {
  name: "Contact",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.contact {
  position: absolute;
  height: 20%;
  width: 20%;
  background-color: #fff;
  z-index: 10;
  top: 8%;
  left: 1%;
  border: 2px solid #000;
  border-radius: 30px;
  display: none;
}
.contact::before {
  content: "";
  width: 0;
  height: 0;
  border: 20px solid;
  position: absolute;
  top: -40px;
  left: 50%;
  border-color: transparent  transparent #000 ;
}
.contact::after{
content: "";
  width: 0;
  height: 0;
  border: 20px solid;
  position: absolute;
  top: -36px;
  left: 50%;
  border-color: transparent  transparent #fff ;
}
.contact img{
    position: absolute;
 width: 40%;
 top: 50%;
 transform: translate(0%,-50%);
}
.contact img:nth-child(1){
    left: 5%;
}
.contact img:nth-child(2){
    right: 5%;
}
</style>