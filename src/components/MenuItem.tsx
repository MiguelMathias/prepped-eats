import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonPicker,
    IonRouterLink,
    IonSlide,
    IonSlides,
} from '@ionic/react'
import {
    addOutline,
    arrowBackOutline,
    arrowForwardOutline,
    star,
    starOutline,
} from 'ionicons/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../AppContext'
import { MenuItemModel, sidesOfMenu } from '../data/models/Menu'
import { firestore, storageRef } from '../Firebase'
import { isDesktop } from '../util/platform'
import { distinct, getDefaultDeliveryDate } from '../util/util'
import './MenuItem.scss'
import { addCartMenuItemFS, MenuCartItemOptions } from '../data/models/Cart'

interface MenuItemProps {
    item: MenuItemModel
    hidden: boolean
    forceUpdateMenu: () => void
}

export const MenuItem: React.FC<MenuItemProps> = ({
    item,
    hidden,
    forceUpdateMenu,
}) => {
    const appContext = useContext(AppContext)
    const [picSrcs, setPicSrcs] = useState<string[]>(
        new Array(item.numPics).fill('')
    )
    const [localQuantity, setLocalQuantity] = useState(
        appContext.cart.menuItemOrders
            ? appContext.cart.menuItemOrders.filter(
                  (menuItemOrder) => menuItemOrder.entreeId === item.id
              ).length
            : 0
    )
    const [leftButtonDisabled, setLeftButtonDisabled] = useState(true)
    const [rightButtonDisabled, setRightButtonDisabled] = useState(
        item.numPics < 2
    )
    const [navButtonsHidden, setNavButtonsHidden] = useState(true)
    const [isFavorite, setIsFavorite] = useState(
        appContext.userData.favorites.includes(item.id)
    )
    const [sidePickerOpen, setSidePickerOpen] = useState(false)

    const imgSlides = useRef<HTMLIonSlidesElement>(null)

    const fetchImgUrls = async () => {
        const newPicSrcs = []
        for (const pic of (await storageRef.child('img/menu').listAll()).items)
            if (pic.name.startsWith(item.id))
                newPicSrcs.push(await pic.getDownloadURL())

        setPicSrcs(newPicSrcs)
    }

    useEffect(() => {
        fetchImgUrls().catch((e) => console.error(e))
        setIsFavorite(appContext.userData.favorites.includes(item.id))
        setLocalQuantity(
            appContext.cart.menuItemOrders.filter(
                (menuItemOrder) => menuItemOrder.entreeId === item.id
            ).length
        )
    }, [
        JSON.stringify(appContext.cart.menuItemOrders),
        appContext.userData.favorites,
    ])

    return (
        <>
            <IonCard className="menu-item-card" hidden={hidden}>
                <IonHeader
                    className="slider-container"
                    onMouseEnter={() => setNavButtonsHidden(false)}
                    onMouseLeave={() => setNavButtonsHidden(true)}
                >
                    <IonButtons className="left-button" hidden={!isDesktop()}>
                        <IonButton
                            hidden={navButtonsHidden}
                            shape="round"
                            fill="solid"
                            color="transparent"
                            onClick={() => imgSlides.current?.slidePrev()}
                            disabled={leftButtonDisabled}
                        >
                            <IonIcon
                                slot="icon-only"
                                color="dark"
                                icon={arrowBackOutline}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonSlides
                        className="slides"
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
                                <IonImg src={picSrc} alt={item.name} />
                            </IonSlide>
                        ))}
                    </IonSlides>
                    <IonButtons className="favorite-button">
                        <IonButton
                            shape="round"
                            fill="solid"
                            color="transparent"
                            onClick={() => {
                                const newFavorites = appContext.userData.favorites.includes(
                                    item.id
                                )
                                    ? appContext.userData.favorites.filter(
                                          (favItemId) => favItemId !== item.id
                                      )
                                    : appContext.userData.favorites
                                          .concat(item.id)
                                          .filter(distinct)

                                const newUserData = appContext.userData
                                newUserData.favorites = newFavorites
                                firestore
                                    .collection('users')
                                    .doc(appContext.user?.uid)
                                    .set(appContext.userData)
                                    .then(() => {
                                        appContext.setUserData(newUserData)
                                    })

                                setIsFavorite(
                                    appContext.userData.favorites.includes(
                                        item.id
                                    )
                                )
                            }}
                        >
                            <IonIcon
                                color="dark"
                                slot="icon-only"
                                icon={isFavorite ? star : starOutline}
                            />
                        </IonButton>
                    </IonButtons>
                    <IonButtons className="right-button" hidden={!isDesktop()}>
                        <IonButton
                            hidden={navButtonsHidden}
                            shape="round"
                            fill="solid"
                            color="transparent"
                            onClick={() => imgSlides.current?.slideNext()}
                            disabled={rightButtonDisabled}
                        >
                            <IonIcon
                                slot="icon-only"
                                color="dark"
                                icon={arrowForwardOutline}
                            />
                        </IonButton>
                    </IonButtons>
                </IonHeader>
                <IonCardHeader>
                    <IonRouterLink
                        routerLink={`/tabs/menu/${item.id}`}
                        routerDirection="forward"
                    >
                        <IonCardTitle>
                            {item.name +
                                ((Date.now() - Date.parse(item.dateAdded)) /
                                    (1000 * 3600 * 24) <
                                14
                                    ? ' *NEW*'
                                    : '')}
                        </IonCardTitle>
                    </IonRouterLink>
                </IonCardHeader>
                <IonCardContent>
                    <IonLabel class="ion-text-nowrap description-label">
                        <p>{item.description}</p>
                    </IonLabel>
                    <IonItem lines="none">
                        <IonLabel>${item.price}</IonLabel>
                        <IonButtons slot="end">
                            <IonLabel>{localQuantity}</IonLabel>
                            <IonButton
                                onClick={() => {
                                    setSidePickerOpen(true)
                                }}
                            >
                                <IonIcon slot="icon-only" icon={addOutline} />
                            </IonButton>
                        </IonButtons>
                    </IonItem>
                </IonCardContent>
            </IonCard>
            <IonPicker
                isOpen={sidePickerOpen}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setSidePickerOpen(false)
                        },
                    },
                    {
                        text: 'Confirm',
                        handler: (value) => {
                            addCartMenuItemFS(
                                appContext.user,
                                appContext.userData,
                                appContext.cart,
                                {
                                    entreeId: item.id,
                                    options: {
                                        extraEntree: false,
                                        sideId: sidesOfMenu(
                                            appContext.menu
                                        ).find(
                                            (side) =>
                                                side.id === value.sides.value
                                        )!.id,
                                        deliveryDate: getDefaultDeliveryDate(),
                                    } as MenuCartItemOptions,
                                }
                            ).catch((e) => console.log(e))

                            setSidePickerOpen(false)
                            forceUpdateMenu()
                        },
                    },
                ]}
                columns={[
                    {
                        name: 'sides',
                        options: sidesOfMenu(appContext.menu).map((side) => {
                            return { text: side.name, value: side.id }
                        }),
                    },
                ]}
            />
        </>
    )
}
