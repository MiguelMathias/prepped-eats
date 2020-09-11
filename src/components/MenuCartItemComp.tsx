import { IonButton, IonButtons, IonIcon, IonItem, IonLabel } from '@ionic/react'
import { removeOutline } from 'ionicons/icons'
import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { deleteCartMenuItemFS, MenuCartItem } from '../data/models/Cart'
import { allItemsOfMenu } from '../data/models/Menu'

interface MenuCartItemProps {
    item: MenuCartItem
    setComp: (str: string) => void
    forceUpdateParent: () => void
}

export const MenuCartItemComp: React.FC<MenuCartItemProps> = ({
    item,
    setComp,
    forceUpdateParent,
}) => {
    const appContext = useContext(AppContext)

    return (
        <IonItem
            detail
            onClick={() => {
                if (
                    appContext.cart.menuItemOrders
                        .map((item) => item.entreeId)
                        .includes(item.entreeId)
                )
                    setComp(item.entreeId)
            }}
            type="submit"
            button
        >
            <IonButtons>
                <IonButton
                    onClick={() => {
                        deleteCartMenuItemFS(
                            appContext.user,
                            appContext.userData,
                            appContext.cart,
                            item
                        ).catch((e) => console.error(e))
                        forceUpdateParent()
                    }}
                >
                    <IonIcon slot="icon-only" icon={removeOutline} />
                </IonButton>
            </IonButtons>
            <IonLabel>
                {
                    allItemsOfMenu(appContext.menu).find(
                        (entree) => entree.id === item.entreeId
                    )!.name
                }
            </IonLabel>
        </IonItem>
    )
}
