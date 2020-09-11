import React, { useContext, useState } from 'react'
import {
    IonAlert,
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
import { RouteComponentProps, useHistory } from 'react-router'
import { AppContext } from '../AppContext'
import { deleteGroupDb, updateGroupDb } from '../data/models/Menu'

export const EditGroup: React.FC<RouteComponentProps<{
    group: string
}>> = ({ match }) => {
    const appContext = useContext(AppContext)

    const group = appContext.menu.groups.find(
        (group) => group.id === match.params.group
    )

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [groupName, setGroupName] = useState(group ? group.name : '')

    const history = useHistory()

    if (!group) return <></>

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account/admin/menu" />
                    </IonButtons>
                    <IonTitle>Edit Group: {group.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            disabled={saveButtonDisabled}
                            onClick={() =>
                                updateGroupDb(appContext.menu, group, {
                                    id: group.id,
                                    name: groupName,
                                    items: group.items,
                                }).catch((e) => console.log(e))
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
                        <IonLabel slot="end">{group.id}</IonLabel>
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
                <IonButton onClick={() => setShowDeleteAlert(true)}>
                    Delete Group
                </IonButton>
                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => setShowDeleteAlert(false)}
                    header="Delete Group?"
                    message="This action cannot be undone. Are you sure?"
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                        },
                        {
                            text: 'Yes',
                            handler: () => {
                                deleteGroupDb(appContext.menu, group)
                                    .catch((e) => console.error(e))
                                    .finally(() => history.goBack())
                            },
                        },
                    ]}
                />
            </IonContent>
        </IonPage>
    )
}
