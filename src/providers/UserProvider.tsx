'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session, User } from '@supabase/supabase-js'

interface UserContextProps {
  user: User | null
}

export const UserContext = createContext<UserContextProps>({ user: null })

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession()

      setUser(session?.user ?? null)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
