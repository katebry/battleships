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
body {
  background-color: #ddd;
}
</style>
