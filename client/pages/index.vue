<template>
    <section class="section">
      <figure class="image">
        <img src="/logo.svg">
        <h2 class="subtitle">Nuxt.js + LoopBack</h2>
      </figure>
      <h1 class="title">Hello!</h1>
      <a href="/api/explorer" target="_blank" class="button is-primary">Go to the API explorer</a>
    </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Hello!'
    }
  }
}
</script>

<style lang="sass" scoped>
.section
  text-align: center
  background: none
.image
  width: 256px
  height: 256px
  margin: 2em auto
  > .subtitle
    margin-top: 1em
</style>
