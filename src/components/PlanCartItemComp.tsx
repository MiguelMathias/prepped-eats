import { IonButton, IonButtons, IonIcon, IonItem, IonLabel } from '@ionic/react'
import {
    alertOutline,
    chevronForwardOutline,
    removeOutline,
} from 'ionicons/icons'
import React from 'react'
import { PlanCartItem } from '../data/models/Cart'

interface PlanCartItemProps {
    item: PlanCartItem
}

export const PlanCartItemComp: React.FC<PlanCartItemProps> = ({ item }) => {
    return (
        <IonItem>
            <IonButtons slot="start">
                <IonButton>
                    <IonIcon slot="icon-only" icon={removeOutline} />
                </IonButton>
            </IonButtons>
            <IonLabel slot="start">Item Name</IonLabel>
            <IonIcon slot="end" icon={alertOutline} color="danger" />
            <IonButtons slot="end">
                <IonButton>
                    <IonIcon slot="icon-only" icon={chevronForwardOutline} />
                </IonButton>
            </IonButtons>
        </IonItem>
    )
}
