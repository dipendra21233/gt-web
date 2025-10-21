'use client'
import { Mail, Phone } from 'lucide-react'
import React from 'react'

export type TabType = 'mobile' | 'email'

interface MobileEmailTabProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  className?: string
}

const MobileEmailTab: React.FC<MobileEmailTabProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  const tabs = [
    {
      key: 'email' as TabType,
      label: 'Email',
      icon: Mail,
    },
    {
      key: 'mobile' as TabType,
      label: 'Mobile',
      icon: Phone,
    },

  ]

  return (
    <div className={`mobile-email-tab-container my-3 ${className}`}>
      <div className="tab-wrapper">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key

          return (
            <button
              key={tab.key}
              className={`tab-button ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.key)}
              type="button"
            >
              <Icon size={16} className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileEmailTab
