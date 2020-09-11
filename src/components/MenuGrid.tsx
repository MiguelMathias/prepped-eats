import { IonCol, IonGrid, IonItemDivider, IonRow } from '@ionic/react'
import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import { allItemsOfGroups, MenuGroupModel } from '../data/models/Menu'
import { toId } from '../util/util'
import { MenuItem } from './MenuItem'

interface MenuGridProps {
    entrees: MenuGroupModel[]
    hidden: boolean
    forceUpdateMenu: () => void
}

export const MenuGrid: React.FC<MenuGridProps> = ({
    entrees,
    hidden,
    forceUpdateMenu,
}) => {
    const appContext = useContext(AppContext)

    if (!entrees || entrees.length === 0) {
        return <></>
    }

    const filteredMenu = () => {
        if (appContext.searchText.length === 0) return entrees
        const newGroups = entrees
            .map((group) => {
                return {
                    ...group,
                    items: group.items.filter(
                        (item) =>
                            item.name
                                .toLowerCase()
                                .includes(
                                    appContext.searchText.trim().toLowerCase()
                                ) ||
                            group.name
                                .toLowerCase()
                                .includes(
                                    appContext.searchText.trim().toLowerCase()
                                )
                    ),
                } as MenuGroupModel
            })
            .filter((group) => {
                return group.items.length > 0
            })
        return newGroups
    }

    const getEntreeComponents = () =>
        entrees.map((group) => (
            <React.Fragment key={group.id}>
                <IonItemDivider sticky>{group.name}</IonItemDivider>
                {group.items.map((item) => (
                    <IonCol
                        sizeMd="6"
                        key={item.id}
                        hidden={
                            !allItemsOfGroups(filteredMenu())
                                .map(toId)
                                .includes(item.id)
                        }
                    >
                        <MenuItem
                            item={item}
                            hidden={
                                !allItemsOfGroups(filteredMenu())
                                    .map((item) => item.id)
                                    .includes(item.id)
                            }
                            forceUpdateMenu={forceUpdateMenu}
                        />
                    </IonCol>
                ))}
            </React.Fragment>
        ))

    return (
        <IonGrid hidden={hidden}>
            <IonRow>{getEntreeComponents()}</IonRow>
        </IonGrid>
    )
}
