import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { search } from 'ionicons/icons'
import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../AppContext'
import { CartFab } from '../components/CartFab'
import { MenuGrid } from '../components/MenuGrid'
import { toId, useForceUpdate } from '../util/util'
import './Menu.scss'
import { entreesOfMenu } from '../data/models/Menu'

export const Menu: React.FC = () => {
    const appContext = useContext(AppContext)

    const [segment, setSegment] = useState<string>('all')
    const [showSearchbar, setShowSearchbar] = useState(false)
    const forceUpdate = useForceUpdate()

    const pageRef = useRef<HTMLElement>(null)

    const getEntrees = (segment: string) => {
        switch (segment) {
            case 'all':
                return entreesOfMenu(appContext.menu)
            case 'favorites':
                return entreesOfMenu(appContext.menu)
                    .map((group) => {
                        const favoritesOfGroup = appContext.userData.favorites
                            .filter((favItemId) =>
                                group.items.map(toId).includes(favItemId)
                            )
                            .map(
                                (favItemId) =>
                                    group.items.find(
                                        (item) => item.id === favItemId
                                    )!
                            )
                        return { ...group, items: favoritesOfGroup }
                    })
                    .filter((group) => group.items.length > 0)
            default:
                return entreesOfMenu(appContext.menu).filter(
                    (group) => group.id === segment
                )
        }
    }

    return (
        <IonPage ref={pageRef}>
            <IonHeader translucent={true}>
                <IonToolbar>
                    {!showSearchbar && (
                        <>
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>Menu</IonTitle>
                        </>
                    )}

                    {showSearchbar && (
                        <IonSearchbar
                            className="ion-padding-top"
                            showCancelButton="always"
                            placeholder="Search"
                            onIonChange={(e: CustomEvent) => {
                                appContext.setSearchText(e.detail.value)
                            }}
                            onIonCancel={() => setShowSearchbar(false)}
                        />
                    )}
                    <IonButtons slot="end">
                        {!showSearchbar && (
                            <IonButton onClick={() => setShowSearchbar(true)}>
                                <IonIcon slot="icon-only" icon={search} />
                            </IonButton>
                        )}
                    </IonButtons>
                </IonToolbar>
                <IonToolbar>
                    <IonSegment
                        value={segment}
                        scrollable
                        mode="md"
                        onIonChange={(e) => {
                            setSegment(e.detail.value as any)
                        }}
                    >
                        <IonSegmentButton value="all">All</IonSegmentButton>
                        {entreesOfMenu(appContext.menu).map((group) => (
                            <IonSegmentButton key={group.id} value={group.id}>
                                {group.name}
                            </IonSegmentButton>
                        ))}
                        <IonSegmentButton value="favorites">
                            Favorites
                        </IonSegmentButton>
                    </IonSegment>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <MenuGrid
                    entrees={getEntrees('all')}
                    hidden={segment !== 'all'}
                    forceUpdateMenu={forceUpdate}
                />
                {entreesOfMenu(appContext.menu).map((group) => (
                    <MenuGrid
                        key={group.id}
                        entrees={getEntrees(group.id)}
                        hidden={segment !== group.id}
                        forceUpdateMenu={forceUpdate}
                    />
                ))}
                <MenuGrid
                    entrees={getEntrees('favorites')}
                    hidden={segment !== 'favorites'}
                    forceUpdateMenu={forceUpdate}
                />
            </IonContent>
            <CartFab menuPage={pageRef.current} forceUpdateMenu={forceUpdate} />
        </IonPage>
    )
}
