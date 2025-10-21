import logOut from '@/../public/svg/logout.svg'
import profileImage from '@/../public/svg/profile.svg'
import { AdminHeaderProps } from '@/types/module/commonModule'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdBalance } from 'react-icons/md'
import { Card, Divider, Flex, Text } from 'theme-ui'

interface HeaderDropDownProps {
  handleClickLogout: () => void
  ref?: React.LegacyRef<HTMLDivElement>
}

export const DropDown: React.FC<HeaderDropDownProps> = ({
  handleClickLogout,
  ref,
}) => {
  const dropdownItems: AdminHeaderProps[] = [
    {
      label: translation?.PROFILE,
      onClick: () => undefined,
      icon: profileImage,
      className: 'admin-profile-img',
    },
    {
      label: translation?.BALANCE_UPLOAD,
      href: appRoutes?.uploadBalance,
      icon: <MdBalance size={20} color="#303030" />,
    },
    { label: translation?.LOGOUT, onClick: handleClickLogout, icon: logOut },
  ]

  return (
    <Card className="admin-header-card" ref={ref}>
      {dropdownItems.map((item, index) => (
        <React.Fragment key={item.label}>
          {item?.href ? (
            <Link href={item?.href || '#'} style={{ textDecoration: 'none' }}>
              <Flex
                sx={{ alignItems: 'center', p: '20px' }}
                className="admin-dropdown-item-container"
                onClick={item?.onClick}
              >
                {item?.icon &&
                  (typeof item?.icon === 'string' ||
                  (typeof item?.icon === 'object' && 'src' in item?.icon) ? (
                    <Image
                      height={20}
                      className={item?.className}
                      width={20}
                      src={item?.icon as string}
                      alt={item?.label}
                    />
                  ) : (
                    <div className="admin-dropdown-item-icon">{item?.icon}</div>
                  ))}
                <Text
                  sx={{ pl: '15px' }}
                  className="admin-dropdown-item"
                  variant="Maison16Regular20"
                >
                  {item?.label}
                </Text>
              </Flex>
            </Link>
          ) : (
            <Flex
              sx={{ alignItems: 'center', p: '20px' }}
              className="admin-dropdown-item-container"
              onClick={item?.onClick}
            >
              {item?.icon &&
                (typeof item?.icon === 'string' ||
                (typeof item?.icon === 'object' && 'src' in item?.icon) ? (
                  <Image
                    height={20}
                    className={item?.className}
                    width={20}
                    src={item?.icon as string}
                    alt={item?.label}
                  />
                ) : (
                  <div className="admin-dropdown-item-icon">{item?.icon}</div>
                ))}
              <Text
                sx={{ pl: '15px' }}
                className="admin-dropdown-item"
                variant="Maison16Regular20"
              >
                {item?.label}
              </Text>
            </Flex>
          )}
          {index < dropdownItems.length - 1 && <Divider m={0} />}
        </React.Fragment>
      ))}
    </Card>
  )
}
