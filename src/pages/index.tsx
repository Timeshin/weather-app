import React, { useEffect, useState } from 'react'
import { useLocation } from 'hooks'
import GeoService from 'services/geo'
import type { NextPage } from 'next'

const MainPage: NextPage = () => {
  const [cities, setСities] = useState()
  const location = useLocation()

  useEffect(() => {
    if(!location || typeof location === 'string') return
    
    GeoService.getAllCities(location.latitude, location.longitude).then((res) => {
      console.log(res)
    })
  }, [location])

  return (
    <h1>
      Weather app
    </h1>
  )
}

export default MainPage
