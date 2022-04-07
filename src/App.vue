<template>
  <div id="app" >

    <Head></Head>
    <First></First>
    <Center></Center>
    <Storage></Storage>
    <Dot></Dot>
    <Loginpage></Loginpage>
    <Popup></Popup>
    <Pearsonal></Pearsonal>
    <Contact></Contact>
    <Chart></Chart>
    <Search></Search>
  </div>
</template>

<script>
import Head from './views/Head.vue'
import First from './views/First.vue'
import Center from './views/Center.vue'
import Storage from './views/Storage.vue'
import Dot from './views/Dot.vue'
import Loginpage from './views/Loginpage.vue'
import Popup from './views/Popup.vue'
import Pearsonal from './views/Pearsonal.vue'
import Contact from './views/Contact.vue'
import Chart from './views/Chart.vue'
import Search from './views/Search.vue'

export default {
  name: 'App',
  components: {
    Head,
    First,
    Center,
    Storage,
    Dot,
    Loginpage,
    Popup,
    Pearsonal,
    Contact,
    Chart,
    Search
  },
  methods:{
  
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}
</style>
