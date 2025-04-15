// src/analytics.js
export const pageview = (url) => {
  window.gtag('config', 'G-0M7BC46GB1', {
    page_path: url,
  })
}
