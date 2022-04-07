<template>
  <div class="loginpage">
    <div class="all">
      <img
        src="../img/closeloginpage.png"
        alt=""
        @click="close"
        class="close"
      />
      <img src="../img/heart.jpg" alt="" class="heart" />

      <div class="login">
        <h1>登录</h1>
        <input type="text" placeholder="手机号" class="name" />
        <input type="password" name="" placeholder="密码" class="password" />
        <button class="login_in" @click="login">登录</button>
        <a href="#" class="forget">忘记密码？</a>
        <a href="#" class="no_ccount">还没账号？</a>
        <button class="sign_in" @click="sign">立即注册</button>
      </div>
      <div class="sign">
        <img src="../img/down.png" alt="" class="down" @click="down" />
        <h1>注册</h1>
        <input type="text" placeholder="真实姓名" class="sign_name" />
        <input type="text" placeholder="昵称" class="sign_nickname" />
        <input type="text" placeholder="手机号" class="sign_phone" />
        <input type="text" placeholder="邮箱" class="sign_email" />
        <input type="password" placeholder="输入密码" class="sign_password" />
        <input type="text" placeholder="验证码" class="sign_verification" />
        <a href="#" class="require" @click="having">{{ text }}</a>
        <button class="sign_btn" @click="sign_btn">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus";
