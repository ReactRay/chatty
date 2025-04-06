import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { redirect } from 'react-router-dom'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')

      console.log(res.data)
      set({ authUser: res.data })
    } catch (error) {
      console.log('error in checkAuth', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
}))
