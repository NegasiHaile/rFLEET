import React, { createContext, useContext, useEffect, useState } from 'react'

import { useOnClickOutside } from '@hooks/utils/useClickOutside'

interface ITabContext {
  activeTab: string
  autoDismiss: boolean
  setActiveTab: (id: string) => void
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
  onTabChanged?: (id: string) => void | Promise<void>
  autoDismiss?: boolean
  children: React.ReactNode
}

export const TabPane = ({ autoDismiss = false, onTabChanged, children, ...props }: TabPaneProps) => {
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    onTabChanged?.(activeTab)
  }, [activeTab, onTabChanged])

  return (
    <div {...props}>
      <TabContext.Provider value={{ activeTab, setActiveTab, autoDismiss }}>{children}</TabContext.Provider>
    </div>
  )
}

interface TabProps extends React.HTMLAttributes<HTMLAnchorElement> {
  target: string
  children: React.ReactNode
  onClick?: () => void | Promise<void>
}

export const Tab = ({ target, children, onClick, ...props }: TabProps) => {
  const { setActiveTab } = useTabContext()

  const handleClick = () => {
    setActiveTab(target)
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
  const { activeTab, setActiveTab, autoDismiss } = useTabContext()

  useOnClickOutside(paneNode, () => {
    if (autoDismiss) {
      setActiveTab('')
    }
  })

  if (activeTab !== id) return null

  return (
    <div ref={paneNode} {...props}>
      {children}
    </div>
  )
}
