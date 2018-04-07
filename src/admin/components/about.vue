<template lang="pug">
    .about-section
        h1 Страница "Обо мне"
        skills-list(
            v-for="skillType in skillsTypes"
            :skillType="skillType"
            :key="skillType"
            :skills="skills"
        )
</template>
<script>
    import { mapActions, mapGetters } from "vuex";
    import skillsList from "./skillsList.vue";

    export default {
        components: {
            skillsList
        },
        data() {
            return {
                skillsTypes: ["frontend", "workflow", "backend"]
            }
        },
        mounted() {
            this.fetchSkills();
        },
        computed: {
            ...mapGetters(['skills']),
        },
        methods: {
            ...mapActions(['fetchSkills']),
        }
       /* data() {
            return {
                skillsTypes: ["frontend", "workflow", "backend"]
            };
        },
        computed: {
            ...mapGetters(['skills'])
        },
        methods: {
            ...mapActions(['fetchSkills'])
        },
        mounted() {
            this.fetchSkills();
        }*/
    };
</script>