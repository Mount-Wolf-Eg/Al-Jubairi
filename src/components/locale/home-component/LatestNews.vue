<template>
  <div class="latest-news-sec container">
    <p class="latest-news-sec--title head-secondary text-center">
      {{ props.secData.title }}
      <!-- أحدث الأخبار والنصائح القانونية -->
    </p>
    <div
      class="latest-news-box d-flex flex-column flex-md-row justify-content-between align-items-center gap-5 px-5 px-md-0"
    >
      <div
        style="flex: 1"
        class="flex-r w-100 align-items-center justify-content-center"
      >
        <img
          loading="lazy"
          :src="props.secData?.items?.data[0]?.image.media"
          style="
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center;
          "
          :alt="props.secData?.items?.data[0]?.image.alt"
        />
        <!-- <img       loading="lazy"

          src="/src/assets/images/sm-images/Whatnew.png"
          style="
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center;
          "
          alt=""
        /> -->
      </div>
      <div
        class="latest-news-text mt-auto flx-c align-items-start justify-content-end"
        style="flex: 1"
      >
        <p class="date">
          <!-- 2 أبريل 2025 -->

          {{
            moment(new Date(props.secData?.items?.data[0]?.created_at)).format(
              "LL"
            )
          }}
        </p>
        <p class="latest-news-text--title">
          <!-- كيف تسجل علامتك التجارية في المملكة -->
          {{ props.secData?.items?.data[0]?.title }}
        </p>
        <p class="latest-news-text--parag">
          {{ props.secData?.items?.data[0]?.desc }}
          <!-- يتبادر إلى الأذهان تساؤلًا مهما بشأن العلامات التجارية وهو ما هي
          العلامة التجارية؟ وكيفية تسجيلها داخل المملكة العربية السعودية؟ وهل
          تتمتع بحماية قانونية؟ قبل الإجابة على هذا السؤال، يجب أن نعرف أن الجهة
          المعنية بتسجيل علامتك التجارية هي الهيئة السعودية للملكية الفكرية
          والتي نشأت حديثا في عام 1439 هـ، وكان عدد العلامات التجارية المسجلة في
          العام الماضي 2023 هو (28038) علامة تجارية وفق الموقع الرسمي للهيئة
          السعودية للملكية الفكرية. -->
        </p>
        <a href="#" class="latest-news--link">إقرأ المزيد</a>
      </div>
    </div>
    <button
      style="align-self: flex-start !important"
      class="read-more-btn py-3 py-md-5 px-5 px-md-0"
    >
      <p style="color: var(--col-dark) !important">عرض جميع الأخبار</p>
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
</template>

<script setup>
import { onMounted } from "vue";
import moment from "moment";
import "moment/locale/ar";

moment.locale("ar");

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
