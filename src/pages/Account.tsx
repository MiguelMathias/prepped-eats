import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { SignIn } from './SignIn'
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { logOutOutline, person } from 'ionicons/icons'
import { authentication } from '../Firebase'

export const Account: React.FC = () => {
    const appContext = useContext(AppContext)

    if (!appContext.user || appContext.user.isAnonymous) return <SignIn />

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        <IonIcon icon={person} /> {appContext.user?.displayName}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => authentication.signOut()}>
                            Sign Out
                            <IonIcon icon={logOutOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem detail routerLink="/account/user">
                        Edit User Profile
                    </IonItem>
                    <IonItem detail routerLink="/account/admin">
                        Administration
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
