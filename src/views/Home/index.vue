<template>
  <!-- eventos emitidos para as funções  -->
  <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
  <contact />

  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker © 2021</p>
  </div>
</template>

<script>
import CustomHeader from '../Home/CustomHeader.vue'
import Contact from '../Home/Contact.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
  // componentes usados no negocio
  components: {
    CustomHeader,
    Contact,
  },
  setup() {
    // para usar o router, semelhante ao react
    const router = useRouter()

    // quando o componente é montado
    onMounted(() => {
      // capturando token do local storate
      const token = window.localStorage.getItem('token')
      // se tiver um token, manda para a tela de feedbacks
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin() {}

    function handleAccountCreate() {}

    return {
      handleLogin,
      handleAccountCreate,
    }
  },
}
</script>
