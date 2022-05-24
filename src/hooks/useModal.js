import bus from '../utils/bus'

const EVENT_NAME = 'modal:toggle'

export default function useModal() {
  // Abre o modal
  function open(payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload })
  }

  // Fecha o modal
  function close(payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload })
  }

  // Escuta por um evento
  function listen(fn) {
    bus.on(EVENT_NAME, fn)
  }

  // Para de escutar
  function off(fn) {
    bus.off(EVENT_NAME, fn)
  }

  return { open, close, listen, off }
}
