<template>
  <!-- Local de renderização do componente -->
  <teleport to="body">
    <!-- Overlay -->
    <div
      v-if="state.isActive"
      class="
        fixed
        top-0
        left-0
        z-50
        flex
        items-center
        justify-center
        w-full
        h-full
        bg-black bg-opacity-50
      "
      @click="handleModalToggle({ status: false })"
    >
      <!-- @click.stop interrompe a propagação de evento -->
      <div class="fixed mx-10" :class="state.width" @click.stop>
        <div
          class="
            flex flex-col
            overflow-hidden
            bg-white
            rounded-lg
            animate__animated animate__fadeInDown animate__faster
          "
        >
          <div class="flex flex-col px-12 py-10 bg-white">
            <!-- Componente dinamico para renderizar  -->
            <component :is="state.component" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { reactive } from '@vue/reactivity'
import {
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
} from '@vue/runtime-core'
import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() =>
  import('../ModalCreateAccount')
)

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'
export default {
  components: {
    ModalLogin,
    ModalCreateAccount,
  },

  setup() {
    //  importando uso da api do modal
    const modal = useModal()

    // Declarando componente reativo
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH,
    })

    // Montagem do modal
    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    // Fechando o modal
    onBeforeUnmount(() => {
      modal.off(handleModalToggle)
    })

    function handleModalToggle(payload) {
      // Montando
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH
      } else {
        // Resetando modal
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActive = payload.status
    }

    return {
      state,
      handleModalToggle,
    }
  },
}
</script>
/
