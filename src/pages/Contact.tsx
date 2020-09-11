import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { sendOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import { storageRef } from '../Firebase'
import './Contact.scss'

export const Contact: React.FC = () => {
    const appContext = useContext(AppContext)
    const [name, setName] = useState(appContext.user?.displayName)
    const [email, setEmail] = useState(appContext.user?.email)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [formSubmitted, setFormSubmitted] = useState('')
    const [messageError, setMessageError] = useState(false)
    const [logoSrc, setLogoSrc] = useState('')

    const submit = (e: React.FormEvent) => {}

    const fetchSrcs = async () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            setLogoSrc(
                await storageRef.child('img/icon-dark.png').getDownloadURL()
            )
        else
            setLogoSrc(
                await storageRef.child('img/icon-light.png').getDownloadURL()
            )
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', async (e) => {
                setLogoSrc(
                    e.matches
                        ? await storageRef
                              .child('img/icon-dark.png')
                              .getDownloadURL()
                        : await storageRef
                              .child('img/icon-light.png')
                              .getDownloadURL()
                )
            })
    }
    useEffect(() => {
        fetchSrcs().catch((e) => console.error(e))
    }, [])

    return (
        <IonPage id="contact-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Contact</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="login-logo ion-text-center">
                    <img src={logoSrc} />
                </div>
                <IonList class="ion-no-margin ion-no-padding">
                    <IonItem>
                        <IonLabel position="stacked" color="primary">
                            Name&nbsp;<IonText color="danger">*</IonText>
                        </IonLabel>
                        <IonInput
                            name="name"
                            value={name}
                            autoCapitalize="on"
                            onIonChange={(e) => setName(e.detail.value!)}
                            clearInput
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" color="primary">
                            Email&nbsp;<IonText color="danger">*</IonText>
                        </IonLabel>
                        <IonInput
                            name="email"
                            type="email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)}
                            clearInput
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" color="primary">
                            Subject&nbsp;<IonText color="danger">*</IonText>
                        </IonLabel>
                        <IonInput
                            name="subject"
                            value={subject}
                            autoCapitalize="on"
                            autoCorrect="on"
                            onIonChange={(e) => setSubject(e.detail.value!)}
                            clearInput
                            required
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" color="primary">
                            Enter your message below&nbsp;
                            <IonText color="danger">*</IonText>
                        </IonLabel>
                        <IonTextarea
                            name="message"
                            value={message}
                            rows={6}
                            autoCapitalize="on"
                            autoCorrect="on"
                            onIonChange={(e) => setMessage(e.detail.value!)}
                            required
                        />
                    </IonItem>

                    {formSubmitted && messageError && (
                        <IonText color="danger">
                            <p className="ion-padding-start">
                                Message is required
                            </p>
                        </IonText>
                    )}
                </IonList>

                <IonRow>
                    <IonCol>
                        <IonButton
                            type="submit"
                            onClick={submit}
                            expand="block"
                        >
                            Submit&nbsp;
                            <IonIcon icon={sendOutline} />
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}
