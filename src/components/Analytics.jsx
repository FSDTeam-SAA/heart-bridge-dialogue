import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageview } from '../analytics'

const Analytics = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    pageview(location.pathname + location.search)
  }, [location])

  return children
}

export default Analytics
