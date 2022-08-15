import Store from '../store'

export default function useStore(module) {
  return module ? Store[module] : Store
}
