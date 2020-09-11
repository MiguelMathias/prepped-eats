import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react'
import {
    calendarOutline,
    helpOutline,
    informationCircleOutline,
    personOutline,
    receiptOutline,
    repeatOutline,
} from 'ionicons/icons'
import React from 'react'
import { useLocation } from 'react-router'
import './SideMenu.scss'

const routes = {
    appPages: [
        { title: 'Menu', path: '/tabs/menu', icon: calendarOutline },
        { title: 'Plans', path: '/tabs/plans', icon: repeatOutline },
        { title: 'Orders', path: '/tabs/orders', icon: receiptOutline },
    ],
    accountPages: [
        { title: 'Account', path: '/account', icon: personOutline },
        { title: 'Contact', path: '/contact', icon: helpOutline },
    ],
    otherPages: [
        { title: 'About', path: '/about', icon: informationCircleOutline },
    ],
}

interface Pages {
    title: string
    path: string
    icon: string
    routerDirection?: string
}

export const SideMenu: React.FC = () => {
    const location = useLocation()

    function renderListItems(list: Pages[]) {
        return list
            .filter((route) => !!route.path)
            .map((p) => (
                <IonMenuToggle key={p.path} auto-hide="false">
                    <IonItem
                        routerLink={p.path}
                        routerDirection="none"
                        className={
                            location.pathname.startsWith(p.path)
                                ? 'selected'
                                : undefined
                        }
                    >
                        <IonIcon slot="start" icon={p.icon} />
                        <IonLabel>{p.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            ))
    }

    return (
        <IonMenu type="push" contentId="main">
            <IonContent forceOverscroll={false}>
                <IonList lines="none">
                    <IonListHeader>Prepped Eats</IonListHeader>
                    {renderListItems(routes.appPages)}
                </IonList>
                <IonList lines="none">
                    <IonListHeader>Account</IonListHeader>
                    {renderListItems(routes.accountPages)}
                </IonList>
                <IonList lines="none">
                    <IonListHeader>Other</IonListHeader>
                    {renderListItems(routes.otherPages)}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}
