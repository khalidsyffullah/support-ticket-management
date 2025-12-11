<template>
    <img v-if="name === 'white'" class="logo w-[300px] h-auto" src="/images/logo_white.png" alt="Logo">
    <img v-else class="logo w-[350px] h-auto rounded-lg" src="/images/logo.png" alt="Logo" />
</template>
<script>
export default {
    props: {
        name: String,
    },
}
</script>
