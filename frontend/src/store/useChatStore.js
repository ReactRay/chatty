import { create } from 'zustand'

import Toast from 'react-hot-toast'

import { axiosInstance } from '../lib/axios'

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true })

    try {
      const rest = await axiosInstance.get('/messages/users')
      set({ users: rest.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true })

    try {
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  //optimize
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
