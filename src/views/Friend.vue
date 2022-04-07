<template>
  <div class="friend">
    <div class="newfriend">
      <div class="newfriend_top">
        <p>好友信息</p>
        <img
          src="../img/delete.png"
          alt=""
          class="delete"
          title="清空"
          @click="deletemessage"
        />
      </div>
      <div class="newfriend_center">
        <div
          class="item"
          v-for="(item, index) in friend_message"
          :key="index + 1"
        >
          <img :src="item.url" alt="" class="avatar" />
          <p class="nickname">{{ item.nickname }}</p>
          <p class="message">请求通过验证</p>
          <div class="addimg">
            <p class="refuse" @click="refuse(index)">拒绝</p>
            <p class="agree" @click="agree(index)">同意</p>
            <div class="movein"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetFriendMessageAPI,
  PostFriendAgreeAPI,
  PostFriendRefuseAPI,
  PostClearMessageAPI,
} from "../request/api";
export default {
  name: "Friend",
  data() {
    return {
      show: false,
      //获取好友请求列表 好友头像、好友昵称
      friend_message: [],
      token: null,
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    GetFriendMessageAPI({
      token: localStorage.getItem("token"),
    })
      .then(function (res) {
        console.log(res);
        // this.friend_message = [
        //   { id: 1, url: require("../img/avatar.jpg"), nickname: "liuyingying" }
        // ];
      })
      .catch(function (err) {
        console.log(err);
      });
    this.friend_message = [];
  },
  methods: {
    refuse(index) {
      this.$confirm(
        "确认拒绝" + this.friend_message[index].nickname + "的好友请求吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let addimg = document.getElementsByClassName("addimg")[index];
          addimg.innerHTML = "已拒绝";
          addimg.classList.add("newstyle");
          //发送拒绝请求给后端
          PostFriendRefuseAPI({
            token: localStorage.getItem("token"),
            Id: this.friend_message[index].id, //拒绝的是好友消息列表里面的哪个id
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    agree(index) {
      this.$confirm(
        "确认同意" + this.friend_message[index].nickname + "的好友请求吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let addimg = document.getElementsByClassName("addimg")[index];
          addimg.innerHTML = "已同意";
          addimg.classList.add("newstyle");
          //发送同意请求给后端
          PostFriendAgreeAPI({
            token: localStorage.getItem("token"),
            Id: this.friend_message[index].id, //同意的是好友消息列表里面的哪个id
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    deletemessage() {
      //清空函数
      this.$confirm("确认清空所有的好友请求吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //确认同意
          this.friend_message = [];
          PostClearMessageAPI({
            token: localStorage.getItem("token"),
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
  },
};
</script>
<style scoped>
.friend {
  position: absolute;
  height: 100%;
  width: calc(76% - 2px);
  margin: 0;
  right: 0;
  z-index: 10;
}
.newfriend {
  position: absolute;
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.newfriend_top {
  position: absolute;
  height: 10%;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}
.newfriend_top p {
  position: absolute;
  width: auto;
  margin: 0;
  left: 10%;
  top: 50%;
  font-weight: 600;
  transform: translate(-50%, -50%);
  font-size: 20px;
  text-align: center;
}
.newfriend_center {
  position: absolute;
  height: calc(90% - 1px);
  width: 100%;
  bottom: 0;
  overflow-y: scroll;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1); /* 第一个方块颜色，第二个轨道颜色(用于更改火狐浏览器样式) */
  scrollbar-width: thin; /* 火狐滚动条无法自定义宽度，只能通过此属性使滚动条宽度变细 */
  -ms-overflow-style: none; /* 隐藏滚动条（在IE和Edge两个浏览器中很难更改样式，固采取隐藏方式） */
}

.item {
  position: relative;
  border-bottom: 2px solid #e0e0e0;
  height: 15%;
  width: 70%;
  left: 15%;
}
.item .avatar {
  position: absolute;
  height: 60%;
  top: 20%;
  left: 5%;
}
.item .nickname {
  position: absolute;
  height: 20%;
  width: 60%;
  left: 18%;
  top: 20%;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.item .message {
  position: absolute;
  left: 18%;
  top: 50%;
  margin: 0%;
  color: #949191;
  font-size: x-small;
}
.addimg {
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: rgb(209, 208, 208);
  color: #fff;
  transition: all 0.5s;
}
.agree,
.refuse {
  font-size: 10px;
  margin: 0;
  padding: 5px 10px 5px 10px;
  display: inline-flex;
}

.refuse {
  display: none;
}
.addimg:hover .refuse {
  display: inline;
}
.movein {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0%;
  top: 0;
  background-color: #46a3ff;
  z-index: -1;
  border-radius: 10px;
  transition: left 0.5s;
  visibility: hidden;
}
.addimg:hover .movein {
  visibility: visible;
}
.agree:hover + .movein {
  left: 50%;
}
.refuse:hover + .movein {
  left: 0%;
}
.newstyle {
  background-color: #fff;
  font-size: 10px;
  border: 0;
  color: #949191;
}
.delete {
  position: absolute;
  height: 30%;
  bottom: 5%;
  right: 5%;
  cursor: pointer;
}
</style>