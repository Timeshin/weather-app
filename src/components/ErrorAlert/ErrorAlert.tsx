import React from 'react'
import { useStores } from '@mobx'
import { observer } from 'mobx-react-lite'

const ErrorAlert = observer(() => {
  const {
    errorStore: {
      message,
      responseErrorMessage
    }
  } = useStores()

  return (
    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <span className="font-medium">{message}</span> {responseErrorMessage}
    </div>
  )
})

export default ErrorAlert