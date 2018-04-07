<template lang="pug">
    .skills-list
        .skill-title {{skillType}}
        table
            skills-item(
                v-for="skill in skills"
                v-if="checkSkillType(skillType) === skill.type"
                :key="skill.id"
                :skill="skill"
            )
        skill-input(
            :type="checkSkillType(skillType)"
        )
        br
        hr
</template>
<script>
    import skillsItem from "./skillsItem.vue"
    import skillInput from "./skillInput.vue"

    export default {
        components: {
            skillsItem, skillInput
        },
        props: {
            skills: Array,
            skillType: String
        },
        methods: {
            checkSkillType(skillGroupName) {
                switch (skillGroupName) {
                    case 'frontend' :
                        return 1;
                    case 'workflow' :
                        return 2;
                    case 'backend' :
                        return 3;
                }
            }
        }
    }
</script>