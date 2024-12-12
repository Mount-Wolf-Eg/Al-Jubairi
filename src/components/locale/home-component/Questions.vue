<template>
  <div class="questions-sec px-5 px-md-0">
    <p class="questions-sec--title head-secondary text-center">
      <!-- بعض الأسئلة القانونية المتكررة وإجاباتها -->
      {{ props.secData.title }}
    </p>
    <div class="container">
      <div class="accordion" id="accordionExample">
        <div
          class="accordion-item"
          v-for="(item, i) in props.secData.items.data"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse${i}`"
              aria-expanded="true"
              :aria-controls="`collapse${i}`"
            >
              {{ item.title }}
              <!-- كيف تقدم الاستشارة القانونية؟ -->
            </button>
          </h2>
          <div
            :id="`collapse${i}`"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              {{ item.description }}
              <!-- - الاستشارة القانونيَّة: تعني طلب الحصول على الرأي القانوني، فيما
              يتعلق بمسألة موضوع خلاف أو نزاع معين؛ من أجل بيان وجهة نظر القانون
              في المسألة القانونيَّة، أو النزاع الذي تم عرضه على القضاء أو سيعرض
              عليه مُستقبلًا، وذلك بهدف ضمان حقوق كافة الأطراف. - دراسة القضية:
              تقدم الخدمة للعميل -سواء أكان فردًا أم شركة -، مستنداً شاملاً
              لتفاصيل القضية وجوانبها والجهة المعنيَّة بها، إضافة إلى الموقف
              القانوني في القضية؛ في سبيل التمهيد لأيسر الطرق وإتاحة اتخاذ أفضل
              الخيارات التي توفر على العميل عناء البحث وتكاليف الأخطاء المحتملة
              في تكييف الدعوى. -->
            </div>
          </div>
        </div>

        <!-- <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              كيف تقدم الاستشارة القانونية؟
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              - الاستشارة القانونيَّة: تعني طلب الحصول على الرأي القانوني، فيما
              يتعلق بمسألة موضوع خلاف أو نزاع معين؛ من أجل بيان وجهة نظر القانون
              في المسألة القانونيَّة، أو النزاع الذي تم عرضه على القضاء أو سيعرض
              عليه مُستقبلًا، وذلك بهدف ضمان حقوق كافة الأطراف. - دراسة القضية:
              تقدم الخدمة للعميل -سواء أكان فردًا أم شركة -، مستنداً شاملاً
              لتفاصيل القضية وجوانبها والجهة المعنيَّة بها، إضافة إلى الموقف
              القانوني في القضية؛ في سبيل التمهيد لأيسر الطرق وإتاحة اتخاذ أفضل
              الخيارات التي توفر على العميل عناء البحث وتكاليف الأخطاء المحتملة
              في تكييف الدعوى.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              كيف تقدم الاستشارة القانونية؟
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              - الاستشارة القانونيَّة: تعني طلب الحصول على الرأي القانوني، فيما
              يتعلق بمسألة موضوع خلاف أو نزاع معين؛ من أجل بيان وجهة نظر القانون
              في المسألة القانونيَّة، أو النزاع الذي تم عرضه على القضاء أو سيعرض
              عليه مُستقبلًا، وذلك بهدف ضمان حقوق كافة الأطراف. - دراسة القضية:
              تقدم الخدمة للعميل -سواء أكان فردًا أم شركة -، مستنداً شاملاً
              لتفاصيل القضية وجوانبها والجهة المعنيَّة بها، إضافة إلى الموقف
              القانوني في القضية؛ في سبيل التمهيد لأيسر الطرق وإتاحة اتخاذ أفضل
              الخيارات التي توفر على العميل عناء البحث وتكاليف الأخطاء المحتملة
              في تكييف الدعوى.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              كيف تقدم الاستشارة القانونية؟
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              - الاستشارة القانونيَّة: تعني طلب الحصول على الرأي القانوني، فيما
              يتعلق بمسألة موضوع خلاف أو نزاع معين؛ من أجل بيان وجهة نظر القانون
              في المسألة القانونيَّة، أو النزاع الذي تم عرضه على القضاء أو سيعرض
              عليه مُستقبلًا، وذلك بهدف ضمان حقوق كافة الأطراف. - دراسة القضية:
              تقدم الخدمة للعميل -سواء أكان فردًا أم شركة -، مستنداً شاملاً
              لتفاصيل القضية وجوانبها والجهة المعنيَّة بها، إضافة إلى الموقف
              القانوني في القضية؛ في سبيل التمهيد لأيسر الطرق وإتاحة اتخاذ أفضل
              الخيارات التي توفر على العميل عناء البحث وتكاليف الأخطاء المحتملة
              في تكييف الدعوى.
            </div>
          </div>
        </div> -->
      </div>
      <button class="read-more-btn my-3 my-md-5">
        <p style="color: var(--col-dark)">اعرف المزيد</p>
        <div
          class="read-more-icon"
          style="background-color: var(--col-dark) !important"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20.5 12L3.67 12"
              stroke="white"
              stroke-width="2"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  secData: {
    type: Object,
    default: () => {
      return {};
    },
    Required: false,
  },
});
</script>

<style lang="scss" scoped></style>
