<template>
  <div class="audio" @click="hide">
    <div class="musicplayer">
      <img :src="backgroundimg" alt="" class="img" />
      <div class="vague">
        <audio
          :src="musicsrc"
          preload
          id="audio"
          loop="loop"
          @canplay="getDuration"
          @timeupdate="updateTime"
          ref="audio"
        >
          你的浏览器不支持该音乐播放
        </audio>
        <!-- 旋转 -->
        <div class="disc"></div>
        <!-- 播放控制栏 -->
        <div class="bottom">
          <div
            class="click"
            @mouseover="move"
            @mouseout="out"
            @click="divclick"
            ref="audio_divwidth"
          >
            <el-progress
              :percentage="
                parseFloat((calculateTime / calculateduration) * 100)
              "
              v-if="
                !isNaN(parseFloat((calculateTime / calculateduration) * 100))
              "
              :stroke-width="width"
              :text-inside="true"
            >
            </el-progress>
          </div>

          <p class="lyric">{{ currentTime }}/{{ duration }}</p>

          <img
            :src="src"
            alt=""
            class="musicplay"
            title="播放"
            @click="change"
          />

          <img
            src="../img/volume.png"
            alt=""
            class="musicvolume"
            title="调节音量"
            @click.stop="volume"
          />
          <img src="../img/speed.png" alt="" class="speed" title="倍速" />
        </div>
        <div class="volume" @click.stop="volume">
          <div class="block">
            <el-slider
              v-model="value"
              vertical
              :format-tooltip="tooltip"
              height="150px"
            >
            </el-slider>
          </div>
        </div>
        <!-- 歌词展示区域 -->
        <div class="lyricshow">
          <p class="nolyric">没有歌词</p>
          <p class=""></p>
        </div>

        <img
          src="../img/narrow.png"
          alt=""
          class="narrow"
          @click="narrow"
          title="缩小"
        />
        <img
          src="../img/close.png"
          alt=""
          class="close"
          title="关闭"
          @click="close"
        />
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus";
export default {
  name: "Audio",
  data() {
    return {
      show: false, //不显示音乐框
      duration: "00:00", //获取歌曲总时长
      currentTime: "00:00", //目前播放的时间
      src: require("../img/musicplay.png"), //当前播放为停止图标
      musicsrc: "", //该音乐播放地址
      backgroundimg:require("../img/avatar.jpg"),//音乐播放器背景图片
      customColor: "#409eff", //进度条颜色
      play: false, //默认暂停
      calculateTime: 0, //目前显示时间
      calculateduration: 0, //总时间
      value: 100, //音量默认值
      lyric: [], //歌词存放区域
      width: 1, //进度条宽度
    };
  },
  mounted() {
    bus.$off("resources");
    bus.$on("resources", this.datahandle);
    bus.$off("pauseing")
    bus.$on("pauseing", this.playhandle);
  },
  methods: {
    //数据处理
    datahandle(all){
      this.musicsrc  = all.Path;
    },
    playhandle(data){
      let audio = document.getElementById("audio");
      this.play = data
      if (this.play) {
        //播放
        this.src = require("../img/musicpause.png");
        audio.play();
      } else {
        //暂停
        this.src = require("../img/musicplay.png");
        audio.pause();
      }
      
    },
    //计算时间戳
    calculation(alltime) {
      let minute = parseInt(alltime / 60);
      let sec = alltime % 60;
      sec = sec.toFixed(0);
      let isM0 = ":";
      if (minute == 0) {
        minute = "00";
      } else if (minute < 10) {
        minute = "0" + minute;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return minute + isM0 + sec;
    },
    getDuration() {
      let alltime = this.$refs.audio.duration;
      this.calculateduration = alltime;
      //时间戳转换
      this.duration = this.calculation(alltime);
    },
    updateTime(e) {
      let time = e.target.currentTime;
      this.calculateTime = time;
      this.currentTime = this.calculation(time);
    },
    //点击播放还是暂停
    change() {
      let audio = document.getElementById("audio");
      this.play = !this.play;
      if (this.play) {
        //播放
        this.src = require("../img/musicpause.png");
        audio.play();
      } else {
        //暂停
        this.src = require("../img/musicplay.png");
        audio.pause();
      }
    },
    //调节音量
    volume() {
      let volume = document.getElementsByClassName("volume")[0];
      volume.style.display = "block";
    },
    hide() {
      let volume = document.getElementsByClassName("volume")[0];
      volume.style.display = "none";
    },
    tooltip(val) {
      this.$refs.audio.volume = val / 100;
    },
    close() {
      let audiodiv = document.getElementsByClassName("audio")[0];
      let audio = document.getElementById("audio");
      audiodiv.style.display = "none";
      this.src = require("../img/musicplay.png");
      audio.pause();
    },
    narrow() {
      let audiodiv = document.getElementsByClassName("audio")[0];
      audiodiv.style.display = "none";
      bus.$emit("playing",[this.play,this.backgroundimg]);
    },
    move() {
      this.width = 2;
    },
    out() {
      this.width = 1;
    },
    divclick(e) {
      let allwidth = this.$refs.audio_divwidth.offsetWidth;
      var x = e.offsetX;
      this.$refs.audio.currentTime = (this.$refs.audio.duration * x) / allwidth;
      this.calculateTime = x;
      this.calculateduration = allwidth;
    },
  },
};
</script>
<style scoped>
.musicplayer {
  position: absolute;
  height: 90%;
  width: 80%;
  left: 10%;
  top: 5%;
  background-color: black;
  overflow: hidden;
}
.img {
  position: absolute;
  height: auto;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.vague {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
#audio {
  position: relative;
  height: 10%;
  width: 100%;
}
.bottom {
  position: absolute;
  height: 11%;
  width: 100%;
  bottom: 0;
}
.musicplay {
  position: absolute;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.musicvolume {
  position: absolute;
  height: 40%;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.forward,
.after,
.speed {
  position: absolute;
  height: 40%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.forward {
  left: 40%;
}
.after {
  left: 60%;
}
.speed {
  right: 2%;
}
.lyric {
  position: absolute;
  height: 30%;
  color: #fff;
  left: 5%;
  top: 20%;
  font-size: medium;
}
.volume {
  position: absolute;
  height: 200px;
  width: 5%;
  background-color: #fff;
  bottom: 9%;
  border-radius: 30px;
  left: 78%;
  z-index: 100;
  display: none;
}
.block {
  position: absolute;
  left: 50%;
  top: 8%;
  transform: translate(-50%, 0);
}
.el-progress {
  cursor: pointer;
}
.cover {
  position: absolute;
  height: 50%;
  top: 20%;
  left: 10%;
}
.disc {
  position: absolute;
  height: 300px;
  width: 300px;
  left: 10%;
  top: 50%;
  transform: translate(0%, -50%);
  background-image: url("../img/disc.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.lyricshow {
  position: absolute;
  height: 80%;
  width: 50%;
  left: 40%;
  top: 5%;
  text-align: center;
}
.narrow,
.close {
  position: absolute;
  height: 4%;
  top: 2%;
  cursor: pointer;
}
.narrow {
  right: 4%;
}
.close {
  right: 1%;
}
.click {
  position: absolute;
  width: 100%;
}
</style>