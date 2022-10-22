import React, { FC, ReactNode } from 'react'
import { useStores } from '@mobx'
import { observer } from 'mobx-react-lite'
import { ErrorAlert } from 'components'

interface IErrorWrapper {
  children: ReactNode
}

const ErrorWrapper: FC<IErrorWrapper> = observer(({ children }) => {
  const { errorStore } = useStores()
  
  return (
    <>
      {
        errorStore.showErrorMessage && <ErrorAlert />
      }
      {children}
    </>
  )
})

export default ErrorWrapper