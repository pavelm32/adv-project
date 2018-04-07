<template lang="pug">
    tr
        td  {{skill.name}}
        td
            input(type="text" :value="skill.percents")
        td
            button(type="button" @click="removeExistedSkill(skill.id)") Удалить
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        props: {
            skill: Object
        },
        methods: {
            ...mapMutations(['removeSkill']),
            removeExistedSkill(skillId) {
                this.removeSkill(skillId);
            }
        }
    }

</script>