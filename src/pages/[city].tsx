import React from 'react'
import { GetServerSideProps } from 'next'

const City = () => {

  return (
    <div>City</div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      error: {
        message: 'one',
        data: 'data'
      }
    }
  }
}

export default City