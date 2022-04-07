<template>
  <div class="chart" @click="hide">
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
      modal:false
      :before-close="handleClose"
    >
      <div class="center">
        <div class="left">
          <div class="left_top">
            <img :src="avatarUrl" alt="" class="left_top_img" />
            <div class="nickname">
              <p>{{ nickname }}</p>
            </div>
            <img
              src="../img/friendList.png"
              class="friendList"
              @click.stop="myfriendList"
            />
          </div>
          <div class="left_center">
            <div
              class="item"
              v-for="(item, index) in friendlist"
              :key="index + 1"
              @click="chartbox_message(index)"
            >
              <img :src="item.imgurl" alt="" />
              <p class="name">{{ item.name }}</p>
              <p class="time">{{ item.time }}</p>
              <p class="chart_message">{{ item.message }}</p>
            </div>
          </div>
          <div class="left_bottom">
            <div class="left_first_circle" title="添加好友" @click="open"></div>
            <div
              class="left_second_circle"
              title="好友信息"
              @click="friendmessage"
            >
              <img src="../img/warn.png" />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="chart_icon"></div>
        </div>
        <Friend class="friend"></Friend>
        <Chatbox class="Chat-box"></Chatbox>
        <Myfriendlist class="myfriend-list"></Myfriendlist>
      </div>
    </el-drawer>
  </div>
</template>
<script>
//聊天页面
import bus from "../utils/bus";
import Chatbox from "./Chat_box.vue";
import Friend from "./Friend.vue";
import Myfriendlist from "./Myfriendlist.vue";
import { GetFriendChartAPI, PostFriendRequestAPI } from "../request/api";
export default {
  name: "Chart",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      nickname: "",
      avatarUrl: null,
      //用户的好友阅读信息
      friendlist: [],
      //token
      token:null
    };
  },
  components: {
    Friend,
    Chatbox,
    Myfriendlist,
  },
  
  methods: {
    showchart() {
      let chart = document.getElementsByClassName("chart")[0];
      chart.style.display = "block";
      this.drawer = true;
      //axios请求获取好友聊天列表
      GetFriendChartAPI({
        token:localStorage.getItem("token")
      })
        .then(function (res) {
          console.log(res);
          // this.friendlist = [
          //   {
          //     id: 10,//好友id
          //     imgurl:  //好友头像
          //     name: "liu999999", //好友名称
          //     time: "17:11",  //好友时间
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleClose(done) {
      done();
    },
    open() {
      let that = this;
      this.$prompt("请输入手机号", "添加好友", {
        confirmButtonText: "发送",
        cancelButtonText: "取消",
        inputPattern:
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        inputErrorMessage: "手机格式不正确",
      })
        .then(({ value }) => {
          //axios发送请求添加好友
          PostFriendRequestAPI({
            //手机号码传给后端
            token:localStorage.getItem("token"),
            text:value
          })
            .then(function (res) {
              console.log(res);
              that.$message({
                type: "success",
                message: "发送成功~等待对方同意",
              });
            })
            .catch(function (err) {
              console.log(err);
              that.$message({
                type: "error",
                message: "发送失败~请重试",
              });
            });
        })
        .catch(() => {});
    },
    friendmessage() {
      let friend = document.getElementsByClassName("friend")[0];
      friend.style.display = "block";
      let chatbox = document.getElementsByClassName("chatbox")[0];
      chatbox.style.display = "none";
    },
    chartbox_message(index) {
      let friend = document.getElementsByClassName("friend")[0];
      friend.style.display = "none";
      let chatbox = document.getElementsByClassName("chatbox")[0];
      chatbox.style.display = "block";
      bus.$emit("index", {
        message: this.friendlist[index],
        imgurl: this.avatarUrl,
      });
    },
    myfriendList() {
      let myfriend_list = document.getElementsByClassName("myfriend-list")[0];
      if (myfriend_list.style.display == "block") {
        myfriend_list.style.display = "none";
      } else {
        myfriend_list.style.display = "block";
        bus.$emit("getimgurl", this.avatarUrl);
        this.$message({
          showClose: true,
          message: "双击开启聊天~",
        });
      }
    },
    hide() {
      let myfriendlist = document.getElementById("myfriendlist");
      myfriendlist.style.display = "none";
    },
  },
  mounted() {
    bus.$off("chart"); //阻止事件被触发多次
    bus.$on("chart", this.showchart); //绑定
    bus.$off("chartmessage");
    bus.$on("chartmessage", (msg) => {
      this.nickname = msg.nickname;
      this.avatarUrl = "https://www.netdisc.cloud" + msg.avatarUrl;
    });
  },
};
</script>
<style scoped>
.center {
  position: absolute;
  height: 90%;
  width: 80%;
  box-shadow: 0 0 20px -5px;
  left: 10%;
  top: 5%;
}
.left {
  position: absolute;
  height: 100%;
  width: 24%;
  border-right: 2px solid #e0e0e0;
}
.right {
  position: absolute;
  height: 100%;
  width: calc(76% - 1px);
  right: 0;
}
.left_top {
  position: absolute;
  height: 18%;
  width: 100%;
  border-bottom: 2px solid #e0e0e0;
}
.left_center {
  position: absolute;
  height: 73%;
  top: calc(18% + 2px);
  width: 100%;
  border-bottom: 2px solid #e0e0e0;
  overflow-y: auto;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
  -ms-overflow-style: none;
}
.left_bottom {
  position: absolute;
  height: calc(9% - 4px);
  bottom: 0;
  width: 100%;
}
.left_first_circle {
  position: absolute;
  height: 40px;
  width: 40px;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  background-image: url("../img/plus_friend.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
}
.left_second_circle {
  position: absolute;
  height: 40px;
  width: 40px;
  top: 50%;
  right: 20%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.left_second_circle img {
  position: absolute;
  height: 100%;
  width: 100%;
}
.left_top_img {
  position: absolute;
  height: 80px;
  width: 80px;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}
.nickname {
  position: absolute;
  color: dimgrey;
  font-size: 15px;
  height: 50%;
  width: 30%;
  left: 60%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.nickname p {
  position: absolute;
  left: 50%;
  bottom: 40%;
  transform: translate(-50%, 0);
  margin: 0;
}
.item {
  position: relative;
  height: 15%;
  width: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
}
.item:hover {
  background-color: rgb(194, 194, 194);
}
.item img {
  position: absolute;
  height: 70%;
  top: 15%;
  left: 5%;
}
.name {
  position: absolute;
  top: 20%;
  left: 35%;
  width: 50%;
  margin: 0;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.time,
.chart_message {
  color: rgb(134, 134, 134);
  position: absolute;
  right: 2%;
  top: 20%;
  margin: 0;
  font-size: 13px;
}
.chart_message {
  left: 35%;
  top: 50%;
  width: 65%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.chart_icon {
  position: absolute;
  height: 100px;
  width: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("../img/chart_icon.png");
  background-position: center;
  background-size: cover;
}
.left_center::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.left_center::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.left_center::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.friend {
  display: none;
}
.friendList {
  position: absolute;
  width: 30%;
  right: -10%;
  bottom: 30%;
  cursor: pointer;
}
.myfriend-list {
  display: none;
}
</style>
