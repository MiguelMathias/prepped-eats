import { updateUserFS, UserDataModel } from './User'
import { User } from 'firebase'

export interface CartModel {
    menuItemOrders: MenuCartItem[]
    planItemOrders: PlanCartItem[]
}

export interface MenuCartItem {
    entreeId: string
    options: MenuCartItemOptions
}

export interface PlanCartItem {
    planId: string
    options: PlanCartItemOptions
}

export interface MenuCartItemOptions {
    extraEntree: boolean
    sideId: string
    deliveryDate: string
}

export interface PlanCartItemOptions {
    menuItemOrderList: MenuCartItem[]
    startDate: string
}

export const addCartMenuItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    menuCartItem: MenuCartItem
) => {
    cart.menuItemOrders.push(menuCartItem)
    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}

export const updateCartMenuItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    menuCartItem: MenuCartItem,
    newMenuCartItem: MenuCartItem
) => {
    cart.menuItemOrders.splice(
        cart.menuItemOrders.indexOf(menuCartItem),
        1,
        newMenuCartItem
    )
    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}

export const deleteCartMenuItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    menuCartItem: MenuCartItem
) => {
    cart.menuItemOrders.splice(cart.menuItemOrders.indexOf(menuCartItem), 1)

    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}

export const addCartPlanItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    planCartItem: PlanCartItem
) => {
    cart.planItemOrders.push(planCartItem)
    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}

export const updateCartPlanItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    planCartItem: PlanCartItem,
    newPlanCartItem: PlanCartItem
) => {
    cart.planItemOrders.splice(
        cart.planItemOrders.indexOf(planCartItem),
        1,
        newPlanCartItem
    )
    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}

export const deleteCartPlanItemFS = async (
    user: User | null,
    userDataModel: UserDataModel,
    cart: CartModel,
    planCartItem: PlanCartItem
) => {
    cart.planItemOrders.splice(cart.planItemOrders.indexOf(planCartItem), 1)

    userDataModel.cartJSON = JSON.stringify(cart)
    await updateUserFS(user, userDataModel)
}
