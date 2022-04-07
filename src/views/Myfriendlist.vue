<template>
  <div class="list" id="myfriendlist" @click.stop="myfriendList">
    <p class="list_p">好友列表</p>
    <div
      class="item"
      v-for="(item, index) in myfriendlist"
      :key="index + 1"
      @dblclick="showbox(index)"
    >
      <img :src="item.url" />
      <p class="name">{{ item.name }}</p>
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus";
import { GetFriendListAPI } from "../request/api";
export default {
  name: "Myfriendlist",
  data() {
    return {
      myfriendlist: [],
      imgurl: "",
    };
  },
  mounted() {
    bus.$off("getimgurl");
    bus.$on("getimgurl", this.datahandle);
  },
  
  methods: {
    datahandle(data) {
      this.imgurl = data;
      //axios请求赋值好友列表this.myfriendlist
      GetFriendListAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          //    this.myfriendlist = [
          //   { id: 7, url: require("../img/disc.png"), name: "jack" },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    showbox(index) {
      //显示聊天框
      bus.$emit("show_myfriendlist", {
        message: this.myfriendlist[index],
        imgurl: this.imgurl,
      });
    },
    myfriendList() {
      let myfriend_list = document.getElementsByClassName("myfriend-list")[0];
      myfriend_list.style.display = "block";
    },
  },
};
</script>
<style scoped>
.list {
  position: absolute;
  height: 50%;
  width: 20%;
  background-color: #fff;
  box-shadow: 0 0 20px -5px;
  border-radius: 10px;
  left: 20%;
  top: 15%;
  overflow-y: auto;
  z-index: 100;
}
.list::before {
  content: "";
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #fff;
  border-right: 10px solid transparent;
  position: absolute;
  top: calc(-20px);
  left: 10%;
}
.item {
  position: relative;
  top: 12%;
  height: 18%;
  width: 100%;
  cursor: pointer;
}
.item:hover {
  background-color: rgb(246, 247, 248);
}
.list_p {
  color: rgb(189, 187, 187);
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.item img {
  position: absolute;
  height: 70%;
  top: 15%;
  left: 5%;
}
.item .name {
  position: absolute;
  margin: 0;
  top: 50%;
  left: 30%;
  width: 68%;
  transform: translate(0%, -50%);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>