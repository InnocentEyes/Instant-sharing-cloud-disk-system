<template>
<div class="back">
    <div class="dot" id="dot" @click="backtop">
        <img src="../img/turnTop.png" alt="" class="turntop" id="turntop">
    </div>
    <div class="prompt" id="prompt">Top!</div>
</div>
    
</template>

<script>
export default {
  name: 'Dot',
  
  methods:{
    //监听屏幕滚动，滚动大于一定时，出现按钮
    scroll(){
        let dot = document.getElementById('dot');
        if(document.documentElement.scrollTop > 200 ){
                dot.style.opacity = '1'
                dot.style.transition = 'all 0.5s'
            }else{
                dot.style.opacity = '0'
                dot.style.transition = 'all 0.5s'
            }
    },
    backtop () {
      window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
        });
    },
  },
  mounted() {
      window.addEventListener("scroll",this.scroll); 
},
 destroyed() {
      document.removeEventListener('scroll', this.scroll)
    }
}
</script>

<style scoped>
    .prompt{
        position: fixed;
        width: 50px;
        background-color: #46A3FF;
        color: #fff;
        bottom: 12%;
        right: 1%;
        text-align: center;
        border-radius: 2rem;
        font-size: large;
        visibility: hidden;
    }
    .dot{
        position: fixed;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        box-shadow:	#BEBEBE 0px 0px 20px;
        bottom: 5%;
        right: 1%;
        z-index: 100;
        background-color: #fff;
        cursor: pointer;
        opacity: 0;
    }
    .turntop{
        position: absolute;
        height: 25px;
        width: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    
    
    .dot:hover{
        background-color: #E0E0E0;
    }
    .dot:hover +.prompt{
        visibility: visible;
    }
</style>