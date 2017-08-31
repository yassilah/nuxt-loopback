<template>
    <div class="section content">
    <ol>
        <li v-for="test in tests" :key="test.id">
        {{test.name}}
        </li>
    </ol>
    </div>
</template>

<script>
export default {
    async asyncData ({ app, store }) {
        return {
            tests: await app.$axios.$get('tests')
        }
    }
}
</script>
