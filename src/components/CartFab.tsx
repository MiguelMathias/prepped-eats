import { IonBadge, IonFab, IonFabButton, IonIcon, IonModal } from '@ionic/react'
import { cartOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppContext'
import { Cart } from './Cart'

interface CartFabProps {
    menuPage: HTMLElement | null
    forceUpdateMenu: () => void
}

export const CartFab: React.FC<CartFabProps> = ({
    menuPage,
    forceUpdateMenu,
}) => {
    const appContext = useContext(AppContext)
    const [showCartModal, setShowCartModal] = useState(false)
    const [cartQuantity, setCartQuantity] = useState(
        appContext.cart.menuItemOrders.length +
            appContext.cart.planItemOrders.length
    )

    useEffect(() => {
        setCartQuantity(
            appContext.cart.menuItemOrders.length +
                appContext.cart.planItemOrders.length
        )
    }, [
        appContext.cart.menuItemOrders.length,
        appContext.cart.planItemOrders.length,
    ])

    return (
        <>
            <IonFab
                onClick={() => setShowCartModal(true)}
                vertical="bottom"
                horizontal="end"
            >
                <IonFabButton>
                    <IonIcon icon={cartOutline} />
                    <IonBadge color="secondary">{cartQuantity}</IonBadge>
                </IonFabButton>
            </IonFab>
            <IonModal
                isOpen={showCartModal}
                onDidDismiss={() => setShowCartModal(false)}
                swipeToClose={true}
                presentingElement={menuPage === null ? undefined : menuPage}
            >
                <Cart
                    onDismissModal={() => {
                        setShowCartModal(false)
                        forceUpdateMenu()
                    }}
                />
            </IonModal>
        </>
    )
}
