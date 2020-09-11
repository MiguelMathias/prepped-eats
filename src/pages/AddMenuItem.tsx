import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppContext'
import { addItemDb, MenuItemModel } from '../data/models/Menu'
import {
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
import { RouteComponentProps } from 'react-router'

export const AddMenuItem: React.FC<RouteComponentProps<{
    group: string
}>> = ({ match }) => {
    const appContext = useContext(AppContext)

    const item = {
        id: '',
        name: '',
        description: '',
        dateAdded: new Date().toDateString(),
        price: 0,
        macros: {
            cals: '',
            carbs: '',
            protein: '',
            fat: '',
        },
        numPics: 0,
    } as MenuItemModel

    const [itemId, setItemId] = useState(item.id)
    const [itemName, setItemName] = useState(item.name)
    const [itemDescription, setItemDescription] = useState(item.description)
    const [itemDateAdded, setItemDateAdded] = useState(item.dateAdded)
    const [itemPrice, setItemPrice] = useState(item.price.toString())
    const [itemCals, setItemCals] = useState(item.macros.cals)
    const [itemCarbs, setItemCarbs] = useState(item.macros.carbs)
    const [itemProtein, setItemProtein] = useState(item.macros.protein)
    const [itemFat, setItemFat] = useState(item.macros.fat)
    const [itemNumPics, setItemNumPics] = useState(item.numPics)
    const [picSrcs, setPicSrcs] = useState<string[]>(
        new Array(item.numPics).fill('')
    )

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)

    const imgFileBlobs = useRef<File[]>([])

    const fetchImgUrls = async () => {
        if (itemId.length <= 0) return
        const newPicSrcs = []
        for (const pic of (await storageRef.child('img/menu').listAll()).items)
            if (pic.name.startsWith(itemId))
                newPicSrcs.push(await pic.getDownloadURL())
        setPicSrcs(newPicSrcs)
    }
    useEffect(() => {
        fetchImgUrls().catch((e) => console.error(e))
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account/admin/menu" />
                    </IonButtons>
                    <IonTitle>Add Menu Item: {itemName}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            disabled={saveButtonDisabled}
                            onClick={() =>
                                addItemDb(
                                    appContext.menu,
                                    {
                                        id: itemId,
                                        name: itemName,
                                        price: +itemPrice,
                                        description: itemDescription,
                                        numPics: itemNumPics,
                                        dateAdded: itemDateAdded,
                                        macros: {
                                            cals: itemCals,
                                            carbs: itemCarbs,
                                            protein: itemProtein,
                                            fat: itemFat,
                                        },
                                    },
                                    imgFileBlobs.current,
                                    appContext.menu.groups.find(
                                        (group) =>
                                            group.id === match.params.group
                                    )
                                ).catch((e) => console.error(e))
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
                            placeholder="UID"
                            onIonChange={(e) => {
                                setSaveButtonDisabled(false)
                                setItemId(
                                    e.detail.value
                                        ? e.detail.value.trim().toLowerCase()
                                        : ''
                                )
                            }}
                            slot="end"
                            value={itemId}
                        />
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
                                <IonLabel>Carbs</IonLabel>
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
                                <IonLabel>Protein</IonLabel>
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
                                <IonLabel>Fat</IonLabel>
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
            </IonContent>
        </IonPage>
    )
}