import { PostLoginAPI, GetPhoneAPI, PostRegisterAPI } from "../request/api.js";
export default {
  name: "Head",
  data() {
    return {
      text: "获取验证码",
      result: false,
      username: "",
    };
  },
  mounted() {
    bus.$off("login"); //阻止事件被触发多次
    bus.$on("login", this.show); //绑定
  },
  methods: {
    show() {
      let storagepage = document.getElementsByClassName("loginpage")[0];
      storagepage.style.visibility = "visible";
    },
    close() {
      let storagepage = document.getElementsByClassName("loginpage")[0];
      storagepage.style.visibility = "hidden";
      let sign = document.getElementsByClassName("sign")[0];
      sign.style.height = "0%";
      sign.style.visibility = "hidden";
      sign.style.transition = "0s";
    },
    login() {
      let name = document.getElementsByClassName("name")[0];
      let password = document.getElementsByClassName("password")[0];
      let reg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      let result = reg.test(name.value);
      //发送请求校验手机号码以及密码是否正确 正确弹窗登录成功！
      //输入正确，赋值给head.vue组件中的数据username，弹窗登录成功
      let that = this;

      PostLoginAPI({
        account: name.value,
        password: password.value,
      })
        .then(function (res) {
          console.log(res);
          if (res.data.code == 0) {
            //利用localstorage存储到本地
            localStorage.setItem("token", res.headers.token);
            //登录成功弹窗
            bus.$emit("loginsucess", "success");
            //改变head组件的username，表明登录成功
            bus.$emit("changeusername", res.data.data.nickname);

            //把用户的头像姓名账号发送给pearsonal组件
            bus.$emit("loginmessage", {
              username: res.data.data.nickname,
              account: res.data.data.account,
              email:res.data.data.email,
              avatarUrl: res.data.data.avatarUrl,
            });
            //获取用户的个人信息，发送给storage组件
            bus.$emit("pearsonalmessage", {
              username: res.data.data.nickname,
              account: res.data.data.account,
              email:res.data.data.email,
              avatarUrl: res.data.data.avatarUrl,
            });
            //把用户头像以及用户名发送给chart组件
            bus.$emit("chartmessage", {
              nickname: res.data.data.nickname,
              avatarUrl: res.data.data.avatarUrl,
            });
            //关闭登录界面
            that.close();
          } else {
            if (res.data.code == 500210) {
              that.$message({
                showClose: true,
                message: "登录密码不能为空！",
                type: "error",
              });
            } else if (res.data.code == 500211) {
              that.$message({
                showClose: true,
                message: "手机号不能为空！",
                type: "error",
              });
            } else if (res.data.code == 500212) {
              that.$message({
                showClose: true,
                message: "手机号已存在！",
                type: "error",
              });
            } else if (res.data.code == 500213) {
              that.$message({
                showClose: true,
                message: "密码错误！",
                type: "error",
              });
            } else if (res.data.code == 500214) {
              that.$message({
                showClose: true,
                message: "登录失败！",
                type: "error",
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    sign() {
      let sign = document.getElementsByClassName("sign")[0];
      sign.style.visibility = "visible";
      sign.style.height = "90%";
      sign.style.transition = "0.5s";
    },
    down() {
      let sign = document.getElementsByClassName("sign")[0];
      sign.style.height = "0%";
      sign.style.visibility = "hidden";
      sign.style.transition = "0s";
    },
    //点击注册
    sign_btn() {
      let sign_name = document.getElementsByClassName("sign_name")[0];
      let sign_nickname = document.getElementsByClassName("sign_nickname")[0];
      let sign_phone = document.getElementsByClassName("sign_phone")[0];
      let sign_email = document.getElementsByClassName("sign_email")[0];
      let sign_password = document.getElementsByClassName("sign_password")[0];
      let sign_verification =
        document.getElementsByClassName("sign_verification")[0];
      let that = this;
      PostRegisterAPI({
        nickname: sign_nickname.value,
        username: sign_name.value,
        account: sign_phone.value,
        email:sign_email.value,
        password: sign_password.value,
        code: sign_verification.value,
      }).then(function (res) {
        if (res.data.code == 0) {
          that.$message({
            showClose: true,
            message: "注册成功~",
            type: "success",
          });
          that.down();
        } else if (res.data.code == 500310) {
          that.$message({
            showClose: true,
            message: "注册失败",
            type: "error",
          });
        } else if (res.data.code == 500311) {
          that.$message({
            showClose: true,
            message: "用户信息缺失",
            type: "error",
          });
        } else if (res.data.code == 500312) {
          that.$message({
            showClose: true,
            message: "今天的验证次数已用完~",
            type: "error",
          });
        } else if (res.data.code == 500313) {
          that.$message({
            showClose: true,
            message: "验证码错误",
            type: "error",
          });
        }
      });
    },

    having() {
      if (this.text == "获取验证码") {
        let sign_phone = document.getElementsByClassName("sign_phone")[0];
        let reg =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        let result = reg.test(sign_phone.value);
        if (result) {
          sign_phone.classList.remove("red");
          GetPhoneAPI({
            account: sign_phone.value,
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (error) {
              console.log(error);
            });
          this.gettime();
        } else {
          //错误，手机号框为红色
          sign_phone.classList.add("red");
          //弹窗提示
          bus.$emit("phone_error", 1);
        }
      } else {
        return false;
      }
    },
    gettime() {
      this.text = 120;
      let timer = setInterval(() => {
        if (this.text == 0) {
          clearInterval(timer);
          this.text = "获取验证码";
        } else {
          this.text--;
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.loginpage {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99;
  visibility: hidden;
}

.all {
  position: absolute;
  height: 70%;
  width: 55%;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.all .close {
  position: absolute;
  cursor: pointer;
  height: 4%;
  top: 2%;
  right: 2%;
}
.heart {
  position: absolute;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.login,
.sign {
  position: absolute;
  height: 90%;
  width: 45%;
  bottom: 0;
  right: 0;
  border-bottom-right-radius: 10px;
}
.sign {
  height: 0%;
  background-color: #fff;
  visibility: hidden;
}
.name,
.password,
.sign_name,
.sign_nickname,
.sign_phone,
.sign_password,
.sign_verification,
.sign_email,
.require {
  position: absolute;
  height: 8%;
  width: 90%;
  text-align: center;
  border: 1px solid #e0e0e0;
}
.password {
  top: 30%;
}
.login_in,
.sign_in {
  position: absolute;
  height: 8%;
  width: 50%;
  left: 20%;
  background-color: cornflowerblue;
  color: #fff;
  top: 45%;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
}
.login_in:hover {
  background-color: darkblue;
}
.forget,
.no_ccount {
  position: absolute;
  top: 55%;
  text-decoration: none;
  font-size: smaller;
  color: dimgrey;
}
.no_ccount {
  top: 70%;
}
.sign_in {
  top: 80%;
  background-color: cadetblue;
}
.sign_in:hover {
  background-color: brown;
}
.down {
  position: absolute;
  height: 10%;
  cursor: pointer;
}
.sign_name {
  top: 25%;
}
.sign h1 {
  position: absolute;
  top: 10%;
}
.sign_nickname {
  top: 35%;
}
.sign_phone {
  top: 45%;
}
.sign_email{
  top: 55%;
}
.sign_password {
  top: 65%;
}
.sign_verification {
  top: 75%;
}

.sign_btn {
  position: absolute;
  width: 50%;
  left: 20%;
  top: 88%;
  height: 8%;
  background-color: cornflowerblue;
  color: #fff;
  border: 0;
  cursor: pointer;
  border-radius: 10px;
}
.sign_btn:hover {
  background-color: darkblue;
}
.require {
  top: 75%;
  text-decoration: none;
  color: black;
  right: 10%;
  width: auto;
  font-size: 10px;
  line-height: 4;
  border: 0;
  vertical-align: middle;
}
.require:hover {
  color: darkgrey;
}
.red {
  border: 1px solid red;
}
</style>