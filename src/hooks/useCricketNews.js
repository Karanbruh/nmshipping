import { useCallback, useEffect, useState } from 'react'
import { clearCricketNewsCache, fetchCricketNews } from '../services/cricketNewsService'

export function useCricketNews({ count = 12 } = {}) {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadNews = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchCricketNews({ count })
      setArticles(data.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while loading news.')
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }, [count])

  const retry = useCallback(() => {
    clearCricketNewsCache()
    loadNews()
  }, [loadNews])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  return {
    articles,
    isLoading,
    error,
    retry,
  }
}
