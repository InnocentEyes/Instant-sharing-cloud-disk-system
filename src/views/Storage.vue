<template>
  <div>
    <div class="storage" :style="style" id="storage">
      <img
        src="../img/fileshow.png"
        alt=""
        class="storage_img"
        @click="turntopage"
      />
      <img
        src="../img/musicshow.png"
        alt=""
        class="storage_img"
        @click="turntopage"
      />
      <img
        src="../img/imgshow.png"
        alt=""
        class="storage_img"
        @click="turntopage"
      />
      <img
        src="../img/videoshow.png"
        alt=""
        class="storage_img"
        @click="turntopage"
      />
      <img src="../img/close.png" alt="" class="close" @click="close" />
      <p class="storage_p">flie</p>
      <p class="storage_p">music</p>
      <p class="storage_p">photo</p>
      <p class="storage_p">video</p>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="100%"
      modal:false
      :before-close="handleClose"
    >
      <Video class="videodiv"></Video>
      <Audio class="audiodiv"></Audio>
      <Photo class="photodiv"></Photo>
      <Smallaudio class="smallaudiodiv"></Smallaudio>
      <div class="center">
        <div class="head">
          <div class="filelist" @click="showfilelist">文件列表</div>
          <div class="loadup" @click="showloadup">上传</div>
          <div class="personal" @click="showpersonal">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="triangle"></div>
          </div>
        </div>

        <div class="centerpage">
          <!-- 文件列表 -->
          <div class="FileList" v-show="isShowFileList">
            <div class="leftbox">
              <ul id="ulbox">
                <li class="allfile" @click="showall(0)">
                  <a>全部文件</a>
                </li>
                <li @click="showphoto(1)"><a>图片</a></li>
                <li @click="showvideo(2)"><a>视频</a></li>
                <li @click="showmusic(3)"><a>音乐</a></li>
                <li @click="showfile(4)"><a>文档</a></li>
              </ul>
            </div>
            <!-- 搜索 -->
            <el-autocomplete
              v-model="state"
              class="search"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
              :clearable="true"
            ></el-autocomplete>

            <div class="viewFileList">
              <div class="item" v-for="(i, index) in list" :key="index + 1">
                <img :src="i.url" alt="" class="showcover" :title="i.title" />
                <p class="showname">{{ i.name }}</p>
                <a class="download" @click="load(index)"><p>下载</p></a>
                <a class="look" @click="look(index)"><p>查看</p></a>
              </div>
            </div>
          </div>

          <!-- 上传 -->
          <div class="loadupall" v-show="isShowLoadUp">
            <div class="LoadUp">
              <div>
                <img src="../img/blueimg.jpg" alt="" />
                <input
                  type="file"
                  class="Field"
                  accept=".jpg,.png"
                  multiple="5"
                  id="imgid"
                  v-on:change="handleFileUpload($event)"
                  title="最多上传图片5张"
                />
                <p>上传图片</p>
              </div>
              <div>
                <img src="../img/bluefile.jpg" alt="" />
                <input
                  type="file"
                  class="Field"
                  accept=".docx,.txt,.pdf,.doc,.ppt,.pptx,.xls,.xlsx"
                  multiple="5"
                  id="documentid"
                  v-on:change="handleFileUpload($event)"
                  title="最多上传文件5条"
                />
                <p>上传文件</p>
              </div>
              <div>
                <img src="../img/bluemusic.jpg" alt="" />
                <input
                  type="file"
                  class="Field"
                  ref="file"
                  accept=".mp3"
                  multiple="5"
                  id="musicid"
                  v-on:change="handleFileUpload($event)"
                  title="最多上传音乐5首"
                />
                <p>上传音乐</p>
              </div>
              <div>
                <img src="../img/bluevideo.jpg" />
                <input
                  type="file"
                  class="Field"
                  alt=""
                  accept=".mp4,.flv,.swf,.ogg,.webm"
                  multiple="3"
                  id="videoid"
                  v-on:change="handleFileUpload($event)"
                  title="最多上传视频3条"
                />
                <p>上传视频</p>
              </div>
            </div>
            <div class="filenameshow">
              <div
                class="loaditem"
                v-for="(i, index) in fileslist"
                :key="index + 1"
              >
                <div>
                  <img src="../img/load.png" alt="" />
                  <p>{{ i.name }}</p>
                  <p>{{ i.size }}</p>
                </div>
                <div class="bottom">
                  <el-progress
                    :percentage="percentage"
                    :color="customColor"
                  ></el-progress>
                </div>
              </div>
            </div>
          </div>
          <!-- 个人 -->
          <div class="Personal" v-show="isShowPearsonal">
            <div class="head_portrait">
              <img :src="src" />
              <div class="edit">
                <p>编辑</p>
                <input
                  type="file"
                  accept="image/gif,image/jpeg,image/png,image/jpg"
                  @change="update"
                />
              </div>
            </div>
            <label class="nicknamelabel">昵称:</label>
            <input type="text" id="nickname" :value="nickname" />
            <label class="emaillabel">邮箱:</label>
            <input type="text" id="email" :value="email" />
            <label class="passwordlabel">密码:</label>
            <input type="password" id="password" :value="password" />
            <button class="sumbit" @click="sumbit">提交</button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import bus from "../utils/bus";
