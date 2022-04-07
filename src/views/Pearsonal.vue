<template>
  <div class="pearsonal">
    <div class="circle">
      <img :src="avatarUrl" class="avatar" />
    </div>
    <img src="../img/camera.png" class="camera" />
    <p class="name">{{ username }}</p>
    <p class="account">{{ account }}</p>
    <button class="control" @click="control">管理您的storage账号</button>

    <el-divider class="line"><i class="el-icon-s-platform"></i></el-divider>
    <button class="exit_account" @click="pop_account">退出账号</button>
    <p class="text">隐私权政策·服务条款</p>
  </div>
</template>
<script>
import bus from "../utils/bus";
export default {
  name: "Pearsonal",
  data() {
    return {
      username: "",
      account: "",
      email: "",
      avatarUrl: "",
      password: "",
    };
  },
  methods: {
    show() {
      let pearsonal = document.getElementsByClassName("pearsonal")[0];
      pearsonal.style.display = "block";
    },
    control() {
      //打开抽屉组件并调用个人部分函数
      bus.$emit("control", [
        this.avatarUrl,
        this.username,
        this.email,
        this.password,
      ]);
    },
    pop_account() {
      document.getElementsByClassName("pearsonal")[0].style.display = "none";
      bus.$emit("pop_account", "");
      //清除token
      let storage = window.localStorage;
      storage.clear();
    },
  },
  mounted() {
    bus.$off("showpearsonal"); //阻止事件被触发多次
    bus.$on("showpearsonal", this.show); //绑定
    bus.$off("loginmessage"); //阻止事件被触发多次
    bus.$on("loginmessage", (msg) => {
      this.username = msg.username;
      this.account = msg.account;
      this.email = msg.email;
      this.password = msg.password;
      if (msg.avatarUrl === undefined) {
        this.avatarUrl = require("../img/head.png");
      } else {
        this.avatarUrl = "https://www.netdisc.cloud/" + msg.avatarUrl;
      }
    }); //绑定
  },
};
</script>
<style scoped>
.pearsonal {
  position: absolute;
  height: 50%;
  width: 20%;
  right: 2%;
  top: 8%;
  background-color: #fff;
  border-radius: 10px;
  z-index: 99;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: none;
  transition: all 0.2s;
}
.circle {
  position: absolute;
  height: 70px;
  width: 70px;
  bottom: 75%;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 100%;
  overflow: hidden;
}
.avatar {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.name {
  position: absolute;
  font-weight: 700;
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
}
.account {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, 0);
}
.control {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, 0);
  height: 8%;
  width: 70%;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 20px;
  text-indent: 5px;
  cursor: pointer;
}
.control:hover {
  background-color: cornflowerblue;
  color: #fff;
}
.camera {
  position: absolute;
  bottom: 74%;
  height: 5%;
  left: 55%;
}
.line {
  position: absolute;
  bottom: 30%;
  width: 100%;
}
.exit_account {
  position: absolute;
  bottom: 18%;
  width: 50%;
  height: 8%;
  background-color: #fff;
  border: 1px solid #000;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  cursor: pointer;
}
.exit_account:hover {
  background-color: cadetblue;
  color: #fff;
}
.text {
  position: absolute;
  cursor: pointer;
  color: darkgray;
  font-size: 1px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>