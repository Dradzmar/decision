<template>
  <input 
    :name="name" 
    :type="type" 
    :required="required"
    :class="{'filled' : filled}"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
  <label for="email">{{label}}</label>
</template>

<script>
export default {
    props: {
        type: String,
        name: String,
        label: String,
        required: Boolean,
        filled: Boolean,
        value: String
    },
};
</script>

<style>

</style>