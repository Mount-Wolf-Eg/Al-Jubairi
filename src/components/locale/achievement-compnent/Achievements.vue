<template>
  <div class="achievements-sec">
    <p class="achievements-sec--title head-secondary text-center">
      {{ $t("title.numbers") }}
    </p>
    <div class="achievements container mx-auto row">
      <div class="achieve-col col-3 my-auto">
        <div class="achieve"></div>
        <div class="achieve">
          <img
            class="sv-icon"
            style="
              width: 6rem;
              height: 6rem;
              object-fit: contain;
              object-position: calc();
            "
            src="/src/assets/images/achieve/achieve2.png"
            alt="achieve-img"
          />
          <p class="achieve--num head-secondary">130,000</p>
          <p class="achieve-text">
            {{ $t("achieve.hour") }}
          </p>
        </div>
        <div class="achieve">
          <img
            class="sv-icon"
            style="
              width: 6rem;
              height: 6rem;
              object-fit: contain;
              object-position: calc();
            "
            src="/src/assets/images/achieve/achieve7.png"
            alt="achieve-img"
          />

          <p class="achieve--num head-secondary">345,600</p>
          <p class="achieve-text">
            {{ $t("achieve.training") }}
          </p>
        </div>
        <div class="achieve"></div>
      </div>
      <div class="achieve-col col-6">
        <div class="d-flex flex-row">
          <div class="achieve">
            <img
              class="sv-icon"
              style="
                width: 6rem;
                height: 6rem;
                object-fit: contain;
                object-position: calc();
              "
              src="/src/assets/images/achieve/achieve8.png"
              alt="achieve-img"
            />

            <p class="achieve--num head-secondary">4 {{ $t("achieve.mil") }}</p>
            <p class="achieve-text">
              {{ $t("achieve.case") }}
            </p>
          </div>
          <div class="achieve">
            <img
              class="sv-icon"
              style="
                width: 6rem;
                height: 6rem;
                object-fit: contain;
                object-position: calc();
              "
              src="/src/assets/images/achieve/achieve1.png"
              alt="achieve-img"
            />

            <p class="achieve--num head-secondary">98.6%</p>
            <p class="achieve-text">
              {{ $t("achieve.success") }}
            </p>
          </div>
        </div>
        <div class="d-flex flex-row" style="border: 1px solid #fff">
          <div class="achieve ach-icon">
            <svg
              style="width: 13.9rem; height: 21.9rem"
              viewBox="0 0 139 219"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_840_19420)">
                <path
                  d="M122.526 72.4578L71.9256 29.0484C71.9256 29.0484 66.1289 23.9491 64.135 21.5956C62.5006 19.6779 59.6568 16.3874 59.3844 12.1597C59.1446 8.54229 60.9207 5.60039 63.4376 1.76502L64.3311 0.544678H58.4909L49.2185 13.2166C49.2185 13.2166 36.4375 30.77 51.049 43.333L75.543 64.4057L75.6738 64.5146C74.5188 64.7108 73.7452 64.8524 73.7452 64.8524C67.9159 65.9311 61.8141 68.2193 56.9001 71.5643L46.4073 62.5752C46.4073 62.5752 42.1252 58.8923 38.4206 54.7083C35.9581 51.9299 32.5695 47.8657 35.7402 40.5981C36.3286 39.247 37.2003 37.9177 38.1482 36.4358L34.607 33.2651L24.3213 47.2882C24.3213 47.2882 11.5404 64.8524 26.1518 77.4263L38.9654 88.5075C37.7124 90.0002 37.0259 90.9591 37.0259 90.9591L31.0658 99.131C31.0658 99.131 23.6348 110.278 25.814 122.459C26.4133 125.848 28.7777 135.088 40.8177 145.439L71.0212 171.393L77.7985 162.033C85.1641 150.93 77.2755 144.414 77.2755 144.414L49.0877 120.204C49.0877 120.204 32.5913 106.017 41.0683 94.424C41.5368 93.6177 42.2669 92.7896 43.0949 91.9615L50.6676 98.4881L87.7029 130.272C87.7029 130.272 107.01 146.975 90.6883 169.377L71.8493 195.266L24.245 154.286C24.245 154.286 10.1348 142.159 16.2256 128.517L12.6299 125.336L5.86358 134.619C5.86358 134.619 -1.21877 144.36 0.960412 156.553C1.55969 159.919 3.9241 169.181 15.975 179.532L61.1059 218.354H62.2391L97.324 170.063L105.365 159.015C105.365 159.015 109.201 153.785 111.489 147.454C114.943 137.877 115.335 121.762 97.6508 106.54L68.8202 81.8174C91.2005 78.9844 104.722 89.4881 106.803 91.2423L107.098 91.5038H107.108L112.546 96.1782C112.546 96.1782 132.681 113.503 118.527 132.941L122.178 135.97L130.219 124.933C130.219 124.933 134.043 119.681 136.342 113.361C139.796 103.784 140.189 87.6685 122.494 72.4469L122.526 72.4578ZM91.3312 203.536L108.841 218.365H110.029L124.357 200.637L105.747 185.143L91.3421 203.536H91.3312Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
              </g>
              <defs>
                <clipPath id="clip0_840_19420">
                  <rect width="138.792" height="218.91" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div class="d-flex flex-row">
          <div class="achieve">
            <img
              class="sv-icon"
              style="
                width: 6rem;
                height: 6rem;
                object-fit: contain;
                object-position: calc();
              "
              src="/src/assets/images/achieve/achieve6.png"
              alt="achieve-img"
            />
            <p class="achieve--num head-secondary">114,000</p>
            <p class="achieve-text">
              {{ $t("achieve.colledge") }}
            </p>
          </div>
          <div class="achieve">
            <img
              class="sv-icon"
              style="
                width: 6rem;
                height: 6rem;
                object-fit: contain;
                object-position: calc();
              "
              src="/src/assets/images/achieve/achieve5.png"
              alt="achieve-img"
            />
            <p class="achieve--num head-secondary">50</p>
            <p class="achieve-text">
              {{ $t("achieve.lawyer") }}
            </p>
          </div>
        </div>
      </div>
      <div class="achieve-col col-3 my-auto">
        <div class="achieve"></div>
        <div class="achieve">
          <img
            class="sv-icon"
            style="
              width: 6rem;
              height: 6rem;
              object-fit: contain;
              object-position: calc();
            "
            src="/src/assets/images/achieve/achieve3.png"
            alt="achieve-img"
          />
          <p class="achieve--num head-secondary">80</p>
          <p class="achieve-text">
            {{ $t("achieve.global") }}
          </p>
        </div>
        <div class="achieve">
          <img
            class="sv-icon"
            style="
              width: 6rem;
              height: 6rem;
              object-fit: contain;
              object-position: calc();
            "
            src="/src/assets/images/achieve/achieve4.png"
            alt="achieve-img"
          />
          <p class="achieve--num head-secondary">300</p>
          <p class="achieve-text">
            {{ $t("achieve.colled-train") }}
          </p>
        </div>
        <div class="achieve"></div>
      </div>
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
