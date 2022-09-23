import { defineStore } from "pinia"

interface INotification {
  content: string
  color?: "info" | "success" | "warning" | "error"
  showProgress?: boolean
}

interface NotificationState {
  notifications: INotification[]
  showNotification: boolean
  showProgress: boolean
  currentNotification: INotification | null
}

export const useNotificationStore = defineStore({
  id: "notification",

  state: (): NotificationState => ({
    notifications: [],
    showNotification: false,
    showProgress: false,
    currentNotification: null
  }),

  actions: {
    addNotification (notification: INotification): void {
      this.$patch((state) => {
        state.notifications.push(notification)
      })
    },

    async removeNotification (
      notification: INotification,
      timeout = 0
    ): Promise<boolean> {
      return await new Promise((resolve) => {
        setTimeout(() => {
          this.notifications = this.notifications.filter((notif: INotification) => toRaw(notif) !== notification)
          if (toRaw(this.currentNotification) === notification) {
            this.currentNotification = null
          }
          resolve(true)
        }, timeout)
      })
    },

    setNotification (notification: INotification): void {
      this.$patch({
        currentNotification: notification,
        showProgress: notification.showProgress || false,
        showNotification: true
      })
    },

    async hide (): Promise<void> {
      this.$patch({
        showNotification: false
      })
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
    },

    async close (): Promise<void> {
      this.hide()
      if (this.currentNotification) {
        await this.removeNotification({
          notification: this.currentNotification
        })
      }
    }
  },

  getters: {
    getFirstNotification: (state): INotification | null => state.notifications[0],

    getCurrentNotificationContent: (state): string => state.currentNotification?.content ?? "",

    getCurrentNotificationColor: (state): string => state.currentNotification?.color ?? "info"
  }
})
