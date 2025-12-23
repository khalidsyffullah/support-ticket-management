<template>
    <div class="flex items-center">
        <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input :id="id" type="checkbox" :checked="modelValue" @input="$emit('update:modelValue', $event.target.checked)" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
            <label :for="id" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default() {
                return `switch-input-${Math.random().toString(36).substring(2, 9)}`
            },
        },
        modelValue: Boolean,
        label: String,
    },
    emits: ['update:modelValue'],
}
</script>

<style scoped>
.toggle-checkbox:checked {
    right: 0;
    border-color: #68D391;
}
.toggle-checkbox:checked + .toggle-label {
    background-color: #68D391;
}
</style>
