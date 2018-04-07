<template lang="pug">
    .skill-input
        input(type="text" v-model="skillName" @keydown.enter="addNewSkill" :class="{error:validation.hasError('skillName')}")
        button(type="button" @click="addNewSkill") Сохранить
        .error-message {{validation.firstError('skillName')}}
</template>

<script>
    import {mapMutations} from 'vuex';
    import {Validator} from 'simple-vue-validator';

    export default {
        mixins: [
            require('simple-vue-validator').mixin
        ],
        validators: {
            skillName: value => {
                return Validator.value(value).required('Название не может быть пустым');
            }
        },
        data() {
            return {
                skillName: ""
            }
        },
        props: {
            type: Number,
        },
        methods: {
            ...mapMutations(['addSkill']),
            addNewSkill() {
                const newSkill = {
                    name: this.skillName,
                    id: Math.round(Math.random() * 1000000),
                    percent: 0,
                    type: this.type,
                };

                this.$validate().then(success => {
                    if (!success) return;

                    this.addSkill(newSkill);
                    this.skillName = '';
                    this.validation.reset();
                });

            }
        }
    }
</script>

<style lang="scss">
    .error {
        border: 1px solid red;
        outline: 0;
    }
</style>