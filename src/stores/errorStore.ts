import { makeAutoObservable } from 'mobx'
import { RootStore } from './index'

class ErrorStore {
  message = ''

  responseErrorMessage = ''

  showErrorMessage = false

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  errorOccured(message: string, responseErrorMessage?: string) {
    this.responseErrorMessage = responseErrorMessage
    this.message = message
    this.showErrorMessage = true

    setTimeout(() => {
      this.clearErrorData()
    }, 3000)
  }

  clearErrorData() {
    this.showErrorMessage = false
    this.responseErrorMessage = ''
    this.message = ''
  }
}

export default ErrorStore
