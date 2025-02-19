<template>
  <div class="search-box w-100" ref="searchBox">
    <div class="inpt-box" style="position: relative">
      <input
        type="text"
        :value="modelValue"
        @focus="getAllCategory"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="$t('search.category')"
      />
      <button class="clear-btn" @click="$emit('update:modelValue', '')">
        &#x2716;
      </button>
    </div>
    <div class="drop-down" v-if="show">
      <div
        class="item fruit"
        v-for="(item, i) in filteredItems"
        :key="i"
        @click="selectItem(item)"
      >
        {{ item.title }}
      </div>
      <div class="item error" v-if="filteredItems.length === 0">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { usePageStore } from "@/stores/pagesStore";
import { storeToRefs } from "pinia";

const pageStore = usePageStore();
const { parentItems } = storeToRefs(pageStore);
const show = ref(false);
const searchBox = ref(null);

const props = defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const getAllCategory = async () => {
  show.value = true;
  await pageStore.getParentItems("blogs");
};

const filteredItems = computed(() => {
  if (!props.modelValue) return parentItems.value;
  return parentItems.value.filter((el) =>
    el.title.toLowerCase().includes(props.modelValue.toLowerCase())
  );
});

const selectItem = (item) => {
  emit("update:modelValue", item.title);
  console.log(item.id);
  show.value = false; // Close dropdown on selection
};

const handleClickOutside = (event) => {
  if (searchBox.value && !searchBox.value.contains(event.target)) {
    show.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
.clear-btn {
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
}
.item {
  padding: 10px 20px;
  color: #000;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  font-size: 12px;
  &:hover {
    background-color: #868686;
  }
}

.fruit {
  background: #ddd;
  cursor: pointer;
  margin-bottom: 5px;
  cursor: pointer;
}

.error {
  background-color: #eee;
}
</style>
