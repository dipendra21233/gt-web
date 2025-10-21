'use client'
import errorPageBgImage from '@/../public/images/error-img.png'
import '@/app/(user)/globals.css'
import { ThemeButton } from '@/components/web/core/Button/Button'
import '@/styles/error-page.css'
import '@/styles/flex-class.css'
import '@/styles/navbar.css'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Box, Text } from 'theme-ui'

const PageNotFound = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push(appRoutes.home)
  }
  return (
    <>
      <Box variant="styles.bgFlowerPatternCenter">
        <div className="page-not-found-container">
          <Image
            className="error-page-img"
            src={errorPageBgImage}
            alt="errorPageBgImage"
          />
          <Text
            as="p"
            variant="Maison60Demi125"
            className="text-center"
            color="#3E3E3E"
          >
            {translation?.ERROR_PAGE_TITLE}
          </Text>
          <Text
            py={4}
            as="p"
            className="text-center"
            variant="Maison22Regular125"
            sx={{
              width: ['90%', '90%', '80%', '80%', '70%', '50%'],
              margin: 'auto',
            }}
          >
            {translation?.ERROR_PAGE_DESC}
          </Text>

          <ThemeButton
            variant="secondary3"
            textVariant="Maison18Demi111"
            textSx={{ color: 'white' }}
            sx={{ maxWidth: ['240px', '300px', '340px', '360px'] }}
            text={translation?.RETURN_HOME}
            onClick={handleClick}
          />
        </div>
      </Box>
    </>
  )
}

export default PageNotFound
