import React, { useContext, useState } from 'react'
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { AppContext } from '../AppContext'
import { updateUserFS } from '../data/models/User'

export const User: React.FC = () => {
    const appContext = useContext(AppContext)

    const [name, setName] = useState(appContext.user?.displayName)
    const [email, setEmail] = useState(appContext.user?.email || undefined)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [street, setStreet] = useState(
        appContext.userData.address.split('\n')[0]
    )
    const [cityStZip, setCityStZip] = useState(
        appContext.userData.address.split('\n')[1]
    )

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account" />
                    </IonButtons>
                    <IonTitle>Edit Profile</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            routerLink="/account"
                            routerDirection="back"
                            onClick={() => {
                                appContext.userData.address =
                                    street + '\n' + cityStZip
                                updateUserFS(
                                    appContext.user,
                                    appContext.userData,
                                    {
                                        email: email,
                                        password:
                                            password.length > 0 &&
                                            password === confirmPassword
                                                ? password
                                                : undefined,
                                        profile: { displayName: name },
                                    }
                                ).catch((e) => console.error(e))
                            }}
                        >
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel slot="start">Name</IonLabel>
                        <IonInput
                            placeholder="Name"
                            slot="end"
                            value={name}
                            onIonChange={(e) => setName(e.detail.value || '')}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Email</IonLabel>
                        <IonInput
                            placeholder="Email"
                            slot="end"
                            value={email}
                            onIonChange={(e) =>
                                setEmail(e.detail.value || undefined)
                            }
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Password</IonLabel>
                        <IonGrid slot="end">
                            <IonRow>
                                <IonInput
                                    placeholder="Password"
                                    value={password}
                                    onIonChange={(e) =>
                                        setPassword(e.detail.value || '')
                                    }
                                />
                            </IonRow>
                            <IonRow>
                                <IonInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onIonChange={(e) =>
                                        setConfirmPassword(e.detail.value || '')
                                    }
                                />
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                    <IonItem>
                        <IonLabel slot="start">Address</IonLabel>
                        <IonGrid slot="end">
                            <IonRow>
                                <IonInput
                                    placeholder="Street"
                                    value={street}
                                    onIonChange={(e) =>
                                        setStreet(e.detail.value || '')
                                    }
                                />
                            </IonRow>
                            <IonRow>
                                <IonInput
                                    placeholder="City, State ZIP"
                                    value={cityStZip}
                                    onIonChange={(e) =>
                                        setCityStZip(e.detail.value || '')
                                    }
                                />
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
