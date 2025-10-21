import localFont from 'next/font/local'
export const MaisonFont = localFont({
  src: [
    {
      path: '../../public/fonts/Maison-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Demi.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Maison-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-maison',
})
