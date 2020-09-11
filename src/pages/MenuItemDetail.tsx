import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonSlide,
    IonSlides,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AppContext } from '../AppContext'
import { allItemsOfMenu } from '../data/models/Menu'
import { storageRef } from '../Firebase'
import { isDesktop } from '../util/platform'
import './MenuItemDetail.scss'

export const MenuItemDetail: React.FC<RouteComponentProps<{ id: string }>> = ({
    match,
}) => {
    const appContext = useContext(AppContext)
    const item = allItemsOfMenu(appContext.menu).find(
        (item) => item.id === match.params.id
    )!
    const [picSrcs, setPicSrcs] = useState<string[]>(
        new Array(item?.numPics).fill('')
    )
    const [leftButtonDisabled, setLeftButtonDisabled] = useState(true)
    const [rightButtonDisabled, setRightButtonDisabled] = useState(false)

    const imgSlides = useRef<HTMLIonSlidesElement>(null)

    const fetchImgUrls = async () => {
        if (item === undefined) return
        const newPicSrcs = []
        for (const pic of (await storageRef.child('img/menu').listAll()).items)
            if (pic.name.startsWith(item.id))
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
                        <IonBackButton defaultHref="/tabs/menu" />
                    </IonButtons>
                    <IonTitle>{item.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader className="slider-container">
                    <IonButtons className="left-button" hidden={!isDesktop()}>
                        <IonButton
                            shape="round"
                            fill="solid"
                            color="light"
                            onClick={() => imgSlides.current?.slidePrev()}
                            disabled={leftButtonDisabled}
                        >
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonSlides
                        ref={imgSlides}
                        pager
                        onIonSlideDidChange={() => {
                            imgSlides.current
                                ?.isBeginning()
                                .then((val) => setLeftButtonDisabled(val))
                            imgSlides.current
                                ?.isEnd()
                                .then((val) => setRightButtonDisabled(val))
                        }}
                    >
                        {picSrcs.map((picSrc, picSrcIndex) => (
                            <IonSlide key={picSrcIndex}>
                                <IonImg src={picSrc} />
                            </IonSlide>
                        ))}
                    </IonSlides>
                    <IonButtons className="right-button" hidden={!isDesktop()}>
                        <IonButton
                            shape="round"
                            fill="solid"
                            color="light"
                            onClick={() => imgSlides.current?.slideNext()}
                            disabled={rightButtonDisabled}
                        >
                            <IonIcon
                                slot="icon-only"
                                icon={arrowForwardOutline}
                            />
                        </IonButton>
                    </IonButtons>
                </IonHeader>
                <IonList>
                    <IonListHeader>
                        <IonTitle>{item.name}</IonTitle>
                    </IonListHeader>
                    <IonItem>
                        <IonLabel class="ion-text-wrap">
                            {item.description}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>${item.price}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonList>
                            <IonItem>{item.macros.cals} calories</IonItem>
                            <IonItem>{item.macros.carbs}g carbs</IonItem>
                            <IonItem>{item.macros.protein}g protein</IonItem>
                            <IonItem>{item.macros.fat}g fat</IonItem>
                        </IonList>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
