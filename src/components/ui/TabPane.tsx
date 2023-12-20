import React, { createContext, useContext, useEffect } from 'react'

import { useOnClickOutside } from '@hooks/utils/useClickOutside'

interface ITabContext {
  activeTab: string
  autoDismiss: boolean
  onTabChange: (id: string) => void
}

const TabContext = createContext<ITabContext | undefined>(undefined)

const useTabContext = () => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider')
  }
  return context
}

interface TabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string
  onTabChange: (id: string) => void | Promise<void>
  autoDismiss?: boolean
  children: React.ReactNode
}

export const TabPane = ({ activeTab = '', onTabChange, children, autoDismiss = false, ...props }: TabPaneProps) => {
  useEffect(() => {
    onTabChange?.(activeTab)
  }, [activeTab, onTabChange])

  return (
    <div {...props}>
      <TabContext.Provider value={{ activeTab, onTabChange, autoDismiss }}>{children}</TabContext.Provider>
    </div>
  )
}

interface TabProps extends React.HTMLAttributes<HTMLAnchorElement> {
  target: string
  children: React.ReactNode
  onClick?: () => void | Promise<void>
}

export const Tab = ({ target, children, onClick, ...props }: TabProps) => {
  const { onTabChange } = useTabContext()

  const handleClick = () => {
    onTabChange(target)
    onClick?.()
  }

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

interface PaneProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}

export const Pane = ({ id, children, ...props }: PaneProps) => {
  const paneNode = React.useRef<any>()
  const { activeTab, onTabChange, autoDismiss } = useTabContext()

  useOnClickOutside(paneNode, () => {
    if (autoDismiss) {
      onTabChange('')
    }
  })

  if (activeTab !== id) return null

  return (
    <div ref={paneNode} {...props}>
      {children}
    </div>
  )
}
