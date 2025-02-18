<template>
  <div class="search-box">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="`${$t('search.search')} ${$t(`search.${selected.page}`)}`"
    />
    <button
      style="
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid black;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      @click="$emit('update:modelValue', '')"
    >
      &#x2716;
    </button>
    <div class="drop-down" v-if="modelValue.length">
      <div
        class="item fruit"
        v-for="(item, i) in filtered"
        :key="i"
        @click="
          $router.push({
            name: selected?.routeName,
            params: {
              blogName: item?.slug ?? selected?.slug,
              id: item?.parent?.id ?? item?.id,
            },
          })
        "
      >
        {{ item?.title }}
      </div>
      <div class="item error" v-if="filtered.length === 0">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useFilterStore } from "@/stores/filterStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  selected: { type: Object, required: true, default: {} },
  modelValue: { type: String, required: false, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const { filtered } = storeToRefs(useFilterStore());

const fetchFilteredResults = async () => {
  if (props.modelValue.length) {
    await useFilterStore().getFiltered(props.selected.page, props.modelValue);
  } else {
    filtered.value = [];
  }
};

watch(() => props.modelValue, fetchFilteredResults);
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.search-box {
  position: relative;
}

input {
  margin: 5px 0 20px;
  display: block;
  width: 100%;
  padding: 10px 45px;
  background: white url("/assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.drop-down {
  background-color: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 40rem;
  overflow-y: scroll;
  z-index: 9999 !important;
}

.item {
  padding: 10px 20px;
  color: #000;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-size: 12px;
}

.fruit {
  background: #ddd;
  cursor: pointer;
  margin-bottom: 5px;
  cursor: pointer;
}

.error {
  background-color: tomato;
}
</style>
