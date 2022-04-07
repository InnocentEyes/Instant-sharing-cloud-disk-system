<template>
  <!-- 视频播放器组件 -->
  <div class="video" @click="hide" v-show="false">
    <img src="../img/close.png" class="close" @click="close" />
    <video
      :src="src"
      preload
      id="video"
      class="center"
      @timeupdate="updateTime"
      @canplay="getDuration"
      ref="video"
      loop="loop"
    ></video>
    <div class="video_volume" @click.stop="volume">
      <div class="block">
        <el-slider
          v-model="value"
          vertical
          height="150px"
          :format-tooltip="tooltip"
        >
        </el-slider>
      </div>
    </div>
    <div class="bottom">
      <div
        @mouseover="move"
        @mouseout="out"
        @click="divclick"
        class="click"
        ref="divwidth"
      >
        <el-progress
          color="#409eff"
          :text-inside="true"
          :stroke-width="width"
          :percentage="parseFloat((calculateTime / calculateduration) * 100)"
          v-if="!isNaN(parseFloat((calculateTime / calculateduration) * 100))"
        ></el-progress>
      </div>
      <img :src="iconsrc" @click="change" class="musicplay" />
      <p class="time">{{ currentTime }}/{{ getduration }}</p>
      <img
        src="../img/volume.png"
        class="videovolume"
        title="调节音量"
        @click.stop="volume"
      />
      <img src="../img/speed.png" alt="" class="speed" title="倍速" />
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus";

export default {
  name: "Video",
  data() {
    return {
      //视频播放资源
      src: "",
      //当前播放为停止图标
      iconsrc: require("../img/musicplay.png"),
      //当前是否为播放，默认为false
      play: false,
      //视频播放总时长
      getduration: "00:00",
      calculateduration: 0,
      //视频播放显示当前时间
      currentTime: "00:00",
      calculateTime: 0,
      //默认音量值
      value: 100,
      //进度条宽度
      width: 1,
    };
  },
  mounted() {
    bus.$off("VideoResources");
    bus.$on("VideoResources", this.datahandle);
  },

  methods: {
    
    datahandle(all) {
      this.src = all.Path;
    },
    updateTime() {
      let s = this.$refs.video.currentTime; //获取当前播放时间
      this.calculateTime = s;
      this.currentTime = this.calculation(s);
    },
    getDuration() {
      let s = this.$refs.video.duration; //获取视频的总时长
      this.calculateduration = s;
      this.getduration = this.calculation(s);
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
    change() {
      let video = document.getElementById("video");
      if (this.play) {
        this.iconsrc = require("../img/musicplay.png");
        video.pause();
      } else {
        video.play();
        this.iconsrc = require("../img/musicpause.png");
      }
      this.play = !this.play;
    },
    tooltip(val) {
      this.$refs.video.volume = val / 100;
    },
    hide() {
      let video_volume = document.getElementsByClassName("video_volume")[0];
      video_volume.style.display = "none";
    },
    volume() {
      let video_volume = document.getElementsByClassName("video_volume")[0];
      video_volume.style.display = "block";
    },
    move() {
      this.width = 3;
    },
    out() {
      this.width = 1;
    },
    divclick(e) {
      let allwidth = this.$refs.divwidth.offsetWidth;
      var x = e.offsetX;
      this.$refs.video.currentTime = (this.$refs.video.duration * x) / allwidth;
      this.calculateTime = x;
      this.calculateduration = allwidth;
    },
    close() {
      let video = document.getElementById("video");
      this.iconsrc = require("../img/musicplay.png");
      video.pause();
      let videodiv = document.getElementsByClassName("videodiv")[0];
      videodiv.style.display = "none";
    },
  },
};
</script>
<style scoped>
.center {
  position: absolute;
  height: 90%;
  width: 80%;
  top: 5%;
  left: 10%;
  background-color: black;
}
.bottom {
  position: absolute;
  height: 7%;
  width: 80%;
  left: 10%;
  bottom: 5%;
}
.musicplay {
  position: absolute;
  height: 60%;
  top: 60%;
  left: 4%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.time {
  position: absolute;
  margin: 0;
  left: 12%;
  top: 60%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.video_volume {
  position: absolute;
  height: 200px;
  width: 5%;
  background-color: #fff;
  bottom: 12%;
  border-radius: 30px;
  left: 71%;
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

.speed {
  position: absolute;
  top: 60%;
  right: 2%;
  height: 40%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.videovolume {
  position: absolute;
  height: 40%;
  top: 60%;
  left: 80%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.click {
  position: absolute;
  width: 100%;
}
.close {
  position: absolute;
  height: 40px;
  right: 10%;
  top: 5%;
  cursor: pointer;
  z-index: 1;
}
</style>