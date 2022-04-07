<template>
  <div class="head" @mousemove="hide">
    <img src="../img/logo.png" alt="" class="logo" />
    <p @mousemove="move" @mouseleave="leave">contact us</p>

    <ul>
      <li><a href="#" @click="active">Storage</a></li>
      <li><a href="#" @click="chart">Chart</a></li>
    </ul>

    <div class="searchdiv" @mousemove="movein" @mouseleave="moveout" @keydown="movein">
      <input type="text" id="searchid" ref="search" placeholder="文件名">
      <p class="close_p" @click="clear">×</p>
      <img src="../img/search.png" alt="" class="search" id="search" title="搜索"/>
    </div>
    <!-- 如果请求数据登录，这里显示用户名，否则点击登录 -->
    <div v-if="username == ''" class="login" @click="loginpage">Login</div>
    <div v-else class="user" @mousemove.stop="showpearsonal">
      {{ username }}
    </div>
  </div>
</template>

<script>
import bus from "../utils/bus";
export default {
  name: "Head",
  data() {
    return {
      storage_eject: "block",
      username: "",
    };
  },
  methods: {
    active() {
      //判断username是否为空，是则弹窗提示，先登录
      if (this.username == "") {
        bus.$emit("loginshowmessage", true);
      } else {
        //username不为空，则允许弹出
        bus.$emit("event", this.storage_eject);
      }
    },
    chart() {
      if (this.username == "") {
        bus.$emit("loginshowmessage", true);
      } else {
        bus.$emit("chart", 1);
      }
    },
    loginpage() {
      bus.$emit("login", 1);
    },
    showpearsonal() {
      bus.$emit("showpearsonal", 1);
    },
    movein() {
      let searchdiv = document.getElementsByClassName("searchdiv")[0];
      let searchshow = document.getElementsByClassName("searchshow")[0];
      searchdiv.classList.add("movein");
      searchdiv.classList.remove("moveout");
      searchshow.style.display = "block"
    },
    moveout() {
      let searchdiv = document.getElementsByClassName("searchdiv")[0];
      let searchshow = document.getElementsByClassName("searchshow")[0];
      searchdiv.classList.remove("movein");
      searchdiv.classList.add("moveout");
      searchshow.style.display = "none"
    },
    hide() {
      let pearsonal = document.getElementsByClassName("pearsonal")[0];
      pearsonal.style.display = "none";
    },
    move() {
      let contact = document.getElementsByClassName("contact")[0];
      contact.style.display = "block";
    },
    leave() {
      let contact = document.getElementsByClassName("contact")[0];
      contact.style.display = "none";
    },
    search(){
      let searchid = document.getElementById("searchid");
        bus.$emit("searchid",searchid.value)
    },
    //防抖
    debounce(fn,timer){
      var t = null;
      return function(){
        var firstclick = !t;
        if(t){
          clearTimeout(t);
        }
        if(firstclick){
          fn.apply(this,arguments);
        }
        t = setTimeout(()=>{
          t = null;
        },timer);
      }
    },
    clear(){
        this.$refs.search.value = ''
    },
    
  },
  mounted() {
    bus.$off("changeusername"); //阻止事件被触发多次
    bus.$on("changeusername", (msg) => {
      this.username = msg;
    }); //绑定
    bus.$off("pop_account");
    bus.$on("pop_account",(msg) =>{
      this.$message({
        showClose: true,
        message: "退出成功~",
        type: "success",
      });
      this.username = msg
      console.log(this.username)
    })
    document.getElementById("search").addEventListener("click",this.debounce(this.search,2000))
  },
  destroyed(){
    document.getElementById("search").removeEventListener("click",this.debounce(this.search,2000))
  }
};
</script>

<!-- 在style标签上添加scoped属性，以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的 -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.head {
  position: absolute;
  height: 8%;
  width: 100%;
  background-color: #ffff;
  color: #000;
  border-bottom: 1px solid #f6f5ec;
}
.logo {
  position: absolute;
  height: 80%;
  width: auto;
  top: 10%;
  left: 2%;
}
.searchdiv {
  position: absolute;
  bottom: 0;
  left: 80%;
  width: 5%;
  height: 70%;
  border-radius: 20rem;
  transform: all 1s;
  border: 2px solid dimgrey;
}
.searchdiv:hover input{
  width: 82%;
}
.movein {
  border: 2px solid dimgrey;
  animation: movein 1s infinite;
  -webkit-animation: movein 1s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
  opacity: 0.5;
  transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;
}
@keyframes movein {
  from {
    left: 80%;
    width: 5%;
  }
  to {
    left: 55%;
    width: 30%;
  }
}

@-webkit-keyframes movein /*Safari and Chrome*/ {
  from {
    left: 80%;
    width: 5%;
  }
  to {
    left: 55%;
    width: 30%;
  }
}
.moveout {
  border: 2px solid dimgrey;
  animation: moveout 1s infinite;
  -webkit-animation: moveout 1s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
}
@keyframes moveout {
  from {
    left: 55%;
    width: 30%;
  }
  to {
    left: 80%;
    width: 5%;
  }
}

@-webkit-keyframes moveout /*Safari and Chrome*/ {
  from {
    left: 55%;
    width: 30%;
  }
  to {
    left: 80%;
    width: 5%;
  }
}

.searchdiv input {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0;
  border-radius: 20rem;
  outline: none;
  text-align: center;
}
.searchdiv:hover input{
  width: 82%;
}

.search {
  position: absolute;
  height: 80%;
  top: 10%;
  right: 5%;
  width: auto;
  cursor: pointer;
}
p {
  position: absolute;
  height: auto;
  width: 10%;
  margin: 0;
  left: 8%;
  font-size: larger;
  text-transform: uppercase;
  text-align: center;
  vertical-align: text-bottom;
  top: 30%;
  cursor: pointer;
}
ul {
  position: absolute;
  left: 30%;
  height: 90%;
  width: 40%;
  top: 0;
}
li {
  position: relative;
  height: 100%;
  width: 25%;
  display: inline-block;
  text-align: center;
}
li:hover {
  border-bottom: 2px solid #46a3ff;
}

a {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 40%;
  font-size: large;
  text-decoration: none;
  text-align: center;
  color: #000;
}
.login,
.user {
  position: absolute;
  right: 2%;
  height: 55px;
  width: 5%;
  top: 20%;
  background-color: #ffff;
  border-radius: 5rem;
  color: #000;
  line-height: 55px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.close_p{
  position: absolute;
  margin: 0;
  top: 50%;
  left: 84%;
  transform: translate(-50%,-50%);
  font-size: x-large;
  display: none;
}
.searchdiv:hover .close_p{
  display: block;
}
</style>
