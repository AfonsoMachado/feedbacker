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
import useModal from '../../hooks/useModal'

export default {
  // componentes usados no negocio
  components: {
    CustomHeader,
    Contact,
  },
  setup() {
    // para usar o router, cria um hook semelhante ao react
    const router = useRouter()
    const modal = useModal()

    // quando o componente é montado
    onMounted(() => {
      // capturando token do local storate
      const token = window.localStorage.getItem('token')
      // se tiver um token, manda para a tela de feedbacks
      if (token) {
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin',
      })
    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalCreateAccount',
      })
    }

    return {
      handleLogin,
      handleAccountCreate,
    }
  },
}
</script>
