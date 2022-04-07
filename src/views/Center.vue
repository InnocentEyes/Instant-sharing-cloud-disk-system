<template>
  <div class="center">
    <!-- 网盘 -->
    <h1 class="storage_title">文件<strong>·分享</strong></h1>
    <p class="storage_text">即时存储，专业安全的在线云存储服务</p>
    <p class="storage_text">
      存储访问、备份共享、大容量、统一更新、团队合作、多端同步、协作编辑
    </p>
    <div class="storage">
      <div class="storage_left">
        <div class="textshow_area">
          <div v-show="show == 1">
            <h1>个人使用</h1>
            <p class="save_p">←  保存</p>
            <img src="../img/filesave.png" alt="" class="save">
            <p class="delete_p">删除  →</p>
            <img src="../img/filedelete.png" alt="" class="delete">
          </div>
          <div v-show="show == 2">
            <h1>好友分享</h1>
            <p class="data_p">←  数据</p>
            <img src="../img/data.png" alt="" class="datashare">
            <p class="datashare_p">共享  →</p>
            <img src="../img/datashare.png" alt="" class="friendshare" />
          </div>
          <div v-show="show == 3">
            <h1>好友通信</h1>
            <img src="../img/getfriend.png" alt="" class="getfriend">
          </div>
        </div>
        <ul>
          <li class="lislide" @mouseover="slide(1)">个人使用</li>
          <li class="lislide" @mouseover="slide(2)">好友分享</li>
          <li class="lislide" @mouseover="slide(3)">好友通信</li>
          <div class="nativion"></div>
        </ul>
      </div>
      <div class="storage_right">
        <img src="../img/storage.png" class="storage_right_img" />
      </div>
    </div>
    <div class="storage_small" style="background-color: burlywood">
      <img src="../img/img.png" alt="" />
      <p>图片</p>
    </div>
    <div class="storage_small" style="background-color: cadetblue">
      <img src="../img/video.png" alt="" />
      <p>视频</p>
    </div>
    <div class="storage_small" style="background-color: chocolate">
      <img src="../img/file.png" alt="" />
      <p>文档</p>
    </div>
    <div class="storage_small" style="background-color: cornflowerblue">
      <img src="../img/music.png" alt="" />
      <p>音乐</p>
    </div>

    <!-- 邮箱 -->
    <h1 class="mail_title">即时<strong>·通信</strong></h1>
    <p class="mail_text">安全高效实用的办公小助手</p>
    <p class="mail_text">高效办公、实时跟进、方便快捷、数据加密、检测恢复</p>
    <div class="mail">
      <div class="mail_left">
        <img src="../img/mail_top.png" class="mail_top" />
        <img src="../img/mail_bottom.png" class="mail_bottom" />
      </div>
      <div class="mail_right_hight" style="background-color: #87cefa">
        <p class="messaging">即时通信</p>
        <ul class="messaging_ul">
          <li @mouseover="shown(0)" @mouseout="hide(0)" class="messaging_li">
            <p>安全高效</p>
            <div class="el-icon-success"></div>
          </li>
          <li @mouseover="shown(1)" @mouseout="hide(1)" class="messaging_li">
            <p>实用办公</p>
            <div class="el-icon-success"></div>
          </li>
          <li @mouseover="shown(2)" @mouseout="hide(2)" class="messaging_li">
            <p>实时跟进</p>
            <div class="el-icon-success"></div>
          </li>
          <li @mouseover="shown(3)" @mouseout="hide(3)" class="messaging_li">
            <p>方便快捷</p>
            <div class="el-icon-success"></div>
          </li>
          <li @mouseover="shown(4)" @mouseout="hide(4)" class="messaging_li">
            <p>检测恢复</p>
            <div class="el-icon-success"></div>
          </li>
        </ul>
      </div>
      <div class="mail_right_down" style="background-color: #94d6da">
        <p class="messaging">Instant messaging</p>
        <ul class="messaging_ul">
          <li @mouseover="shown(0)" @mouseout="hide(0)" class="messaging_li">
            <p>安全高效</p>
            <div class="el-icon-circle-check"></div>
          </li>
          <li @mouseover="shown(1)" @mouseout="hide(1)" class="messaging_li">
            <p>实用办公</p>
            <div class="el-icon-circle-check"></div>
          </li>
          <li @mouseover="shown(2)" @mouseout="hide(2)" class="messaging_li">
            <p>实时跟进</p>
            <div class="el-icon-circle-check"></div>
          </li>
          <li @mouseover="shown(3)" @mouseout="hide(3)" class="messaging_li">
            <p>方便快捷</p>
            <div class="el-icon-circle-check"></div>
          </li>
          <li @mouseover="shown(4)" @mouseout="hide(4)" class="messaging_li">
            <p>检测恢复</p>
            <div class="el-icon-circle-check"></div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 快速使用 -->
    <button class="use" @click="use">
      快速使用
      <p>→</p>
    </button>
    <div class="detail">
      <div class="detail_center">
        <p>关于</p>
        <a href="javascript:void(0)">关于我们</a>
        <a href="javascript:void(0)">加入我们</a>
      </div>
      <div class="detail_center">
        <p>服务</p>
        <a href="javascript:void(0)">帮助中心</a>
        <a href="javascript:void(0)">最新功能</a>
        <a href="javascript:void(0)">服务条款</a>
      </div>
      <div class="detail_center">
        <p>功能</p>
        <a href="javascript:void(0)">存储功能</a>
        <a href="javascript:void(0)">通信功能</a>
      </div>
      <div class="detail_center">
        <p>联系我们</p>
        <a href="javascript:void(0)">751783315@qq.com</a>
      </div>
      <a href="https://beian.miit.gov.cn" target="_blank" class="beian"
        >·粤ICP备2022020569号·</a
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Center",
  data() {
    return {
      currentScroll: "",
      show: "1",
    };
  },
  methods: {
    handleScroll() {
      //计算当前滚轮的位置
      this.currentScroll = window.pageYOffset; //表示当前滚动的位置
      //计算组件距离顶部的位置
      let text1 = document.getElementsByClassName("storage_title")[0];
      let text2 = document.getElementsByClassName("storage_text")[0];
      let text3 = document.getElementsByClassName("storage_text")[1];
      let text4 = document.getElementsByClassName("storage")[0];
      let text5 = document.getElementsByClassName("storage_small")[0];
      let text6 = document.getElementsByClassName("storage_small")[1];
      let text7 = document.getElementsByClassName("storage_small")[2];
      let text8 = document.getElementsByClassName("storage_small")[3];
      let text9 = document.getElementsByClassName("mail_title")[0];
      let text10 = document.getElementsByClassName("mail_text")[0];
      let text11 = document.getElementsByClassName("mail_text")[1];
      let text12 = document.getElementsByClassName("mail")[0];
      let text13 = document.getElementsByClassName("use")[0];
      let text14 = document.getElementsByClassName("detail")[0];
      let text15 = document.getElementsByClassName("mail_top")[0];
      let text16 = document.getElementsByClassName("mail_bottom")[0];
      let text17 = document.getElementsByClassName("storage_right_img")[0];
      let text18 = document.getElementsByClassName("messaging")[0];
      let text19 = document.getElementsByClassName("messaging")[1];
      if (this.currentScroll >= text1.offsetTop + 100) {
        text1.classList.add("active");
      }
      if (this.currentScroll >= text2.offsetTop + 100) {
        text2.classList.add("active");
      }
      if (this.currentScroll >= text3.offsetTop + 100) {
        text3.classList.add("active");
      }
      if (this.currentScroll >= text4.offsetTop + 100) {
        text4.classList.add("active");
        text17.classList.add("level");
      }
      if (this.currentScroll >= text5.offsetTop + 100) {
        text1.classList.add("active");
      }
      if (this.currentScroll >= text1.offsetTop + 100) {
        text5.classList.add("active");
      }
      if (this.currentScroll >= text6.offsetTop + 100) {
        text6.classList.add("active");
      }
      if (this.currentScroll >= text7.offsetTop + 100) {
        text7.classList.add("active");
      }
      if (this.currentScroll >= text8.offsetTop + 100) {
        text8.classList.add("active");
      }
      if (this.currentScroll >= text9.offsetTop + 100) {
        text9.classList.add("active");
      }
      if (this.currentScroll >= text10.offsetTop + 100) {
        text10.classList.add("active");
      }
      if (this.currentScroll >= text11.offsetTop + 100) {
        text11.classList.add("active");
      }
      if (this.currentScroll >= text12.offsetTop + 100) {
        text12.classList.add("active");
        text15.classList.add("level");
        text16.classList.add("level");
        text18.classList.add("level");
        text19.classList.add("level");
      }
      if (this.currentScroll >= text13.offsetTop + 100) {
        text13.classList.add("active");
      }
      if (this.currentScroll >= text14.offsetTop + 100) {
        text14.classList.add("active");
      }
    },
    slide(value) {
      this.show = value;
      let nativion = document.getElementsByClassName("nativion")[0];
      if (value == 1) {
        nativion.style.left = "0px";
      } else if (value == 2) {
        nativion.style.left = "150px";
      } else if (value == 3) {
        nativion.style.left = "300px";
      }
    },
    shown(index) {
      let liall = document.getElementsByClassName("messaging_li");
      liall[index].classList.add("backgroundshow");
      liall[index + 5].classList.add("backgroundshow2");
    },
    hide(index) {
      let liall = document.getElementsByClassName("messaging_li");
      liall[index].classList.remove("backgroundshow");
      liall[index + 5].classList.remove("backgroundshow2");
    },
    use() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    //监听滚轮
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped>
.center {
  position: absolute;
  top: 120%;
  height: 110%;
  width: 90%;
  left: 5%;
}
.storage_title,
.mail_title {
  font-size: 400%;
  font-weight: 500;
  text-align: center;
  margin: 30px;
  color: silver;
  opacity: 0;
  transform: translateY(20%);
  /* font-family: 'Courier New', Courier, monospace; */
}
h1 strong {
  font-weight: 500;
  color: black;
}

.storage_text,
.mail_text {
  text-align: center;
  /* font-size: large; */
  color: #77787b;
  opacity: 0;
  transform: translateY(40%);
}
.storage {
  position: relative;
  height: 75%;
  width: 100%;
  top: 5%;
  border-radius: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(40%);
}
.storage div {
  display: inline-block;
}
.storage .storage_left {
  position: absolute;
  height: 100%;
  width: 40%;
  left: 0;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  background-color: rgba(219, 219, 219, 0.3);
}
.storage .storage_left ul {
  display: flex;
  border: 1px solid #000;
  border-radius: 10px;
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #5e7183;
}
.storage .storage_left ul li {
  list-style: none;
  width: 140px;
  text-align: center;
  color: #ffff;
  padding: 10px;
  cursor: pointer;
}
.nativion {
  position: absolute;
  height: 100%;
  width: 180px;
  background-color: #87cefa;
  border-radius: 10px;
  z-index: -1;
  transition: all 1s;
}

.textshow_area {
  position: absolute;
  height: 85%;
  width: 90%;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.storage .storage_right {
  position: absolute;
  height: 100%;
  width: 60%;
  left: 40%;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background: linear-gradient(160deg, #87cefa, #94d6da);
}
.storage_right .storage_right_img {
  position: absolute;
  height: auto;
  width: 100%;
  bottom: 0%;
  transform: translateX(50%);
}
.storage_small {
  cursor: pointer;
  display: inline-flex;
  position: relative;
  top: 10%;
  height: 25%;
  width: 24%;
  border-radius: 2rem;
  margin: 5px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(50%);
}
.storage_small:hover {
  top: 14%;
}
.storage_small p {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: xx-large;
  color: #ffff;
}
.storage_small img {
  position: absolute;
  height: 30%;
  width: auto;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mail_title,
.mail_text {
  position: relative;
  top: 20%;
  opacity: 0;
  transform: translateY(40%);
}

.mail {
  position: relative;
  height: 90%;
  width: 100%;
  top: 25%;
  opacity: 0;
  transform: translateY(40%);
}
.mail .mail_left {
  position: absolute;
  height: 100%;
  width: 49%;
  border-radius: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  background-color: rgba(74, 121, 175, 0.1);
}
.mail_left img:nth-child(1) {
  position: absolute;
  top: 5%;
  width: 60%;
  left: 5%;
  transform: translateX(-50%);
}
.mail_left img:nth-child(2) {
  position: absolute;
  width: 50%;
  right: 15%;
  bottom: 0;
  transform: translateX(-100%);
}
.mail .mail_right_hight,
.mail .mail_right_down {
  position: absolute;
  height: 49%;
  width: 49%;
  right: 0;
  border-radius: 2rem;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
}
.mail .mail_right_down {
  bottom: 0;
}

.use {
  position: relative;
  top: 50%;
  height: 8%;
  width: 30%;
  border-radius: 10rem;
  background-color: #ffff;
  left: 35%;
  cursor: pointer;
  opacity: 0;
  transform: translateY(40%);
}
.use p {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  font-size: 30px;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 2s;
}
.use:hover p {
  opacity: 1;
  left: 80%;
}
.detail {
  position: relative;
  top: 70%;
  height: 35%;
  width: 100%;
  opacity: 0;
  transform: translateY(40%);
}

/* 滚动后显现 */
.active {
  transform: translateY(0%) !important;
  opacity: 1 !important;
  transition: all 2.5s ease;
}
.level {
  transform: translateX(0%) !important;
  opacity: 1 !important;
  transition: all 3s ease;
}
.messaging {
  position: absolute;
  margin: 0;
  top: 10%;
  width: 50%;
  text-align: center;
  left: 25%;
  color: #ffff;
  font-size: x-large;
  transform: translateX(100%);
}
.messaging_ul {
  position: absolute;
  height: 60%;
  width: 100%;
  top: 30%;
  padding: 0;
  margin: 0;
}
.messaging_ul li {
  position: relative;
  height: 20%;
  list-style: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
}
.messaging_ul li p {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: #fff;
  border-bottom: 1px solid rgb(255, 255, 255);
}
.backgroundshow {
  background-color: rgba(54, 172, 132, 0.3);
  border-radius: 30px;
}
.backgroundshow2 {
  background-color: rgba(50, 163, 216, 0.3);
  border-radius: 30px;
}
.el-icon-circle-check,
.el-icon-success {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.detail_center {
  position: absolute;
  height: 60%;
  width: 10%;
}
.detail_center:nth-child(1) {
  left: 50%;
}
.detail_center:nth-child(2) {
  left: 62%;
}
.detail_center:nth-child(3) {
  left: 74%;
}
.detail_center:nth-child(4) {
  left: 86%;
}
.detail_center p {
  position: relative;
  font-weight: 700;
  font-size: 20px;
}
.detail_center a {
  position: relative;
  display: block;
  text-decoration: none;
  color: rgb(141, 140, 140);
  margin-top: 15px;
  font-size: 12px;
}
.beian {
  position: absolute;
  text-decoration: none;
  bottom: 20%;
  right: 10%;
  color: rgb(141, 140, 140);
  font-size: 10px;
}
.friendshare {
  position: absolute;
  height: 25%;
  left: 50%;
  top: 60%;
}
.textshow_area div h1 {
  position: absolute;
  color: cadetblue;
  text-align: center;
  width: 100%;
}
.datashare_p,
.data_p,
.save_p,
.delete_p{
  margin: 0;
  position: absolute;
  color: #87cefa;
  font-size: larger;
  top: 75%;
  left: 20%;
  font-weight: 800;
}
.save,.delete{
  position: absolute;
  height: 45%;
}
.save{
  top: 15%;
  left: -10%;
}
.save_p,
.data_p{
  top: 35%;
  left: 70%;
}

.delete{
  top: 50%;
  left: 40%;
}
.getfriend{
  position: absolute;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>