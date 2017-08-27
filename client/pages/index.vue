<template>
  <div class="container">
    <h1>Tests</h1>
    <div v-for="test in tests">
    {{test}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData () {
    let { data } = await axios.get('http://localhost:3000/api/tests')
    return { tests: data }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>
