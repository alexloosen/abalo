<template>
    <div class="vue-scroll-up">
        <pre v-text="$attrs"/>
    </div>
</template>

<script>
import ScrollUp from "vue-scroll-up";

export default {
    name: 'vue-scroll-up',
    components: {
        ScrollUp,
    }
}

</script>
