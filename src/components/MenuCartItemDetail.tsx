import {
    IonCheckbox,
    IonDatetime,
    IonItem,
    IonLabel,
    IonList,
    IonPicker,
} from '@ionic/react'
import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import { MenuCartItem } from '../data/models/Cart'
import { addWorkDays, getDefaultDeliveryDate } from '../util/util'
import { sidesOfMenu } from '../data/models/Menu'

interface MenuCartItemDetailProps {
    item: MenuCartItem
}

export const MenuCartItemDetail: React.FC<MenuCartItemDetailProps> = ({
    item,
}) => {
    const appContext = useContext(AppContext)
    const [sidesPickerOpen, setSidesPickerOpen] = useState(false)
    const [extraEntree, setExtraEntree] = useState(item.options.extraEntree)
    const [pickedSide, setPickedSide] = useState(
        sidesOfMenu(appContext.menu).find(
            (side) => side.id === item.options.sideId
        )?.name
    )
    const [deliveryDate, setDeliveryDate] = useState(item.options.deliveryDate)

    return (
        <>
            <IonList>
                <IonItem
                    button
                    onClick={() => {
                        item.options.extraEntree = !item.options.extraEntree
                        appContext.setCart(appContext.cart)
                        setExtraEntree(!extraEntree)
                    }}
                >
                    <IonLabel slot="start">Extra Entree? (+$2.00)</IonLabel>
                    <IonCheckbox slot="end" checked={extraEntree} />
                </IonItem>
                <IonItem
                    button
                    onClick={() => setSidesPickerOpen(!sidesPickerOpen)}
                >
                    <IonLabel>Side</IonLabel>
                    <IonLabel className="ion-text-right">
                        {pickedSide || 'Pick a side'}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Delivery Date</IonLabel>
                    <IonDatetime
                        value={deliveryDate}
                        onIonChange={(e) => {
                            setDeliveryDate(e.detail.value!)
                            item.options.deliveryDate = e.detail.value!
                            appContext.setCart(appContext.cart)
                        }}
                        min={getDefaultDeliveryDate()}
                        max={addWorkDays(new Date(), 20).toISOString()}
                    />
                </IonItem>
            </IonList>
            <IonPicker
                isOpen={sidesPickerOpen}
                columns={[
                    {
                        name: 'sides',
                        selectedIndex: sidesOfMenu(appContext.menu)
                            .map((side) => side.id)
                            .indexOf(item.options.sideId),
                        options: sidesOfMenu(appContext.menu).map((side) => {
                            return { text: side.name, value: side.id }
                        }),
                    },
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setSidesPickerOpen(false)
                        },
                    },
                    {
                        text: 'Confirm',
                        handler: (value) => {
                            const side = sidesOfMenu(appContext.menu).find(
                                (side) => side.id === value.sides.value
                            )
                            item.options.sideId = side!.id
                            appContext.setCart(appContext.cart)
                            setPickedSide(side!.name)
                            setSidesPickerOpen(false)
                        },
                    },
                ]}
            />
        </>
    )
}
