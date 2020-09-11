import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React from 'react'
import { PlanItemModel } from '../data/models/Plan'
import { PlanItem } from './PlanItem'

interface PlanGridProps {
    plans: PlanItemModel[]
}

export const PlanGrid: React.FC<PlanGridProps> = ({ plans }) => {
    return (
        <IonGrid>
            <IonRow>
                {plans.map((planItem) => (
                    <IonCol sizeMd="6" key={planItem.id}>
                        <PlanItem planItem={planItem} />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    )
}
