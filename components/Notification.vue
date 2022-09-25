<template>
  <div class="notification">
    <div v-show="notificationStore.showNotification" class="notification-alert alert" :class="alertType[notificationStore.getCurrentNotificationColor]">
      <div class="notification-alert-container">
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
import { storeToRefs } from "pinia"
import { useNotificationStore, type INotification } from "@/stores"

const notificationStore = useNotificationStore()

const { getFirstNotification } = storeToRefs(notificationStore)

const alertType = {
  // https://github.com/tailwindlabs/tailwindcss/discussions/3461#discussioncomment-329183
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error"
}

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

watch(getFirstNotification, async (newNotification: INotification | null) => {
  if (newNotification && newNotification !== notificationStore.currentNotification) {
    // if new notificatin exists
    // & it's not the current notification
    // set the current notification to it
    notificationStore.setNotification(newNotification)
    // if we aren't told to persist the notification
    // set it to timeout in 2 seconds
    if (!newNotification.persist) { await notificationStore.removeNotification(newNotification, 2000) }
  }

  if (!notificationStore.currentNotification) {
    notificationStore.hide()
  }
})

</script>

<style lang="scss">
  .notification {
    @apply p-3 lg:p-8 absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2;

    &-alert {
      @apply shadow-lg;

      &-container {
        @apply w-max max-w-[90vw];
      }
    }
  }
</style>
