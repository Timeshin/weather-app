import React, { FC, useEffect } from 'react'

interface IErrorAlert {
  message: string
  clearError: () => void
  data?: string
}

const ErrorAlert: FC<IErrorAlert> = ({ message, data, clearError }) => {
  
  useEffect(() => {
    setTimeout(() => {
      clearError()
    }, 3000)
  }, [clearError])

  return (
    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
      <span className="font-medium">{message}</span> {data}
    </div>
  )
}

export default ErrorAlert