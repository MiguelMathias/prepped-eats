import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react'
import { addOutline, removeOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { PlanItemModel } from '../data/models/Plan'
import { storageRef } from '../Firebase'

interface PlanItemProps {
    planItem: PlanItemModel
}

export const PlanItem: React.FC<PlanItemProps> = ({ planItem }) => {
    const [quantity, setQuantity] = useState(0)
    const [picSrc, setPicSrc] = useState('')

    const fetchImgUrl = async () => {
        setPicSrc(
            await storageRef
                .child('img/plans/' + planItem.id + '.jpg')
                .getDownloadURL()
        )
    }
    useEffect(() => {
        fetchImgUrl().catch((e) => console.error(e))
    }, [])

    return (
        <IonCard>
            <IonImg src={picSrc}></IonImg>
            <IonCardHeader>
                <IonCardTitle>{planItem.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonLabel>{planItem.description}</IonLabel>
                <IonItem lines="none">
                    <IonLabel>${planItem.price}</IonLabel>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={() => {
                                setQuantity(
                                    quantity > 0 ? quantity - 1 : quantity
                                )
                            }}
                        >
                            <IonIcon slot="icon-only" icon={removeOutline} />
                        </IonButton>
                        <IonLabel>{quantity}</IonLabel>
                        <IonButton
                            onClick={() => {
                                setQuantity(quantity + 1)
                            }}
                        >
                            <IonIcon slot="icon-only" icon={addOutline} />
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonCardContent>
        </IonCard>
    )
}
