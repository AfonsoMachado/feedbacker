import { readonly } from 'vue'
import UserModule from './modules/user'
import GlobalModule from './modules/global'

export default readonly({
  User: UserModule,
  Global: GlobalModule
})
