<template>
  <div class="smallaudio">
    <div class="circle" @click="showbigaudio">
      <img :src="circleimg" alt="" />
    </div>
    <div class="videoplay">
      <img src="" alt="" class="el-icon-video-pause" id="smallaudiobtn" @click="smallaudiobtn" />
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus";
export default {
  name: "Smallaudio",
  data() {
    return {
      play: true,
      circleimg:""
    };
  },
  mounted(){
      bus.$off("playing")
      bus.$on("playing",this.handledata)
  },
  methods: {
      handledata(data){
          document.getElementsByClassName("smallaudiodiv")[0].style.display = 'block'
          this.play = !data[0];
          this.circleimg = data[1];
          this.smallaudiobtn();
          
      },
    smallaudiobtn() {
      let audio = document.getElementById("audio");
      let icon = document.getElementById("smallaudiobtn");
      if (this.play) {
        //播放
        icon.classList.remove("el-icon-video-pause")
        icon.classList.add("el-icon-video-play")
        audio.pause();

      } else {
        //暂停
        icon.classList.remove("el-icon-video-play")
        icon.classList.add("el-icon-video-pause")
        audio.play();
      }
      this.play = !this.play;
    },
    showbigaudio(){
        document.getElementsByClassName("smallaudiodiv")[0].style.display = 'none'
        document.getElementsByClassName("audiodiv")[0].style.display = 'block'
        bus.$emit("pauseing",this.play)
    }
  },
};
</script>
<style scoped>
.el-icon-loading {
  position: absolute;
  top: 5%;
  left: 45%;
}
.circle {
  position: absolute;
  top: 10%;
  left: 5%;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50px;
  background-color: aquamarine;
}
.circle img {
  position: absolute;
  height: 100%;
  width: 100%;
}
.videoplay {
  font-size: 50px;
}
.el-icon-video-play,
.el-icon-video-pause {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
</style>