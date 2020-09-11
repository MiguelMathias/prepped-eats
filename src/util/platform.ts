import { isPlatform } from '@ionic/react'

export const isMobile = () =>
    isPlatform('ios') ||
    isPlatform('android') ||
    isPlatform('mobile') ||
    isPlatform('mobileweb')

export const isDesktop = () =>
    isPlatform('desktop') || isPlatform('electron') || isPlatform('pwa')

export const isWeb = () => isPlatform('pwa') || isPlatform('mobileweb')
