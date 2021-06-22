<template>
  <div class="circular" v-if="type == 'radial'">
    <circle-progress
      v-if="state.percent < 99"
      :size="85"
      :border-width="5"
      :border-bg-width="3"
      :is-gradient="true"
      :gradient="{
        angle: 90,
        startColor: state.gradient.startColor,
        stopColor: state.gradient.stopColor,
      }"
      :data-value="state.percent"
      :percent="state.percent"
      :key="new Date()"
    />
    <div class="full-percentage" v-else>
      <svg
        width="40"
        height="30"
        viewBox="0 0 40 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.4143 0.598279C38.6333 -0.199426 37.367 -0.199426 36.5858 0.598279L12.6246 25.0693L3.41426 15.6632C2.63324 14.8655 1.36699 14.8655 0.58582 15.6632C-0.195273 16.4608 -0.195273 17.754 0.58582 18.5517L11.2104 29.402C11.9911 30.1996 13.2583 30.1991 14.0388 29.402L39.4143 3.48687C40.1954 2.68924 40.1953 1.39598 39.4143 0.598279Z"
          fill="white"
        />
      </svg>
    </div>
  </div>

  <div v-else-if="type == 'linear'">
    <div class="linear-progress">
      <div class="legend" :style="`left: ${state.gradient.width}%; `">
        <svg
          width="55"
          height="50"
          viewBox="0 0 55 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.3676 0H6.00417C2.79561 0 0.185669 2.41661 0.185669 5.3875V34.1217C0.185669 37.0922 2.79561 39.5088 6.00417 39.5088H19.43L23.8762 47.7428C24.6507 49.1772 25.857 50 27.1857 50C28.5143 50 29.7206 49.1772 30.4952 47.7428L34.9417 39.5088H48.3676C51.5757 39.5088 54.1857 37.0922 54.1857 34.1217V5.3875C54.1857 2.41661 51.5757 0 48.3676 0ZM51.0216 34.1217C51.0216 35.4767 49.831 36.5791 48.3676 36.5791H33.9641C33.3647 36.5791 32.8171 36.8927 32.5489 37.389L27.6652 46.4325C27.4683 46.7972 27.2833 46.9765 27.1857 47.0451C27.088 46.9765 26.903 46.7972 26.7061 46.4325L21.8224 37.389C21.5546 36.8927 21.0067 36.5791 20.4077 36.5791H6.00417C4.54037 36.5791 3.34973 35.4767 3.34973 34.1217V5.3875C3.34973 4.03213 4.54037 2.92969 6.00417 2.92969H48.3676C49.831 2.92969 51.0216 4.03213 51.0216 5.3875V34.1217Z"
            :fill="state.gradient.startColor"
          />
        </svg>
        <span style="font-weight: bold"
          >{{ state.percent
          }}<span style="font-weight: normal; font-size: 14px">%</span></span
        >
      </div>
      <div
        class="progress"
        :style="`
          width: ${state.gradient.width}%; 
          background: linear-gradient(90deg, ${state.gradient.startColor} 23.39%, ${state.gradient.stopColor} 80.15%);
        `"
      ></div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import CircleProgress from "vue3-circle-progress";
export default {
  components: { CircleProgress },
  props: {
    profile: Object,
    type: String,
  },
  setup(props) {
    const state = reactive({
      percent: props.profile.percentage,
      gradient: {
        startColor: "",
        stopColor: "",
        width: "0",
      },
    });

    onMounted(() => gradientConfig(state));

    const gradientConfig = (state) => {
      switch (true) {
        case state.percent < 45:
          state.gradient.startColor = "#DD1A00";
          state.gradient.stopColor = "#FF725F";
          break;
        case state.percent > 45 && state.percent < 65:
          state.gradient.startColor = "#EABF27";
          state.gradient.stopColor = "#F8DB78";
          break;
        case state.percent > 65:
          state.gradient.startColor = "#00A98C";
          state.gradient.stopColor = "#00CF6A";
          break;
      }
      setTimeout(() => {
        state.gradient.width = state.percent;
      }, 0);
    };

    return { state };
  },
};
</script>

<style lang="scss">
.circular {
  position: absolute !important;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  height: 100%;
}
.full-percentage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 130px;
  background: linear-gradient(180deg, #00a58f 0%, #00d069 100%);
  box-shadow: 0px 10px 15px rgba(145, 145, 145, 0.1);
  border-radius: 0px 20px 20px 0px;
  svg {
    margin-left: 24px;
  }
  &:before {
    position: absolute;
    content: "";
    left: -30px;
    height: 100%;
    width: 50px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.17) 9%,
      white 60%
    );
    border-radius: 0px 20px 20px 0px;
  }
}
.vue3-circular-progressbar {
  background: white;
  position: relative;
  transform: scale(-1, 1);
  margin-right: 40px;
  &:before {
    position: absolute;
    content: "";
    left: 70px;
    height: 100%;
    width: 50px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.17) 9%,
      white 60%
    );
    border-radius: 0px 20px 20px 0px;
    transform: scale(-1, 1);
  }
  &:after {
    content: attr(data-value);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(-1, 1) translateX(50%) translateY(-50%);
    font-family: "Open Sans", sans-serif;
    font-weight: bold;
    font-size: 22px;
    line-height: 21px;
    color: #333;
  }
}
.linear-progress {
  position: relative;
  display: block;
  width: 100%;
  height: 20px;
  border-radius: 20px;
  background: rgba(0, 201, 111, 0.2);
  .legend {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    transition: all 1s ease;
    width: 54px;
    height: 50px;
    bottom: calc(100% + 5px);
    transform: translateX(calc(-50% - 5px));
    padding-bottom: 10px;
    animation: 2s fadeIn;
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .progress {
    position: absolute;
    overflow: hidden;
    left: 0;
    height: 100%;
    border-radius: 20px;
    width: 0;
    transition: width 1s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
