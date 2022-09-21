<template>
  <div class="notification">
    <div v-show="notificationStore.showNotification" :class="`alert alert-${notificationStore.getCurrentNotificationColor}`">
      <div>
        <Icon
          :name="iconName"
          :class="{'animate-spin': notificationStore.showProgress}"
        />
        <span>{{ notificationStore.getCurrentNotificationContent }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification"

const notificationStore = useNotificationStore()

const colorToIconName = () => {
  switch (notificationStore.getCurrentNotificationColor) {
  case "success":
    return "tick"
  case "warning":
    return "exclamation"
  case "error":
    return "x"
  default:
    return "info"
  }
}

const iconName = computed(() => notificationStore.showProgress
  // if show progress, then loader icon
  // else get icon name from color
  ? "teenyicons:loader-outline"
  : `teenyicons:${colorToIconName()}-circle-outline`
)
</script>

<style lang="scss">
  .notification {
    @apply p-3 lg:p-8 absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2;

    .alert {
      @apply shadow-lg;
    }

    // need to have these empty classes so that tailwind jit loads them when the page is loaded
    // and we can dynamically switch the class above
    .alert-success {}
    .alert-warning {}
    .alert-error {}
  }
</style>
