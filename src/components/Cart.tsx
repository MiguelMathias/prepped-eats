import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItemDivider,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { arrowBackOutline, closeOutline, sendOutline } from 'ionicons/icons'
import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import { MenuCartItemComp } from './MenuCartItemComp'
import { PlanCartItemComp } from './PlanCartItemComp'
import { MenuCartItemDetail } from './MenuCartItemDetail'
import { useForceUpdate } from '../util/util'
import { PlanCartItemDetail } from './PlanCartItemDetail'

interface CartProps {
    onDismissModal: () => void
}

export const Cart: React.FC<CartProps> = ({ onDismissModal }) => {
    const appContext = useContext(AppContext)
    const [comp, setComp] = useState<string | null>(null)
    const forceUpdate = useForceUpdate()

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons
                        onClick={() => {
                            if (!comp) onDismissModal()
                            else setComp(null)
                        }}
                        slot="start"
                    >
                        <IonButton>
                            {(() => {
                                if (!comp)
                                    return (
                                        <>
                                            <IonIcon icon={closeOutline} />
                                            &nbsp;Cancel
                                        </>
                                    )
                                else
                                    return (
                                        <>
                                            <IonIcon icon={arrowBackOutline} />
                                            &nbsp;Back
                                        </>
                                    )
                            })()}
                        </IonButton>
                    </IonButtons>
                    <IonTitle class="ion-text-center">
                        {(() => {
                            if (!comp) return 'Cart'
                            else return 'Customize Item'
                        })()}
                    </IonTitle>
                    {(() => {
                        if (!comp)
                            return (
                                <IonButtons slot="end">
                                    <IonButton>
                                        Submit Order&nbsp;
                                        <IonIcon icon={sendOutline} />
                                    </IonButton>
                                </IonButtons>
                            )
                        else return <></>
                    })()}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {appContext.cart.menuItemOrders.length === 0 &&
                appContext.cart.planItemOrders.length === 0 ? (
                    <IonTitle className="ion-text-center ion-padding-top">
                        Your cart is empty!
                    </IonTitle>
                ) : (
                    <>
                        {(() => {
                            if (!comp)
                                return (
                                    <IonList>
                                        <IonItemDivider
                                            sticky
                                            hidden={
                                                appContext.cart.menuItemOrders
                                                    .length <= 0
                                            }
                                        >
                                            Meals
                                        </IonItemDivider>
                                        {appContext.cart.menuItemOrders.map(
                                            (menuCartItem, index) => (
                                                <MenuCartItemComp
                                                    key={index}
                                                    item={menuCartItem}
                                                    setComp={setComp}
                                                    forceUpdateParent={
                                                        forceUpdate
                                                    }
                                                />
                                            )
                                        )}
                                        <IonItemDivider
                                            sticky
                                            hidden={
                                                appContext.cart.planItemOrders
                                                    .length <= 0
                                            }
                                        >
                                            Plans
                                        </IonItemDivider>
                                        {appContext.cart.planItemOrders.map(
                                            (planCartItem) => (
                                                <PlanCartItemComp
                                                    key={planCartItem.planId}
                                                    item={planCartItem}
                                                />
                                            )
                                        )}
                                    </IonList>
                                )
                            else if (
                                appContext.cart.planItemOrders
                                    .map((item) => item.planId)
                                    .includes(comp)
                            )
                                return (
                                    <PlanCartItemDetail
                                        item={
                                            appContext.cart.planItemOrders.find(
                                                (item) => item.planId === comp
                                            )!
                                        }
                                    />
                                )
                            else
                                return (
                                    <MenuCartItemDetail
                                        item={
                                            appContext.cart.menuItemOrders.find(
                                                (item) => item.entreeId === comp
                                            )!
                                        }
                                    />
                                )
                        })()}
                    </>
                )}
            </IonContent>
        </>
    )
}
