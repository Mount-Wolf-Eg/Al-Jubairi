<template>
  <div class="inpt-box">
    <Multiselect
      :searchable="true"
      :placeholder="props.select.placeholder"
      v-model="formData"
      :label="props.select.label"
      :valueProp="props.select.valueProp"
      :options="props.select.options"
      style="width: 50%"
      taggable="true"
      :mode="props.select.mode"
      group="false"
      @clear="props.select.clear"
      @change="props.select.change"
      :class="appear"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import Multiselect from "@vueform/multiselect";

const props = defineProps({
  select: {
    type: Object,
    required: true,
    defalut: () => ({}),
  },
  appear: {
    type: String,
    required: false,
    default: "",
  },
});

const formData = ref("");
</script>

<style lang="scss" scoped>
.inpt-box {
  margin: 2rem 0;
  .multiselect {
    margin: 0 !important;
    padding: 1.5rem 1rem !important;
    border-radius: var(--brd-radius) !important;
    width: 100% !important;
    border: 1px solid var(--col-text);
  }
  .multiselect-dropdown {
    border-radius: var(--brd-radius) !important;
  }
}
</style>
<!-- mode => 'single'|'multiple'|'tags'.
      groups =>true , false 
      change: (val) => {
    if (val) action;
  },
  clear: async () => {
    await action();
  },
      -->
