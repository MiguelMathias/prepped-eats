import firebase from 'firebase'
import React from 'react'
import { CartModel, MenuCartItem, PlanCartItem } from './data/models/Cart'
import { MenuModel } from './data/models/Menu'
import { OrderModel, OrdersModel } from './data/models/Order'
import { PlanItemModel } from './data/models/Plan'
import { UserDataModel } from './data/models/User'

export interface AppContextType {
    user: firebase.User | null
    setUser: (user: firebase.User) => void
    menu: MenuModel
    setMenu: (menu: MenuModel) => void
    plans: PlanItemModel[]
    setPlans: (plans: PlanItemModel[]) => void
    userData: UserDataModel
    setUserData: (userData: UserDataModel) => void
    cart: CartModel
    setCart: (cart: CartModel) => void
    orders: OrdersModel
    setOrders: (orders: OrdersModel) => void
    searchText: string
    setSearchText: (searchText: string) => void
}

export const AppContext = React.createContext({
    user: null as firebase.User | null,
    setUser: (user: firebase.User) => {},
    menu: { groups: [] } as MenuModel,
    setMenu: (menu: MenuModel) => {},
    plans: [] as PlanItemModel[],
    setPlans: (plans: PlanItemModel[]) => {},
    userData: {
        name: 'Anonymous',
        address: '',
        favorites: [] as string[],
        cartJSON: '{"menuItemOrders":[],"planItemOrders":[]}',
        ordersJSON: '{"orderModels":[]}',
    } as UserDataModel,

    setUserData: (userData: UserDataModel) => {},
    cart: {
        menuItemOrders: [] as MenuCartItem[],
        planItemOrders: [] as PlanCartItem[],
    },
    setCart: (cart: CartModel) => {},
    orders: { orderModels: [] as OrderModel[] },
    setOrders: (orders: OrdersModel) => {},
    searchText: '',
    setSearchText: (searchText: string) => {},
} as AppContextType)

export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer
