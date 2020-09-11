import React, { useContext, useEffect, useRef, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router'
import { AppContext } from '../AppContext'
import { deleteItemDb, updateItemDb } from '../data/models/Menu'
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { storageRef } from '../Firebase'
import './EditMenuItem.scss'

export const EditMenuItem: React.FC<RouteComponentProps<{
    group: string
    id: string
}>> = ({ match }) => {
    const appContext = useContext(AppContext)
    const group = appContext.menu.groups.find(
        (group) => group.id === match.params.group
    )
    const item = group?.items.find((item) => item.id === match.params.id)

    const [itemName, setItemName] = useState(item ? item.name : '')
    const [itemDescription, setItemDescription] = useState(
        item ? item.description : ''
    )
    const [itemDateAdded, setItemDateAdded] = useState(
        item ? item.dateAdded : ''
    )
    const [itemPrice, setItemPrice] = useState(
        item ? item.price.toString() : ''
    )
    const [itemCals, setItemCals] = useState(item ? item.macros.cals : '')
    const [itemCarbs, setItemCarbs] = useState(item ? item.macros.carbs : '')
    const [itemProtein, setItemProtein] = useState(
        item ? item.macros.protein : ''
    )
    const [itemFat, setItemFat] = useState(item ? item.macros.fat : '')
    const [itemNumPics, setItemNumPics] = useState(item ? item.numPics : 0)
    const [picSrcs, setPicSrcs] = useState<string[]>(
        new Array(item?.numPics).fill('')
    )
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)

    const history = useHistory()

    const imgFileBlobs = useRef<File[]>([])

    const fetchImgUrls = async () => {
        if (!item) return

        const newPicSrcs = []
        for (const pic of (await storageRef.child('img/menu').listAll()).items)
            if (pic.name.startsWith(item.id))
                newPicSrcs.push(await pic.getDownloadURL())
        setPicSrcs(newPicSrcs)
    }
    useEffect(() => {
        fetchImgUrls().catch((e) => console.error(e))
    }, [])

    if (!item || !group) return <></>

    const saveChanges = () => {
        const newItem = {
            id: item.id,
            name: itemName,
            description: itemDescription,
            price: +itemPrice,
            dateAdded: itemDateAdded,
            macros: {
                cals: itemCals,
                carbs: itemCarbs,
                protein: itemProtein,
                fat: itemFat,
            },
            numPics: itemNumPics,
        }

        updateItemDb(
            appContext.menu,
            item,
            newItem,
            imgFileBlobs.current
        ).catch((e) => console.error(e))
        setSaveButtonDisabled(true)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account/admin/menu" />
                    </IonButtons>
                    <IonTitle>Edit Menu Item: {item.name}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            disabled={saveButtonDisabled}
                            onClick={saveChanges}
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
                        <IonLabel slot="end">{item.id}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Name</IonLabel>
                        <IonInput
                            placeholder="Name"
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setItemName(e.detail.value || '')
                            }}
                            slot="end"
                            value={itemName}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Description</IonLabel>
                        <IonTextarea
                            placeholder="Description"
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setItemDescription(e.detail.value || '')
                            }}
                            slot="end"
                            value={itemDescription}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Price</IonLabel>
                        <IonInput
                            placeholder="Price"
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setItemPrice(e.detail.value || '')
                            }}
                            slot="end"
                            value={itemPrice}
                            inputMode="numeric"
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Date Updated/Added</IonLabel>
                        <IonDatetime
                            value={itemDateAdded}
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setItemDateAdded(e.detail.value || Date())
                            }}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>Macros</IonLabel>
                        <IonList slot="end">
                            <IonItem>
                                <IonLabel>Calories</IonLabel>
                                <IonInput
                                    placeholder="Calories"
                                    onIonChange={(e) => {
                                        setSaveButtonDisabled(false)
                                        setItemCals(e.detail.value || '')
                                    }}
                                    slot="end"
                                    value={itemCals}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Carbs (g)</IonLabel>
                                <IonInput
                                    placeholder="Carbs"
                                    onIonChange={(e) => {
                                        setSaveButtonDisabled(false)
                                        setItemCarbs(e.detail.value || '')
                                    }}
                                    slot="end"
                                    value={itemCarbs}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Protein (g)</IonLabel>
                                <IonInput
                                    placeholder="Protein"
                                    onIonChange={(e) => {
                                        setSaveButtonDisabled(false)
                                        setItemProtein(e.detail.value || '')
                                    }}
                                    slot="end"
                                    value={itemProtein}
                                />
                            </IonItem>
                            <IonItem>
                                <IonLabel>Fat (g)</IonLabel>
                                <IonInput
                                    placeholder="Fat"
                                    onIonChange={(e) => {
                                        setSaveButtonDisabled(false)
                                        setItemFat(e.detail.value || '')
                                    }}
                                    slot="end"
                                    value={itemFat}
                                />
                            </IonItem>
                        </IonList>
                    </IonItem>
                    <IonItem>
                        <IonGrid>
                            <IonRow className="images-label-row">Images</IonRow>
                            <IonRow>
                                <input
                                    type="file"
                                    accept="image/jpeg"
                                    multiple
                                    onChange={(e) => {
                                        setSaveButtonDisabled(false)
                                        const fileList = e.target.files!
                                        let newPicSrcs: string[] = []
                                        let newImgFileBlobs: File[] = []
                                        for (
                                            let i = 0;
                                            i < fileList.length;
                                            i++
                                        ) {
                                            newPicSrcs.push(
                                                URL.createObjectURL(fileList[i])
                                            )
                                            newImgFileBlobs.push(fileList[i])
                                        }

                                        setItemNumPics(newImgFileBlobs.length)
                                        imgFileBlobs.current = newImgFileBlobs
                                        setPicSrcs(newPicSrcs)
                                    }}
                                />
                            </IonRow>
                        </IonGrid>
                        <IonGrid slot="end">
                            <IonRow>
                                {picSrcs.map((picSrc, picSrcIndex) => (
                                    <IonCol size="4" key={picSrcIndex}>
                                        <IonImg src={picSrc} />
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
                <IonButton onClick={() => setShowDeleteAlert(true)}>
                    Delete Item
                </IonButton>
                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={() => setShowDeleteAlert(false)}
                    header="Delete Item?"
                    message="This action cannot be undone. Are you sure?"
                    buttons={[
                        {
                            text: 'No',
                            role: 'cancel',
                        },
                        {
                            text: 'Yes',
                            handler: () => {
                                deleteItemDb(appContext.menu, item, group)
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
