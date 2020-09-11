import React, { useContext, useRef, useState } from 'react'
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonPage,
    IonReorder,
    IonReorderGroup,
    IonRouterLink,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { AppContext } from '../AppContext'
import { addOutline, chevronForwardOutline } from 'ionicons/icons'
import { updateMenuDb } from '../data/models/Menu'

export const EditMenuItems: React.FC = () => {
    const appContext = useContext(AppContext)
    const [showAddGroupAlert, setShowAddGroupAlert] = useState(false)

    const reorderingItems = useRef(false)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account" />
                    </IonButtons>
                    <IonTitle>Edit Menu Items</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonReorderGroup
                    disabled={false}
                    onIonItemReorder={(e) => {
                        if (reorderingItems.current) return
                        const groupToMove = appContext.menu.groups.splice(
                            e.detail.from,
                            1
                        )[0]
                        appContext.menu.groups.splice(
                            e.detail.to,
                            0,
                            groupToMove
                        )

                        updateMenuDb(appContext.menu, () =>
                            e.detail.complete()
                        ).catch((e) => console.error(e))
                    }}
                >
                    {appContext.menu.groups.map((group) => {
                        return (
                            <IonItem key={group.id} class="ion-no-padding">
                                <IonGrid>
                                    <IonRouterLink
                                        routerLink={`/account/admin/menu/edit/${group.id}`}
                                    >
                                        <IonItemDivider>
                                            <IonLabel>{group.name}</IonLabel>
                                            <IonReorder slot="end" />
                                            <IonIcon
                                                slot="end"
                                                icon={chevronForwardOutline}
                                            />
                                        </IonItemDivider>
                                    </IonRouterLink>
                                    <IonReorderGroup
                                        disabled={false}
                                        onIonItemReorder={(e) => {
                                            const itemToMove = group.items.splice(
                                                e.detail.from,
                                                1
                                            )[0]
                                            group.items.splice(
                                                e.detail.to,
                                                0,
                                                itemToMove
                                            )

                                            updateMenuDb(
                                                appContext.menu,
                                                () => {
                                                    e.detail.complete()
                                                    reorderingItems.current = false
                                                }
                                            ).catch((e) => console.error(e))
                                        }}
                                    >
                                        {group.items.map((item) => (
                                            <IonItem
                                                routerLink={`/account/admin/menu/edit/${group.id}/${item.id}`}
                                                key={item.id}
                                                detail
                                            >
                                                <IonLabel>{item.name}</IonLabel>
                                                <IonReorder
                                                    onMouseDown={() =>
                                                        (reorderingItems.current = true)
                                                    }
                                                    slot="end"
                                                />
                                            </IonItem>
                                        ))}
                                    </IonReorderGroup>
                                    <IonItem
                                        button
                                        routerLink={`/account/admin/menu/add/${group.id}`}
                                    >
                                        <IonIcon icon={addOutline} />
                                        Add Item
                                    </IonItem>
                                </IonGrid>
                            </IonItem>
                        )
                    })}

                    <IonItemDivider />
                    <IonItem routerLink="/account/admin/menu/add">
                        <IonIcon icon={addOutline} />
                        Add Group
                    </IonItem>
                </IonReorderGroup>
            </IonContent>
        </IonPage>
    )
}
