import React, { useEffect } from 'react'
import { fetchRefreshToken } from '@/features/auth/api/authApi'
import { useAuthStore } from '@/features/auth/store/authStore'

const AppInitializer: React.FC = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { accessToken } = await fetchRefreshToken()
        setAuth({ token: accessToken })
      } catch (error) {
        console.error('Refresh token expired:', error)
        clearAuth()
        window.location.href = '/login'
      }
    }

    refreshAccessToken()
  }, [setAuth, clearAuth])

  return null
}

export default AppInitializer
