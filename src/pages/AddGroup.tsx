import React, { useContext, useState } from 'react'
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { AppContext } from '../AppContext'
import { addGroupDb } from '../data/models/Menu'

export const AddGroup: React.FC = () => {
    const appContext = useContext(AppContext)

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [groupId, setGroupId] = useState('')
    const [groupName, setGroupName] = useState('')

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account/admin/menu" />
                    </IonButtons>
                    <IonTitle>Add Group: {groupName}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            disabled={saveButtonDisabled}
                            onClick={() =>
                                addGroupDb(appContext.menu, {
                                    id: groupId,
                                    name: groupName,
                                    items: [],
                                })
                            }
                            routerLink="/account/admin/menu"
                            routerDirection="back"
                        >
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>UID</IonLabel>
                        <IonInput
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setGroupId(e.detail.value || '')
                            }}
                            slot="end"
                            value={groupId}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Name</IonLabel>
                        <IonInput
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setGroupName(e.detail.value || '')
                            }}
                            slot="end"
                            value={groupName}
                        />
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
