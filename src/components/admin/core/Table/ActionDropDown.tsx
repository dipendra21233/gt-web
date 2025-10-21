/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'

export interface ActionMenuItem {
  key: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  variant?: 'default' | 'danger'
  separator?: boolean
}

interface ActionDropdownProps {
  items: ActionMenuItem[]
  onAction?: (key: string) => void
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ items, onAction }) => {
  const handleAction = (key: string, onClick?: () => void) => {
    if (onClick) {
      onClick()
    } else if (onAction) {
      onAction(key)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-100 hover:shadow-md transition-all duration-200 data-[state=open]:bg-gray-100 data-[state=open]:shadow-lg rounded-md"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 max-h-[400px] overflow-y-auto shadow-xl border border-gray-200 rounded-lg p-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-thin::-webkit-scrollbar {
              width: 6px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 20px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `
        }} />
        {items.map((item, index) => (
          <div key={item.key}>
            <DropdownMenuItem
              onClick={() => handleAction(item.key, item.onClick)}
              className={`cursor-pointer transition-all duration-200 rounded-md my-0.5 whitespace-nowrap ${item.variant === 'danger'
                ? 'text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-md active:bg-red-100'
                : 'hover:bg-gray-100 hover:shadow-md active:bg-gray-200'
                }`}
            >
              <div className="flex items-center gap-2 w-full">
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="truncate">{item.label}</span>
              </div>
            </DropdownMenuItem>
            {item.separator && index < items.length - 1 && (
              <DropdownMenuSeparator className="my-1 bg-gray-200" />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
