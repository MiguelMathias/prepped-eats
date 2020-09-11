import React from 'react'
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { authentication } from '../Firebase'

export const Admin: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account" />
                    </IonButtons>
                    <IonTitle>Administration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem detail routerLink="/account/admin/orders">
                        Manage Orders
                    </IonItem>
                    <IonItem detail routerLink="/account/admin/menu">
                        Edit Menu Items
                    </IonItem>
                    <IonItem detail routerLink="/account/admin/plans">
                        Edit Plans Items
                    </IonItem>
                    <IonItem button onClick={() => authentication.signOut()}>
                        Sign Out
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
