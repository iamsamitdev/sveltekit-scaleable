import { writable } from 'svelte/store'
import type { User } from '$lib/types'

interface AdminState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

function createAdminStore() {
  const { subscribe, set, update } = writable<AdminState>({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  })

  return {
    subscribe,
    setLoading: (loading: boolean) => {
      update(state => ({ ...state, loading }))
    },
    setError: (error: string | null) => {
      update(state => ({ ...state, error }))
    },
    setUsers: (users: User[], pagination?: any) => {
      update(state => ({
        ...state,
        users,
        pagination: pagination || state.pagination
      }))
    },
    setCurrentUser: (user: User | null) => {
      update(state => ({ ...state, currentUser: user }))
    },
    addUser: (user: User) => {
      update(state => ({
        ...state,
        users: [...state.users, user]
      }))
    },
    updateUser: (updatedUser: User) => {
      update(state => ({
        ...state,
        users: state.users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      }))
    },
    removeUser: (userId: string) => {
      update(state => ({
        ...state,
        users: state.users.filter(user => user.id !== userId)
      }))
    },
    reset: () => {
      set({
        users: [],
        currentUser: null,
        loading: false,
        error: null,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0
        }
      })
    }
  }
}

export const adminStore = createAdminStore()
