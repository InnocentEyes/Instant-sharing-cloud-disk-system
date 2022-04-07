<template>
    <div class="expressionpackage" >
        
    </div>
</template>
<script>
import bus from "../utils/bus";
export default {
    name:"Expressionpackage",
    data(){
        return{
        }
    },
    methods:{
        showexpression(){
            let expressionpackage = document.getElementsByClassName("expressionpackage")[0];
            if(expressionpackage.style.display == "block"){
                expressionpackage.style.display = "none"
            }else{
                expressionpackage.style.display = "block"
            }
        }
    },
    mounted(){
        bus.$off("showexpression"); //阻止事件被触发多次
    bus.$on("showexpression", this.showexpression); //绑定
    }
}
</script>
<style scoped>
.expressionpackage{
    position: absolute;
    height: 40%;
    width: 50%;
    bottom: 24%;
    left: 2%;
    box-shadow: 0 0 20px -5px;
    background-color: #fafafa;
    z-index: 1;
    border-radius: 10px;
    display: none;
}
.expressionpackage::after{
    content: '';
    height: 0;
    width: 0;
    border-left: 10px solid transparent;
  border-top: 10px solid #fafafa;
  border-bottom: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: calc(-18px);
  left: 20%;
}
</style>