<template>
  <div class="support-sec container">
    <div class="support-sec-box row flx-r justify-content-between px-5">
      <p class="support-sec--title head-secondary col-12 col-md-3">
        <!-- ما الذي نقدمه لدعمك قانونيًا؟ -->
        {{ props.secData.title }}
      </p>
      <p class="support-sec--text body-desc-secondary col-12 col-md-6">
        <!-- في الجبيري للمحاماة، قمنا ببناء نموذجاً رائداً اعتمدنا فيه على منهج
        تكاملي، جمع بين خدماتنا في كافة القضايا. من الخدمات المقدمة للمؤسسات،
        والهيئات الحكومية، والشركات، وحتى الأفراد. وذلك التزاماً بأعلى معايير
        الجودة، ومراعاةً لكامل للقوانين والأنظمة المحلية والدولية، لضمان تقديم
        حلول قانونية مبتكرة وفعّالة. -->
        {{ props.secData.desc }}
      </p>
    </div>
    <div class="support-parralax px-5 px-md-0" style="position: relative">
      <div
        class="parralax-img"
        v-for="(item, i) in props.secData.items.data.slice(0, 3)"
        :key="i"
      >
        <img
          :src="item.image.media"
          style="width: 100%; object-fit: cover; object-position: center"
          :alt="item.image.alt"
        />
        <div class="parralax-text">
          <p class="parralax-title head-secondary">الخدمات الأساسيَّة</p>
          <p class="parralax-parag body-desc-secondary">
            في الجبيري للمحاماة، شكلنا خدماتنا القانونية بما يتناسب مع احتياجات
            عملائنا، حيث وضعنا حفظ حقوقهم وحمايتهم في مقدمة أولوياتنا، في ظل
            منهج محددٍ وواضح، ورؤية موضوعية شمولية في جميع المواقف والقضايا
            المسندة إلينا.
          </p>
          <button class="read-more-btn">
            <p>اعرف المزيد</p>
            <div class="read-more-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                  stroke="black"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 12L3.67 12"
                  stroke="black"
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

      <!-- <div class="parralax-img">
        <img
          src="/src/assets/images/bg-images/parralax1.jpg"
          style="width: 100%; object-fit: cover; object-position: center"
          alt=""
        />
        <div class="parralax-text">
          <p class="parralax-title head-secondary">الخدمات الأساسيَّة</p>
          <p class="parralax-parag body-desc-secondary">
            في الجبيري للمحاماة، شكلنا خدماتنا القانونية بما يتناسب مع احتياجات
            عملائنا، حيث وضعنا حفظ حقوقهم وحمايتهم في مقدمة أولوياتنا، في ظل
            منهج محددٍ وواضح، ورؤية موضوعية شمولية في جميع المواقف والقضايا
            المسندة إلينا.
          </p>
          <button class="read-more-btn">
            <p>اعرف المزيد</p>
            <div class="read-more-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                  stroke="black"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 12L3.67 12"
                  stroke="black"
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
      <div class="parralax-img">
        <div class="parralax-img">
          <img
            src="/src/assets/images/bg-images/parralax2.jpg"
            style="width: 100%; object-fit: cover; object-position: center"
            alt=""
          />
          <div class="parralax-text">
            <p class="parralax-title head-secondary">الخدمات الأساسيَّة</p>
            <p class="parralax-parag body-desc-secondary">
              في الجبيري للمحاماة، شكلنا خدماتنا القانونية بما يتناسب مع
              احتياجات عملائنا، حيث وضعنا حفظ حقوقهم وحمايتهم في مقدمة
              أولوياتنا، في ظل منهج محددٍ وواضح، ورؤية موضوعية شمولية في جميع
              المواقف والقضايا المسندة إلينا.
            </p>
            <button class="read-more-btn">
              <p>اعرف المزيد</p>
              <div class="read-more-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                    stroke="black"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.5 12L3.67 12"
                    stroke="black"
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
      </div>
      <div class="parralax-img">
        <div class="parralax-img">
          <img
            src="/src/assets/images/bg-images/parralax3.jpg"
            style="width: 100%; object-fit: cover; object-position: center"
            alt=""
          />
          <div class="parralax-text">
            <p class="parralax-title head-secondary">الخدمات الأساسيَّة</p>
            <p class="parralax-parag body-desc-secondary">
              في الجبيري للمحاماة، شكلنا خدماتنا القانونية بما يتناسب مع
              احتياجات عملائنا، حيث وضعنا حفظ حقوقهم وحمايتهم في مقدمة
              أولوياتنا، في ظل منهج محددٍ وواضح، ورؤية موضوعية شمولية في جميع
              المواقف والقضايا المسندة إلينا.
            </p>
            <button class="read-more-btn">
              <p>اعرف المزيد</p>
              <div class="read-more-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57031 18.07L3.50031 12L9.57031 5.93001"
                    stroke="black"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.5 12L3.67 12"
                    stroke="black"
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
      </div> -->
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
