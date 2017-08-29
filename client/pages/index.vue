<template>
  <div class="container">
    <section class="section">
    <h1 class="title">
      Tests
    </h1>
    <form @submit.prevent="add()">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input type="text" name="name" v-model="test.name" placeholder="Name" class="input">
        </div>
      </div>
      <div class="field">
        <label class="label">Price</label>
        <div class="control">
          <input type="number" name="price" v-model="test.price" placeholder="Price" class="input">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-primary is-fullwidth" :class="{ loading }">Add</button>
        </div>
      </div>
    </form>
    <div class="content">
      <table class="table is-bordered is-striped is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(test, index) in tests" :key="index">
           <th>{{test.name}}</th>
           <td>{{test.price}}€</td>
           <td><button class="button is-danger is-small" @click="remove(test)"><i class="fa fa-trash"></i></button></td>
         </tr>
       </tbody>
     </table>
   </div>
 </section>
 </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    return {
      tests: await app.$axios.$get('tests')
    }
  },
  data () {
    return {
      loading: false,
      test: {
        name: null,
        price: 0
      }
    }
  },
  methods: {
    add () {
      this.loading = true
      this.$axios.post('tests', this.test).then((res) => {
        this.loading = false
        this.tests.push(res.data)
        this.test = { name: null, price: 0 }
      }).catch((res) => {
        this.loading = false
      })
    },
    remove (test) {
      this.loading = true
      this.$axios.delete(`tests/${test.id}`).then((res) => {
        this.loading = false
        this.tests.splice(this.tests.indexOf(test), 1)
      }).catch((res) => {
        this.loading = false
      })
    }
  },
  head () {
    return {
      title: 'Test'
    }
  }
}
</script>

<style lang="sass" scoped>
table
  margin-top: 2em
</style>
