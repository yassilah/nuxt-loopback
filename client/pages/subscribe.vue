<template>
<div class="columns is-centered">
    <div class="column is-half is-narrow">
        <h1 class="title">Subscribe</h1>
        <form @submit.prevent="subscribe()">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="email" name="email" v-model="user.email">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" name="password" v-model="user.password">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button type="submit" class="button is-primary is-fullwidth">Subscribe</button>
                </div>
            </div>
            <div class="message" :class="response.type ? 'is-info' : 'is-danger'" v-if="response">
                <div class="message-header">
                    <p>Subscribe</p>
                    <button class="delete" aria-label="delete" @click="response = null"></button>
                </div>
                <div class="message-body">
                    {{response.text}}
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                email: null,
                password: null
            },
            response: null
        }
    },
    methods: {
        subscribe () {
            this.$axios.post('Users', this.user)
            .then((res) => {
                this.response = {
                    type: true,
                    text: `You've successfully subscribed!`
                }
            })
            .catch((err) => {
                this.response = {
                    type: false,
                    text: `There was an error. ${err}`
                }
            })
        }
    }
}
</script>
