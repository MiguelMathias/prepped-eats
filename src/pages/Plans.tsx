import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonItemDivider,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { PlanGrid } from '../components/PlanGrid'

const Plans: React.FC = () => {
    const appContext = useContext(AppContext)

    return (
        <IonPage>
            <IonContent>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Plans</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <PlanGrid plans={appContext.plans} />

                <IonList>
                    <IonItemDivider>Meal Prep Package Deals</IonItemDivider>
                    <IonItem>- Orders due every Thursday by 11:59 PM</IonItem>
                    <IonItem>
                        - Required x2 of each item when placing order (Choose 5
                        menu items x2)
                    </IonItem>
                    <IonItem>
                        - 50% deposit required at the time of placing order
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Plans
