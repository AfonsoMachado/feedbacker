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
      @click="handleModalToogle({ status: false })"
    >

      <div
        class="fixed mx-10"
        :class="state.width"
        @click.stop
      >
        <div class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <!-- Componente dinamico para renderizar  -->
            <component :is="state.component" />
          </div>
        </div>

    </div>
  </teleport>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import useModal from '../../hooks/useModal'

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'
export default {
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
      modal.listen(handleModalToogle)
    })

    // Fechando o modal
    onBeforeUnmount(() => {
      modal.off(handleModalToogle)
    })

    function handleModalToogle(payload) {
      // Montando
      if (payload.status) {
        state.component = payload.component
      }
    }

    return {
      state,
    }
  },
}
</script>
/
