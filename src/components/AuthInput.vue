<template>
  <div class="input-wrapper">
    <label :for="id" class="input-label">{{ label }}</label>
    <div class="input-container">
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="auth-input"
        :class="{ error: error }"
      />
      <slot name="icon"></slot>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: "AuthInput",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.input-container {
  position: relative;
  width: 100%;
}

.auth-input {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.auth-input:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 4px rgba(28, 175, 75, 0.1);
}

.auth-input.error {
  border-color: var(--color-error);
}

.auth-input::placeholder {
  color: var(--color-text-muted);
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-error);
  font-size: 0.85rem;
}
</style>
