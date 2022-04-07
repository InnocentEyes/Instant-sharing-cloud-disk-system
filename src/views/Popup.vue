<template>
  <div class="popup"></div>
</template>
<script>
import bus from '../utils/bus'
export default {
  name: "Popup",
  data() {
    return {
      
    };
  },
  methods: {
      //页面是否登录提示信息
    loginshowmessage() {
        this.tologin()
    },
    loginsucess(){
        this.tosucesslogin()
    },
    loginerror(){
        this.toerrorlogin()
    },
    open1() {
      this.$message({
        showClose: true,
        message: "这是一条消息提示",
      });
    },

    tosucesslogin() {
      this.$message({
        showClose: true,
        message: "登录成功~",
        type: "success",
        offset:70
      });
    },

    tologin() {
      this.$message({
        showClose: true,
        message: "请先登录账号！",
        type: "warning",
         center: true,
         offset:70
      });
    },

   toerrorlogin(){
      this.$message({
        showClose: true,
        message: "输入错误，请重新输入！",
        type: "error",
      });
    },
    phone_error(){
      this.$message({
        showClose: true,
        message: "手机号错误，请重新输入！",
        type: "error",
      });
    }
  },
  mounted() {
    bus.$off("loginshowmessage"); //阻止事件被触发多次
    bus.$on("loginshowmessage", this.loginshowmessage); //绑定
    bus.$off("loginsucess"); //阻止事件被触发多次
    bus.$on("loginsucess", this.loginsucess); //绑定
    bus.$off("loginerror"); //阻止事件被触发多次
    bus.$on("loginerror", this.loginerror); //绑定
    bus.$off("phone_error"); //阻止事件被触发多次
    bus.$on("phone_error", this.phone_error); //绑定
  },

};
</script>

<style scoped>
.popup {
  position: relative;
}
</style>