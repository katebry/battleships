<template>
  <div id="app">
    <BlockGame/>
  </div>
</template>

<script>
import BlockGame from './BlockGame.vue'

export default {
  name: 'App',
  components: {
    BlockGame
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

* {
  font-family: 'Noto Sans', sans-serif;
}

body {
  background-color: #60435F;
}
</style>
