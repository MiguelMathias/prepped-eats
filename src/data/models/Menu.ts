import { toId } from '../../util/util'
import { database, storageRef } from '../../Firebase'

export interface MenuModel {
    groups: MenuGroupModel[]
}

export interface MenuGroupModel {
    name: string
    id: string
    items: MenuItemModel[]
}

export interface MenuItemModel {
    id: string
    name: string
    price: number
    description: string
    numPics: number
    dateAdded: string
    macros: MacroModel
}

export interface MacroModel {
    cals: string
    carbs: string
    protein: string
    fat: string
}

export const entreesOfMenu = (menu: MenuModel) =>
    menu.groups.filter((group) => group.id !== 'sides')

export const sidesOfMenu = (menu: MenuModel) =>
    menu.groups.find((group) => group.id === 'sides')!.items

export const allItemsOfMenu = (menu: MenuModel) =>
    menu.groups.reduce(
        (allEntrees, entreeGroup) => allEntrees.concat(entreeGroup.items),
        [] as MenuItemModel[]
    )

export const allItemsOfGroups = (groups: MenuGroupModel[]) =>
    groups.reduce(
        (allItems, group) => allItems.concat(group.items),
        [] as MenuItemModel[]
    )

export const updateMenuDb = async (
    menu: MenuModel,
    onComplete?: ((a: Error | null) => any) | undefined
) => await database.ref('/menu').set(menu, onComplete)

export const addGroupDb = async (menu: MenuModel, group: MenuGroupModel) => {
    menu.groups.push(group)
    await updateMenuDb(menu)
}

export const updateGroupDb = async (
    menu: MenuModel,
    group: MenuGroupModel,
    newGroup: MenuGroupModel
) => {
    const groupIndex = menu.groups.map(toId).indexOf(group.id)
    menu.groups.splice(groupIndex, 1, newGroup)
    await updateMenuDb(menu)
}

export const deleteGroupDb = async (menu: MenuModel, group: MenuGroupModel) => {
    await Promise.all(
        group.items.map((item) => deleteItemDb(menu, item, group))
    )
    menu.groups = menu.groups.filter((g) => g.id !== group.id)
    await updateMenuDb(menu)
}

export const addItemDb = async (
    menu: MenuModel,
    item: MenuItemModel,
    imgFileBlobs?: File[],
    group?: MenuGroupModel
) => {
    const itemGroup =
        group ||
        menu.groups.find((group) => group.items.map(toId).includes(item.id))!
    itemGroup.items.push(item)
    await updateMenuDb(menu)

    if (imgFileBlobs && imgFileBlobs.length > 0) {
        imgFileBlobs.forEach((imgFileBlob, index) => {
            storageRef
                .child('img/menu/' + item.id + '-' + (index + 1))
                .put(imgFileBlob)
        })
    }
}

export const updateItemDb = async (
    menu: MenuModel,
    item: MenuItemModel,
    newItem: MenuItemModel,
    imgFileBlobs?: File[],
    group?: MenuGroupModel
) => {
    const itemGroup =
        group ||
        menu.groups.find((group) => group.items.map(toId).includes(item.id))!

    itemGroup.items.splice(
        itemGroup.items.map(toId).indexOf(item.id),
        1,
        newItem
    )

    await updateMenuDb(menu)
    if (imgFileBlobs && imgFileBlobs.length > 0) {
        await Promise.all(
            (await storageRef.child('img/menu').listAll()).items
                .filter((pic) => pic.name.startsWith(item.id))
                .map((pic) => pic.delete())
        )

        await Promise.all(
            imgFileBlobs.map(async (imgFileBlob, index) =>
                storageRef
                    .child('img/menu/' + item.id + '-' + (index + 1))
                    .put(imgFileBlob)
            )
        )
    }
}

export const deleteItemDb = async (
    menu: MenuModel,
    item: MenuItemModel,
    group?: MenuGroupModel
) => {
    const itemGroup =
        group ||
        menu.groups.find((group) => group.items.map(toId).includes(item.id))!

    itemGroup.items = itemGroup.items.filter(
        (filteredItem) => filteredItem.id !== item.id
    )
    await updateMenuDb(menu)
    await Promise.all(
        (await storageRef.child('img/menu').listAll()).items
            .filter((pic) => pic.name.startsWith(item.id))
            .map((pic) => pic.delete())
    )
}
