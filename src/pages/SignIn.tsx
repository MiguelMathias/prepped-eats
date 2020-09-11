import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import React, { useRef } from 'react'
import { authentication } from '../Firebase'

export const SignIn: React.FC = () => {
    const usernameRef = useRef<HTMLIonInputElement>(null)
    const passwordRef = useRef<HTMLIonInputElement>(null)

    const submitForm = () => {
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value
        authentication
            .signInWithEmailAndPassword(
                !username ? '' : username.toString(),
                !password ? '' : password.toString()
            )
            .catch((e) => console.error(e))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Sign in</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonInput ref={usernameRef} placeholder="username" />
                    </IonItem>
                    <IonItem>
                        <IonInput ref={passwordRef} placeholder="password" />
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={submitForm}>Submit</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
