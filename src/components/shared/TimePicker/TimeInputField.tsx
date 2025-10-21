'use client'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { TextInputFieldProps } from '@/types/module/textInputField'
import { FC, useEffect, useRef, useState } from 'react'

interface TimeInputFieldProps {
  label: string
  value: string
  placeholder?: string
}

const TimeInputField: FC<TimeInputFieldProps & TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [tempHour, setTempHour] = useState('00')
  const [tempMinute, setTempMinute] = useState('00')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hourScrollRef = useRef<HTMLDivElement>(null)
  const minuteScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':')
      setTempHour(h || '00')
      setTempMinute(m || '00')
    }
  }, [value])

  useEffect(() => {
    if (open && hourScrollRef.current && minuteScrollRef.current) {
      const hourIndex = parseInt(tempHour)
      const minuteIndex = parseInt(tempMinute)

      setTimeout(() => {
        if (hourScrollRef.current) {
          hourScrollRef.current.scrollTop = hourIndex * 32
        }
        if (minuteScrollRef.current) {
          minuteScrollRef.current.scrollTop = minuteIndex * 32
        }
      }, 0)
    }
  }, [open, tempHour, tempMinute])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleOk = () => {
    onChange?.(`${tempHour}:${tempMinute}`)
    setOpen(false)
  }

  const handleNow = () => {
    const now = new Date()
    const h = now.getHours().toString().padStart(2, '0')
    const m = now.getMinutes().toString().padStart(2, '0')
    setTempHour(h)
    setTempMinute(m)
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <TextInputField
        label={label}
        value={value}
        placeholder={placeholder}
        onClick={() => setOpen(!open)}
        firstInputBox
        readOnly
        {...props}
      />

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          backgroundColor: 'white',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
          zIndex: 1000,
          width: '280px',
          padding: '12px',
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '4px',
                fontWeight: 500,
              }}>
                Dep. Time (HH:MM) <span style={{ color: '#ff4d4f' }}>*</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 12px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                backgroundColor: '#fafafa',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{tempHour}</span>
                <span style={{ color: '#bbb' }}>:</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{tempMinute}</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{ flex: 1 }}>
              <div ref={hourScrollRef} style={{
                height: '192px',
                overflowY: 'auto',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                backgroundColor: '#fff',
              }}>
                {hours.map((h) => (
                  <div
                    key={h}
                    onClick={() => setTempHour(h)}
                    style={{
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      backgroundColor: tempHour === h ? '#e6f4ff' : 'transparent',
                      color: tempHour === h ? '#1677ff' : '#333',
                      fontWeight: tempHour === h ? 600 : 400,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (tempHour !== h) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tempHour !== h) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div ref={minuteScrollRef} style={{
                height: '192px',
                overflowY: 'auto',
                border: '1px solid #e8e8e8',
                borderRadius: '4px',
                backgroundColor: '#fff',
              }}>
                {minutes.map((m) => (
                  <div
                    key={m}
                    onClick={() => setTempMinute(m)}
                    style={{
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      backgroundColor: tempMinute === m ? '#e6f4ff' : 'transparent',
                      color: tempMinute === m ? '#1677ff' : '#333',
                      fontWeight: tempMinute === m ? 600 : 400,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (tempMinute !== m) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tempMinute !== m) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '8px',
            borderTop: '1px solid #f0f0f0',
          }}>
            <button
              onClick={handleNow}
              style={{
                padding: '6px 12px',
                border: 'none',
                background: 'transparent',
                color: '#1677ff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Now
            </button>
            <button
              onClick={handleOk}
              style={{
                padding: '6px 20px',
                border: 'none',
                backgroundColor: '#1677ff',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TimeInputField
