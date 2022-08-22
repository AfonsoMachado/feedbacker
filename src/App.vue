<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import ModalFactory from './components/ModalFactory'
import router from './router'
import services from './services'
import { setCurrentUser } from './store/modules/user'

export default {
  components: {
    ModalFactory,
  },
  setup() {
    const route = useRoute()

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token')

          if (!token) {
            router.push({ name: 'Home' })
            return
          }

          const { data } = await services.users.getMe()
          setCurrentUser(data)
        }
      }
    )
  },
}
</script>