import Video from "../views/Video.vue";
import Audio from "../views/Audio.vue";
import Smallaudio from "../views/Smallaudio.vue";
import Photo from "../views/Photo.vue";
import {
  //改变用户头像API
  PostChangeUserAvatar,
  //获取数据API
  GetAllFileAPI,
  GetAllImgAPI,
  GetAllVideoAPI,
  GetAllMusicAPI,
  GetAllDocumentAPI,
  //上传数据API
  PostSingleImgAPI,
  PostMultiImgAPI,
  PostSimgleDocumentAPI,
  PostMultiDocumentAPI,
  PostSingleMusicAPI,
  PostMultiMusicAPI,
  PostSingleVideoAPI,
  PostMultiVideoAPI,
  PostChangeMessageAPI,
} from "../request/api.js";
export default {
  name: "Storage",
  components: {
    Video,
    Audio,
    Smallaudio,
    Photo,
  },
  data() {
    return {
      style: {
        display: "none",
      },
      //抽屉默认显示
      drawer: false,
      direction: "rtl",
      //头像
      circleUrl: require("../img/head.png"),
      sizeList: ["large"],

      //上传，好友，文件列表切换显示
      isShowFileList: false,
      isShowLoadUp: false,
      isShowPearsonal: false,
      //上传列表
      fileslist: [],
      //进度条显示
      percentage: 0,
      customColor: "#409eff",
      // 个人信息更改
      src: "",
      nickname: "",
      email: "",
      password: "",
      //文件显示列表
      list: [{}],
      alllist: [{}],
      //输入框配置
      restaurants: [],
      state: "",
      timeout: null,
      //token
      token: "",
      //文件转换成base64
      Base64: [],
    };
  },
  mounted() {
    bus.$off("event"); //阻止事件被触发多次
    bus.$on("event", this.show); //绑定
    bus.$on("control", this.controlpersonal); //绑定
    bus.$off("pearsonalmessage"); //阻止事件被触发多次
    bus.$on("pearsonalmessage", this.pearsonalmessage); //绑定
  },
  
  methods: {
    //更换渲染头像
    update(e) {
      let file = e.target.files[0];
      let formdata = new FormData();
      formdata.append("header", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      PostChangeUserAvatar({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          that.$message({
            showClose: true,
            message: "更改头像成功~",
            type: "success",
          });
          reader.onload = function (e) {
            that.src = this.result;
          };
        })
        .catch(function (err) {
          that.$message({
            showClose: true,
            message: "更改头像失败~请重试",
            type: "error",
          });
        });
    },
    //提交修改信息
    sumbit() {
      let that = this;
      this.$confirm("确认提交修改信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发送axios提交
          PostChangeMessageAPI({
            token: localStorage.getItem("token"),
          })
            .then(function (res) {
              console.log(res);
              that.$message({
                showClose: true,
                message: "修改成功~",
                type: "success",
              });
            })
            .catch(function (err) {
              console.log(err);
              that.$message({
                showClose: true,
                message: "修改失败！请重试",
                type: "warning",
              });
            });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 2000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.list = this.alllist;
      this.list = [this.list[item.num]];
    },

    //显示遮罩层
    show(val) {
      let imgall = document.getElementsByClassName("storage_img");
      let pall = document.getElementsByClassName("storage_p");
      this.style.display = val;
      for (let i = 0; i < imgall.length; i++) {
        imgall[i].classList.add("active");
        pall[i].classList.add("active_p");
      }
    },
    //关闭遮罩层
    close() {
      this.style.display = "none";
      let imgall = document.getElementsByClassName("storage_img");
      let pall = document.getElementsByClassName("storage_p");
      for (let i = 0; i < imgall.length; i++) {
        imgall[i].classList.remove("active");
        pall[i].classList.remove("active_p");
      }
    },
    //关闭抽屉组件
    handleClose(done) {
      done();
    },

    //打开抽屉组件，加载数据
    turntopage() {
      this.drawer = true;
      //跳转到文件列表
      this.showfilelist();
      //axios请求全部文件数据
      GetAllFileAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // 赋值给this.list渲染，需要一下数据
          // this.alllist = [
          //   {
          //     idtype: "musicId"/"imgId"/"documentId"/"videoId"
          //     id: fileId
          //     Size: "",
          //     Path: ,//文件地址
          //     name: "music.mp3"//文件名
          //   },
          //];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.list = this.alllist;
      this.judgeType();
      for (let i = 0; i < this.alllist.length; i++) {
        this.restaurants.push({ value: this.alllist[i].name, num: i });
      }
    },

    //改变颜色
    turncolor(index) {
      let allli = document.getElementById("ulbox").childNodes;
      for (let i = 0; i < allli.length; i++) {
        allli[i].style.backgroundColor = "transparent";
        allli[i].style.color = "#000";
      }
      allli[index].style.backgroundColor = "#46a3ff";
      allli[index].style.color = "#fff";
    },
    //判断文件类型
    judgeType() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].idtype == "imgId") {
          this.list[i].url = require("../img/Photo_format.png");
          this.list[i].title = "图片";
        }
        if (this.list[i].idtype == "musicId") {
          this.list[i].url = require("../img/Music_format.png");
          this.list[i].title = "音乐";
        }
        if (this.list[i].idtype == "documentId") {
          this.list[i].url = require("../img/File_format.png");
          this.list[i].title = "文件";
        }
        if (this.list[i].idtype == "videoId") {
          this.list[i].url = require("../img/Video_format.png");
          this.list[i].title = "视频";
        }
      }
    },
    showall(index) {
      // axios请求全部数据
      GetAllFileAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // 赋值给this.list渲染，需要一下数据
          // this.list = [
          //   {
          //     idtype:"musicId"/"imgId"/"documentId"/"videoId"
          //     id: 1,
          //     Size: "",
          //     Path: require("../img/music.mp3"),
          //     name: "music.mp3",
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.judgeType();
      this.turncolor(index);
    },
    showphoto(index) {
      //axios请求所有图片
      GetAllImgAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // this.list = [
          //   {
          //     idtype: "imgId",
          //     id: 1,
          //     Size: "",
          //     Path: require("../img/bluefile.jpg"),
          //     name: "bluefile.jpg"
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.judgeType();
      this.turncolor(index);
    },

    showvideo(index) {
      //axios请求所有视频
      GetAllVideoAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // this.list = [
          //   {
          //     idtype: "videoId",
          //     id: 1,
          //     Size: "",
          //     Path: require("../img/show.mp4"),
          //     name: "show.mp4",
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.judgeType();
      this.turncolor(index);
    },
    showmusic(index) {
      //axios请求所有音乐
      GetAllMusicAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // this.list = [
          //   {
          //     idtype: "musicId",
          //     id: 1,
          //     Size: "",
          //     Path: require("../img/music.mp3"),
          //     name: "music.mp3",
          //     singer: "",
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.judgeType();
      this.turncolor(index);
    },
    showfile(index) {
      //axios请求所有文档文件
      GetAllDocumentAPI({
        token: localStorage.getItem("token"),
      })
        .then(function (res) {
          console.log(res);
          // this.list = [
          //   {
          //     idtype: "documentId",
          //     id: 1,
          //     Size: "",
          //     Path: require("../img/music.mp3"),
          //     name: "111111111111111111111",
          //   },
          // ];
        })
        .catch(function (err) {
          console.log(err);
        });
      this.judgeType();
      this.turncolor(index);
    },
    //查看文件
    look(index) {
      if (this.list[index].idtype == "imgId") {
        //图片类型，调用图片显示器
        bus.$emit("ImgResources", this.list[index]);
        document.getElementsByClassName("photodiv")[0].style.display = "block";
      }
      if (this.list[index].idtype == "musicId") {
        //音乐类型，调用音乐播放器
        bus.$emit("resources", this.list[index]);
        document.getElementsByClassName("audiodiv")[0].style.display = "block";
        document.getElementsByClassName("smallaudiodiv")[0].style.display =
          "none";
      }
      if (this.list[index].idtype == "documentId") {
        //文件类型，调用文件显示器
        console.log("file");
      }
      if (this.list[index].idtype == "videoId") {
        //视频类型，调用视频播放器
        bus.$emit("VideoResources", this.list[index]);
        document.getElementsByClassName("videodiv")[0].style.display = "block";
      }
    },
    // 下载文件
    load(index) {
      this.$confirm("确认下载" + this.list[index].name + "吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "下载成功！",
          });
          var url = this.list[index].Path; // 获取图片地址
          var a = document.createElement("a"); // 创建一个a节点插入的document
          var event = new MouseEvent("click"); // 模拟鼠标click点击事件
          a.download = this.list[index].name; // 设置a节点的download属性值
          a.href = url; // 将图片的src赋值给a节点的href
          a.dispatchEvent(event); // 触发鼠标点击事件
        })
        .catch(() => {
          console.log("取消下载！");
        });
    },
    //切换页面
    showfilelist() {
      this.isShowFileList = true;
      this.isShowLoadUp = false;
      this.isShowPearsonal = false;
    },
    showloadup() {
      this.isShowFileList = false;
      this.isShowLoadUp = true;
      this.isShowPearsonal = false;
    },
    showpersonal() {
      this.isShowFileList = false;
      this.isShowLoadUp = false;
      this.isShowPearsonal = true;
    },
    controlpersonal(all) {
      this.drawer = true;
      this.src = all[0];
      this.nickname = all[1];
      this.email = all[2];
      this.password = all[3];
      this.isShowFileList = false;
      this.isShowLoadUp = false;
      this.isShowPearsonal = true;
    },
    pearsonalmessage(all) {
      this.src = all.username;
      this.nickname = all.account;
      this.email = all.email;
      this.password = all.avatarUrl;
    },
    //上传文件后处理函数
    handleFileUpload(event) {
      event.preventDefault();
      if (event.target.id == "imgid") {
        let imgid = document.getElementById("imgid");
        if (imgid.files.length > 0 && imgid.files.length < 6) {
          this.changeBase64(imgid.files);
          let that = this;
          if (imgid.files.length == 1) {
            //单张图片
            PostSingleImgAPI({
              img: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                console.log(res);
                that.addloaditem(imgid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                console.log(err);
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          } else {
            //多张图片
            PostMultiImgAPI({
              imgs: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                console.log(res);
                that.addloaditem(imgid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                console.log(err);
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "最多只能上传5张图片！请重新选择",
            type: "error",
          });
        }
      } else if (event.target.id == "documentid") {
        let documentid = document.getElementById("documentid");
        if (documentid.files.length > 0 && documentid.files.length < 6) {
          this.changeBase64(documentid.files);
          let that = this;
          if (documentid.files.length == 1) {
            //单个文档
            PostSimgleDocumentAPI({
              document: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(documentid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          } else {
            PostMultiDocumentAPI({
              documents: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(documentid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "最多只能上传5条文件！请重新选择",
            type: "error",
          });
        }
      } else if (event.target.id == "musicid") {
        let musicid = document.getElementById("musicid");
        if (musicid.files.length > 0 && musicid.files.length < 6) {
          //发送上传音乐请求
          this.changeBase64(musicid.files);
          let that = this;
          if (musicid.files.length == 1) {
            //单个音乐
            PostSingleMusicAPI({
              music: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(musicid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          } else {
            PostMultiMusicAPI({
              musics: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(musicid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败！",
                  type: "error",
                });
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "最多只能上传5首音乐！请重新选择",
            type: "error",
          });
        }
      } else if (event.target.id == "videoid") {
        let videoid = document.getElementById("videoid");
        if (videoid.files.length > 0 && videoid.files.length < 6) {
          this.changeBase64(videoid.files);
          let that = this;
          if (videoid.files.length == 1) {
            PostSingleVideoAPI({
              video: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(videoid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败",
                  type: "error",
                });
              });
          } else {
            PostMultiVideoAPI({
              videos: this.Base64,
              token: localStorage.getItem("token"),
            })
              .then(function (res) {
                that.addloaditem(videoid.files);
                that.loadsuccess(true);
              })
              .catch(function (err) {
                that.$message({
                  showClose: true,
                  message: "上传失败",
                  type: "error",
                });
              });
          }
        } else {
          this.$message({
            showClose: true,
            message: "最多只能上传3条视频！请重新选择",
            type: "error",
          });
        }
      }
    },
    //转换base64格式
    changeBase64(data) {
      this.Base64 = [];
      for (let i = 0; i < data.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(data[i]);
        reader.onload = () => {
          this.Base64.push(reader.result);
          console.log(this.Base64);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }
    },
    //添加上传组件
    addloaditem(data) {
      for (let j = 0; j < data.length; j++) {
        //添加上传进度条组件
        let name = data[j].name;
        let number = data[j].size;
        number = this.changeunit(number);
        this.fileslist.push({ name: name, size: number });
      }
    },
    //上传成功
    loadsuccess(success) {
      let that = this;
      let loaditemall = document.getElementsByClassName("loaditem");
      if (success) {
        let timer = setInterval(function () {
          that.percentage += 10;
          if (that.percentage == 100) {
            for (let i = 0; i < loaditemall.length; i++) {
              loaditemall[i].classList.add("loadactive");
            }
            clearInterval(timer);
          }
        }, 500);
        let timer2 = setInterval(function () {
          that.$message({
            showClose: true,
            message: "上传成功~",
            type: "success",
            offset: 150,
          });
          that.percentage = 0;
          that.fileslist = [];
          clearInterval(timer2);
        }, 6000);
        for (let i = 0; i < loaditemall.length; i++) {
          loaditemall[i].classList.remove("loadactive");
        }
      }
    },
    //文件大小size转换单位
    changeunit(number) {
      if (number < 1024) {
        return number + "bytes";
      } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + "KB";
      } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + "MB";
      }
    },
  },
};
</script>

<style scoped>
.storage {
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.6);
}

.storage .storage_img {
  position: absolute;
  width: 15%;
  top: -20%;
  cursor: pointer;
}
.storage .storage_p {
  position: absolute;
  color: #fff;
  width: 15%;
  font-size: xx-large;
  bottom: 20%;
  text-align: center;
}
.active {
  animation: move 2s infinite;
  -webkit-animation: move 2s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
}
.active_p {
  animation: move_p 2s infinite;
  -webkit-animation: move_p 2s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
}

@keyframes move {
  from {
    top: -20%;
  }
  to {
    top: 35%;
  }
}

@-webkit-keyframes move /*Safari and Chrome*/ {
  from {
    top: -20%;
  }
  to {
    top: 35%;
  }
}
@keyframes move_p {
  from {
    bottom: -20%;
  }
  to {
    bottom: 25%;
  }
}

@-webkit-keyframes move_p /*Safari and Chrome*/ {
  from {
    bottom: -20%;
  }
  to {
    bottom: 25%;
  }
}

.storage img:nth-child(1),
.storage p:nth-child(6) {
  left: 8%;
}
.storage img:nth-child(2),
.storage p:nth-child(7) {
  left: 31%;
}
.storage img:nth-child(3),
.storage p:nth-child(8) {
  left: 54%;
}
.storage img:nth-child(4),
.storage p:nth-child(9) {
  left: 77%;
}

.storage .close {
  position: absolute;
  height: 6%;
  top: 5%;
  right: 5%;
  cursor: pointer;
}
.center {
  position: absolute;
  height: 98%;
  width: 96%;
  left: 1%;
  top: 2%;
  background-color: #fff;
  box-shadow: #000 0px 0px 50px;
  border-radius: 2rem;
}
.head {
  position: absolute;
  height: 12%;
  width: 100%;
  border-bottom: 1px solid#E0E0E0;
}
.head div {
  position: absolute;
  color: #fff;
  cursor: pointer;
}
.head .filelist {
  width: 8%;
  left: 68%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border: 10px solid #46a3ff;
  background-color: #46a3ff;
  border-radius: 2rem;
}
.head .loadup {
  width: 8%;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border: 10px solid #46a3ff;
  background-color: #46a3ff;
  border-radius: 2rem;
}
.head .personal {
  position: absolute;
  color: #fff;
  cursor: pointer;
  right: 0%;
  width: 10%;
  height: 100%;
  border-left: 3px solid #e0e0e0;
}
.head .personal .block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.head .personal .triangle {
  position: absolute;
  top: 40%;
  left: 70%;
  height: 20%;
  width: 20%;
  background: url("../img/triangle.png");
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
}
.head .personal:hover .triangle {
  animation: Tmove 1s infinite;
  -webkit-animation: Tmove 1s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
}
@keyframes Tmove {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}

@-webkit-keyframes Tmove /*Safari and Chrome*/ {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
.leftbox {
  position: absolute;
  height: 100%;
  width: 15%;
  background-color: #e0e0e0;
  border-bottom-left-radius: 2rem;
}
.leftbox ul {
  padding: 0;
  margin: 0;
  position: absolute;
  height: 70%;
  width: 100%;
}
.leftbox ul .allfile {
  border-bottom: 2px solid #e0e0e0;
  background-color: #46a3ff;
  color: #fff;
}
.leftbox ul li {
  list-style: none;
  position: relative;
  height: 20%;
  text-align: center;
  cursor: pointer;
}

.leftbox ul li a {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centerpage {
  position: absolute;
  height: 88%;
  width: 100%;
  top: 12%;
}

.FileList .search {
  position: absolute;
  left: 18%;
  top: 15px;
  height: 40px;
  width: 40%;
}
.FileList .viewFileList {
  position: absolute;
  height: 90%;
  width: 85%;
  left: 15%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: scroll;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1);
  scrollbar-width: thin;
  -ms-overflow-style: none;
}

.FileList .viewFileList .item {
  position: relative;
  height: 200px;
  width: 150px;
  margin-top: 30px;
  margin-left: 80px;
  cursor: pointer;
}
.FileList .viewFileList .item:hover {
  background-color: rgba(198, 240, 251, 0.4);
}
.FileList .viewFileList .item:hover .download,
.FileList .viewFileList .item:hover .look {
  visibility: visible;
  background-color: #46a3ff;
  height: 18%;
  cursor: pointer;
}
.showcover {
  position: absolute;
  height: 40px;
  width: 40px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.showname {
  position: absolute;
  bottom: 25%;
  left: 50%;
  width: 100%;
  height: auto;
  transform: translate(-50%, 0);
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.download {
  position: absolute;
  width: 50%;
  bottom: 0;
  height: 0;
  color: #fff;
  transition: all 0.3s;
  visibility: hidden;
}
.look {
  position: absolute;
  width: 50%;
  right: 0;
  bottom: 0;
  height: 0;
  color: #fff;
  transition: all 0.3s;
  visibility: hidden;
}
.download p,
.look p {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loadupall {
  position: relative;
  height: 100%;
  width: 100%;
}
.LoadUp {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.LoadUp div {
  position: relative;
  margin-top: 150px;
  height: 250px;
  width: 200px;
}

.LoadUp div img {
  position: absolute;
  height: 200px;
  width: 200px;
}
.LoadUp div p {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  color: #46a3ff;
}
.LoadUp div input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.filenameshow {
  position: absolute;
  height: 40%;
  width: 100%;
  bottom: 0%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.loaditem {
  position: relative;
  height: 60px;
  width: 500px;
  background-color: rgba(70, 163, 255, 0.4);
  border-radius: 10px;
  transition: all 0.5s;
  margin-bottom: 10px;
}
.loadactive {
  animation: load 1s infinite;
  -webkit-animation: load 1s infinite; /*Safari and Chrome*/
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1; /*Safari and Chrome*/
  animation-fill-mode: forwards;
}
@keyframes load {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate(0, -50%);
  }
}
.loaditem div {
  position: absolute;
  height: 50%;
  width: 100%;
}
.loaditem div img {
  position: absolute;
  height: 100%;
}
.loaditem div p:nth-child(2) {
  position: absolute;
  height: 90%;
  width: 70%;
  bottom: 0;
  left: 10%;
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.loaditem div p:nth-child(3) {
  position: absolute;
  height: 80%;
  text-align: center;
  bottom: 0;
  font-size: x-small;
  right: 5%;
  margin: 0;
}
.bottom {
  bottom: 0;
}
.videodiv,
.audiodiv,
.photodiv {
  position: absolute;
  z-index: 300;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  display: none;
}

.smallaudiodiv {
  position: absolute;
  height: 8%;
  cursor: pointer;
  width: 10%;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  display: none;
  bottom: 0;
  right: 0;
}
.Personal {
  position: absolute;
  width: 100%;
  height: 100%;
}
.head_portrait {
  position: absolute;
  height: 180px;
  width: 180px;
  overflow: hidden;
  border-radius: 180px;
  top: 20%;
  left: 50%;
  border: 0.5px solid #000;
  transform: translate(-50%, -50%);
}
.head_portrait:hover .edit {
  visibility: visible;
}
.head_portrait img {
  position: absolute;
  height: 100%;
  width: 100%;
}
.edit {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: hidden;
}
.edit p {
  position: absolute;
  font-size: xx-large;
  top: 40%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
}
.edit input {
  position: absolute;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
}
.nicknamelabel,
.emaillabel,
.passwordlabel,
#nickname,
#email,
#password {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 20px;
}
.nicknamelabel {
  top: 45%;
  left: 32%;
}
.emaillabel {
  top: 60%;
  left: 32%;
}
.passwordlabel {
  top: 75%;
  left: 32%;
}
#nickname,
#email,
#password {
  height: 6%;
  width: 35%;
  left: 52%;
  border: 0;
  border-bottom: 2px solid #000;
  outline: none;
  text-align: center;
}

#nickname {
  top: 45%;
}
#email {
  top: 60%;
}
#password {
  top: 75%;
}
.sumbit {
  position: absolute;
  height: 8%;
  width: 15%;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  color: #fff;
  background-color: #46a3ff;
}
.sumbit:hover {
  background-color: darkblue;
}
</style>