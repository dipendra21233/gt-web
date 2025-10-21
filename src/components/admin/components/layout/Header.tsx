'use client'
import gtLogo from '@/../public/images/gt-logo.png'
import { CommonConfirmationModal } from '@/components/shared/PopupModals/CommonConfirmationModal'
import { logout } from '@/store/actions/auth.action'
import { getBalance } from '@/store/actions/balance.action'
import { MainStoreType } from '@/types/store/reducers/main.reducers'
import { ACCESS_TOKEN } from '@/utils/constant'
import {
  capitalizeFirstLetter,
  setInitialStorageState,
} from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Text } from 'theme-ui'
import BalanceInfo from './BalanceInfo'
import { DropDown } from './DropDown'

export default function Header() {
  const router = useRouter()
  const dispatch = useDispatch()
  const getUserData = useSelector(
    (state: MainStoreType) => state.userData.currentUserData
  )
  const authData = useSelector((state: MainStoreType) => state.authUserData)
  const { balanceData } = useSelector(
    (state: MainStoreType) => state.balanceData
  )
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const [isLogout, setIsLogout] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setIsShowDropDown((prev) => !prev)
  }

  const handleClickLogout = () => {
    setIsLogout(true)
  }

  const handleClickSubmit = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN)
    if (accessToken) {
      dispatch(
        logout(accessToken, async (res) => {
          if (res) {
            setInitialStorageState()
            router.replace(appRoutes?.login)
          }
        })
      )
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShowDropDown(false)
      }
    }
    if (isShowDropDown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isShowDropDown])

  useEffect(() => {
    dispatch(getBalance())
  }, [dispatch])

  useEffect(() => {
    if (isLogout) {
      setIsShowDropDown(false)
    }
  }, [isLogout])

  return (
    <>
      <div className="container-fluid main-wrapper items-center">
        <div className="row align-items-center header z-800">
          <div className="col-auto header-left">
            <Link href="/admin-userRequests" className="logo">
              <Image src={gtLogo} alt="gtLogo" />
            </Link>
          </div>
          <Box as="div" className="col-auto ms-auto d-flex align-items-center">
            <Box as="div" className="d-flex align-items-center me-4">
              <BalanceInfo
                availableBalance={balanceData?.availableBalance || 0}
                creditLimit={balanceData?.creditLimit || 0}
                due={balanceData?.due || 0}
              />
            </Box>
            <Box
              as="div"
              className="admin-header-right-container"
              onClick={handleClick}
              sx={{ backgroundColor: isShowDropDown && '#EEEE' }}
            >
              <Box as="div" className="user-names">
                <Text
                  variant="Maison20Medium125"
                  sx={{ color: 'blue_primary' }}
                >
                  {capitalizeFirstLetter(getUserData?.userName as string)}
                </Text>
                <Text
                  color="blue_translucent"
                  as="h3"
                  variant="Maison16Medium20"
                  className="text-end"
                >
                  {translation?.ADMIN}
                </Text>
              </Box>
              <Box as="div" className="user-image-container">
                <FaRegUser size={30} color="#333548bf" />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      {isShowDropDown && (
        <DropDown ref={dropdownRef} handleClickLogout={handleClickLogout} />
      )}

      <CommonConfirmationModal
        isOpen={isLogout}
        onClose={() => {
          setIsLogout(false)
        }}
        onClickSubmit={handleClickSubmit}
        submitButtonText={translation?.LOGOUT}
        title={translation?.CONFIRM_LOGOUT}
        description={translation?.LOGOUT_DESC}
        isLoading={authData?.loading}
      />
    </>
  )
}
