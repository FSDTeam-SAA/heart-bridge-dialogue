// hooks/usePageTracking.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logEvent, getAnalytics } from 'firebase/analytics'
import { analytics } from '../config/firebaseConfig'

export const usePageTracking = () => {
  const location = useLocation()

  useEffect(() => {
    if (analytics) {
      // Track page view with the path
      logEvent(getAnalytics(), 'page_view', {
        page_path: location.pathname,
        page_title: document.title,
        page_location: window.location.href,
      })

      // Also send a screen_view event (recommended for SPAs)
      logEvent(getAnalytics(), 'screen_view', {
        screen_name: location.pathname,
        screen_class: document.title,
      })
    }
  }, [location.pathname])
}
