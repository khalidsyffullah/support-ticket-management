<template>
  <div>
    <div class="relative">
      <text-input
        :model-value="modelValue"
        @update:model-value="onInput"
        :label="label"
        :type="showPassword ? 'text' : 'password'"
        :is_required="is_required"
        :error="error"
      />
      <button type="button" @click="toggleShowPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
        <svg v-if="showPassword" class="h-6 w-6" style="margin-top: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
        <svg v-else class="h-6 w-6" style="margin-top: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 .926 0 1.828.148 2.68.42m3.398 3.398A10.02 10.02 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.02 10.02 0 015.39-5.39m0 0l-3.398-3.398m3.398 3.398L21 21"></path></svg>
      </button>
    </div>
    <div class="mt-2">
      <div class="h-2 bg-gray-200 rounded-full">
        <div class="h-2 rounded-full" :class="strengthColor" :style="{ width: strengthWidth }"></div>
      </div>
      <p class="text-sm mt-1" :class="strengthTextColor">{{ strengthText }}</p>
    </div>
    <ul class="text-sm mt-1 text-gray-500">
        <li :class="{ 'text-green-500': hasMinLength }">- At least 10 characters</li>
        <li :class="{ 'text-green-500': hasLowercase }">- A lowercase letter</li>
        <li :class="{ 'text-green-500': hasUppercase }">- An uppercase letter</li>
        <li :class="{ 'text-green-500': hasNumber }">- A number</li>
        <li :class="{ 'text-green-500': hasSpecialChar }">- A special character</li>
    </ul>
    <button type="button" @click="generatePassword" class="text-sm text-indigo-600 hover:text-indigo-900">Generate Strong Password</button>
  </div>
</template>

<script>
import TextInput from '@/Shared/TextInput.vue'

export default {
  components: { TextInput },
  props: {
    modelValue: String,
    label: String,
    is_required: Boolean,
    error: String,
  },
  data() {
    return {
      showPassword: false,
      strength: 0,
      hasMinLength: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    }
  },
  computed: {
    strengthColor() {
      if (this.strength < 3) return 'bg-red-500'
      if (this.strength < 4) return 'bg-yellow-500'
      return 'bg-green-500'
    },
    strengthWidth() {
      return `${(this.strength / 4) * 100}%`
    },
    strengthText() {
      if (this.strength < 3) return 'Weak'
      if (this.strength < 4) return 'Medium'
      return 'Strong'
    },
    strengthTextColor() {
      if (this.strength < 3) return 'text-red-500'
      if (this.strength < 4) return 'text-yellow-500'
      return 'text-green-500'
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    onInput(value) {
      this.$emit('update:modelValue', value)
      this.calculateStrength(value)
    },
    calculateStrength(password) {
        this.hasMinLength = password.length >= 10;
        this.hasLowercase = password.match(/[a-z]/) !== null;
        this.hasUppercase = password.match(/[A-Z]/) !== null;
        this.hasNumber = password.match(/[0-9]/) !== null;
        this.hasSpecialChar = password.match(/[^a-zA-Z0-9]/) !== null;

        let strength = 0
        if (this.hasMinLength) strength++
        if (this.hasLowercase) strength++
        if (this.hasUppercase) strength++
        if (this.hasNumber) strength++
        if (this.hasSpecialChar) strength++
        this.strength = strength > 4 ? 4 : strength;
        this.$emit('strength', this.strengthText);
    },
    generatePassword() {
      const length = 12;
      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numberChars = '0123456789';
      const specialChars = '!@#$%^&*()_+';
      const allChars = lowerCaseChars + upperCaseChars + numberChars + specialChars;

      let password = '';
      password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
      password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
      password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
      password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

      for (let i = 0, n = allChars.length; i < length - 4; ++i) {
          password += allChars.charAt(Math.floor(Math.random() * n));
      }

      // Shuffle the password to randomize the order of the characters
      password = password.split('').sort(() => 0.5 - Math.random()).join('');

      this.onInput(password);
    },
  },
}
</script>
