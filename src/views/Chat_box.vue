<template>
  <div class="chatbox" v-show="false">
    <div class="chatbox_top">
      <p class="remarks">{{ remarks }}</p>
    </div>
    <div class="chatbox_center">
      <div v-for="(item, index) in allmessage" :key="index + 1">
        <div class="dialogue_left" v-if="item.id == 0">
          <!-- 头像 -->
          <img :src="imgurl" alt="" class="avatar" />
          <!-- 向左对话框 -->
          <div class="word_left">
            <p>
              {{ item.message }}
            </p>
          </div>
        </div>
        <div class="dialogue_right" v-if="item.id == 1">
          <!-- 头像 -->
          <!-- 向右对话框 -->

          <div class="word_right">
            <p>
              {{ item.message }}
            </p>
          </div>
          <img :src="myimgurl" alt="" class="avatar" />
        </div>
      </div>
    </div>
    <div class="chatbox_bottom">
      <quillEditor
        :options="editorOption"
        class="editor"
        ref="QuillEditor"
        v-model="content"
      >
      </quillEditor>
      <button class="sumbit" @click="sumbit">发送</button>
    </div>
    <expressionpackage></expressionpackage>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import expressionpackage from "./Expressionpackage.vue";
import bus from "../utils/bus";
import { PostTextAPI, GetFriendMessageaAPI } from "../request/api";
export default {
  name: "Chat_box",
  data() {
    return {
      remarks: "", //名字
      imgurl: "", //对方头像
      myimgurl: "", //自己头像
      content: "", //编辑器存放内容
      nowId: null, //目前正在对话的id是多少，发送时方便使用
      token: null,
      //双方对话所有信息存放 并显示
      allmessage: [],
      editorOption: {
        placeholder: "",
        modules: {
          //工具栏定义的
          toolbar: [[], ["image"], ["file"], ["expression"]],
        },
      },
    };
  },
  components: {
    quillEditor,
    expressionpackage,
  },
  
  methods: {
    //发送
    sumbit() {
      const reg = /<\/?.+?\/?>/g;
      this.content = this.content.replace(reg, "");
      let text = /^[ ]+$/;
      if (this.content == "") {
        this.$message({
          title: "警告",
          message: "请输入内容！",
          type: "warning",
          offset: 600,
        });
      } else if (text.test(this.content)) {
        this.$message({
          title: "警告",
          message: "请输入内容！",
          type: "warning",
          offset: 600,
        });
      } else {
        this.allmessage.push({ id: 1, message: this.content });
        //发送axios请求给后端，告知后端发送了this.content 这段文字
        //this.nowId可以告知发送的是阅读列表的第几个，并发送请求给后端
        PostTextAPI({
          token: localStorage.getItem("token"),
          Id: this.nowId,
          text: this.context,
        })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          });
        this.content = "";
        this.scrollToBottom();
      }
    },
    //enter键发送
    handleKeyDown(e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        this.sumbit();
      }
    },
    //始终保持对话框滚动条在最底部
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".chatbox_center");
        container.scrollTop = container.scrollHeight;
      });
    },
    //在工具栏，增加发送文件和发送表情图标
    icon() {
      let file = document.querySelector(".ql-file");
      let expression = document.querySelector(" .ql-expression");

      let Front = document.createElement("svg");
      let input = document.createElement("input");
      let after = document.createElement("svg");
      Front.className = " icon-file";
      after.className = " icon-expression";
      input.className = "icon-file-input";
      input.type = "file";
      input.title = "";
      input.accept = ".docx,.txt,.pdf,.doc,.ppt,.pptx,.xls,.xlsx";
      Front.appendChild(input);
      file.appendChild(Front);
      expression.appendChild(after);
      expression.addEventListener("click", this.showexpression);
    },
    //显示表情库框
    showexpression() {
      bus.$emit("showexpression");
    },
    //点击好友，显示聊天框
    getfriendmessage(data) {
      this.myimgurl = data.imgurl;
      this.remarks = data.message.name;
      this.imgurl = data.message.imgurl;
      this.nowId = data.message.id;

      GetFriendMessageaAPI({
        token: localStorage.getItem("token"),
        Id: this.nowId,
      })
        .then(function (res) {
          console.log(res);
          //this.allmessage = 后端传过来的数据 添加id id为0是对方，id为1是自己
          //this.allmessage =  [
          //   { id: 0, message: "中午吃什么" },
          //   { id: 1, message: "吃好时代" },
          //   { id: 1, message: "还是吃港澳" },
          //   { id: 0, message: "都可以的" }
          // ]
        })
        .catch(function (err) {
          console.log(err);
        });
      this.scrollToBottom();
    },
    //点击好友列表，显示聊天框
    show_myfriendlist(data) {
      let chatbox = document.getElementsByClassName("chatbox")[0];
      chatbox.style.display = "block";
      this.myimgurl = data.imgurl;
      this.remarks = data.message.name;
      this.imgurl = data.message.url;
      this.nowId = data.message.id;
      GetFriendMessageaAPI({
        Id:this.nowId,
        token:this.token
      })
        .then(function (res) {
          console.log(res);
          //this.allmessage = 后端传过来的数据 添加id id为0是对方，id为1是自己
          //     this.allmessage = [
          //   { id: 0, message: "中午吃什么" },
          //   { id: 1, message: "吃好时代" },
          //   { id: 1, message: "还是吃港澳" },
          //   { id: 0, message: "都可以的" }
          // ]
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
  mounted() {
    bus.$off("index");
    bus.$on("index", this.getfriendmessage);
    bus.$off("show_myfriendlist");
    bus.$on("show_myfriendlist", this.show_myfriendlist);
    document
      .getElementsByClassName("editor")[0]
      .addEventListener("keydown", this.handleKeyDown, true);
    this.scrollToBottom();
    this.icon();
  },
  beforeDestroy() {
    document
      .getElementsByClassName("editor")[0]
      .removeEventListener("keydown", this.handleKeyDown, true);
  },
};
</script>
.<style>
.chatbox {
  position: absolute;
  height: 100%;
  width: calc(76% - 2px);
  right: 0;
  z-index: 10;
  background-color: #fff;
}
.chatbox_top {
  position: absolute;
  height: 7%;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}
.remarks {
  position: absolute;
  margin: 0;
  top: 30%;
  left: 5%;
  width: 60%;
  font-size: x-large;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.chatbox_center {
  position: absolute;
  height: 70%;
  width: 100%;
  top: calc(7% + 1px);
  border-bottom: 1px solid #e0e0e0;
  overflow-y: auto;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
  -ms-overflow-style: none;
}
.chatbox_bottom {
  position: absolute;
  height: calc(23% - 2px);
  width: 100%;
  bottom: 0;
}
.editor {
  position: relative;
  height: 100%;
  width: 100%;
}
.ql-toolbar {
  position: relative;
  height: 15%;
  width: 100%;
}
.ql-container {
  position: relative;
  overflow-y: auto;
  height: 65%;
  width: 100%;
  font-size: medium;
}
.ql-container.ql-snow,
.ql-toolbar.ql-snow {
  border: 0;
  padding: 0;
}

.dialogue_left {
  margin: 5px 10px;
  float: left;
  clear: both;
  display: flex;
  padding-bottom: 15px;
}
.dialogue_right {
  margin: 5px 10px;
  float: right;
  clear: both;
  display: flex;
  padding-bottom: 15px;
}
.dialogue_left img,
.dialogue_right img {
  height: 45px;
}

.dialogue_left .word_left {
  background-color: #e0e0e0;
  margin: 0 10px;
  max-width: 500px;
  border-radius: 5px;
  position: relative;
  white-space: pre-wrap;
}
.dialogue_left .word_left::before {
  content: "";
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid #e0e0e0;
  position: absolute;
  top: 20px;
  left: calc(-4px);
  transform: translate(-50%, -50%);
}
.dialogue_right .word_right {
  background-color: chartreuse;
  margin: 0 10px;
  border-radius: 5px;
  max-width: 500px;
  position: relative;
}
.dialogue_right .word_right::before {
  content: "";
  border-left: 5px solid chartreuse;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
  top: 20px;
  right: calc(-14px);
  transform: translate(-50%, -50%);
}
.dialogue_left .word_left p,
.dialogue_right .word_right p {
  margin: 12px 15px;
}
.sumbit {
  position: absolute;
  bottom: 0;
  cursor: pointer;
  z-index: 1;
  right: 5%;
  padding: 0 20px;
  font-size: medium;
  border: 1px solid #f1f1f1;
}
.sumbit:hover {
  background-color: darkgray;
}
.ql-file,
.ql-expression {
  position: relative;
  height: 24px;
  width: 28px;
}
.icon-file,
.icon-expression {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-image: url("../img/file.svg");
  background-position: center;
  background-size: 18px 18px;
  background-repeat: no-repeat;
}
.icon-expression {
  background-image: url("../img/expression.svg");
}
.icon-expression:hover {
  background-image: url("../img/expression_blue.svg");
}
.icon-file:hover {
  background-image: url("../img/file_blue.svg");
}
.icon-file-input {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
  opacity: 0;
  font-size: 0;
  overflow: hidden;
}
</style>