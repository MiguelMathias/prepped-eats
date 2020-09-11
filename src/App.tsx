import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/typography.css'
import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AppContextProvider } from './AppContext'
import { SideMenu } from './components/SideMenu'
import { CartModel } from './data/models/Cart'
import { MenuModel } from './data/models/Menu'
import { PlanItemModel } from './data/models/Plan'
import { UserDataModel, userIsAdmin } from './data/models/User'
import { authentication, database, firestore } from './Firebase'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import MainTabs from './pages/MainTabs'
/* Theme variables */
import './theme/variables.css'
import { OrdersModel } from './data/models/Order'
import { EditMenuItem } from './pages/EditMenuItem'
import { EditMenuItems } from './pages/EditMenuItems'
import { Account } from './pages/Account'
import { AddMenuItem } from './pages/AddMenuItem'
import { AddGroup } from './pages/AddGroup'
import { EditGroup } from './pages/EditGroup'
import { Admin } from './pages/Admin'
import { User } from './pages/User'
import { ProtectedRoute } from './components/ProtectedRoute'

const App: React.FC = () => {
    let [user, setUser] = useState<firebase.User | null>(null)
    const [menu, setMenu] = useState<MenuModel>({ groups: [] } as MenuModel)
    const [plans, setPlans] = useState<PlanItemModel[]>([])
    let [userData, setUserData] = useState<UserDataModel>({
        address: '',
        favorites: [] as string[],
        cartJSON: '{"menuItemOrders":[],"planItemOrders":[]}',
        ordersJSON: '{"orderModels":[]}',
    } as UserDataModel)
    const [cart, setCartDispatch] = useState<CartModel>({
        menuItemOrders: [],
        planItemOrders: [],
    })
    const [orders, setOrdersDispatch] = useState<OrdersModel>({
        orderModels: [],
    })
    const [searchText, setSearchText] = useState<string>('')

    const setCart = (cart: CartModel) => {
        setCartDispatch(cart)
        setUserData({
            ...userData,
            cartJSON: JSON.stringify(cart),
        })
    }
    const setOrders = (orders: OrdersModel) => {
        setOrdersDispatch(orders)
        setUserData({
            ...userData,
            ordersJSON: JSON.stringify(orders),
        })
    }

    const providerValue = {
        user,
        setUser,
        menu,
        setMenu,
        plans,
        setPlans,
        userData,
        setUserData,
        cart,
        setCart,
        orders,
        setOrders,
        searchText,
        setSearchText,
    }

    useEffect(() => {
        database.ref('menu').on('value', (snapshot) => {
            const menu = snapshot.val() as MenuModel
            menu.groups = menu.groups || []
            for (const group of menu.groups) group.items = group.items || []
            setMenu(menu)
        })
        return () => database.ref('menu').off()
    }, [])

    useEffect(() => {
        database.ref('plans').on('value', (snapshot) => {
            setPlans(snapshot.val() as PlanItemModel[])
        })
        return () => database.ref('plans').off()
    }, [])

    useEffect(() => {
        authentication.onAuthStateChanged(async (authStateChangedUser) => {
            if (authStateChangedUser !== null) {
                console.log('Signed in as: ' + authStateChangedUser.email)
                setUser(authStateChangedUser)

                await firestore
                    .collection('users')
                    .doc(authStateChangedUser.uid)
                    .onSnapshot(async (snapshot) => {
                        if (snapshot.exists) {
                            const userDataModel = snapshot.data() as UserDataModel
                            setUserData(userDataModel)
                            setCart(
                                JSON.parse(userDataModel.cartJSON) as CartModel
                            )
                            setOrders(
                                JSON.parse(
                                    userDataModel.ordersJSON
                                ) as OrdersModel
                            )
                        } else {
                            await firestore
                                .collection('users')
                                .doc(authStateChangedUser.uid)
                                .set({
                                    address: '',
                                    favorites: [] as string[],
                                    cartJSON:
                                        '{"menuItemOrders":[],"planItemOrders":[]}',
                                    ordersJSON: '{"orderModels":[]}',
                                } as UserDataModel)
                            const newUserData = (
                                await firestore
                                    .collection('users')
                                    .doc(authStateChangedUser.uid)
                                    .get()
                            ).data() as UserDataModel

                            setUserData(newUserData)
                            setCart(JSON.parse(newUserData.cartJSON))
                            setOrders(JSON.parse(newUserData.ordersJSON))
                        }
                    })
            } else await authentication.signInAnonymously()
        })
    }, [])

    return (
        <AppContextProvider value={providerValue}>
            <IonApp>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <SideMenu />
                        <IonRouterOutlet id="main">
                            <Redirect exact path="/" to="/tabs" />
                            <Route path="/tabs" exact={false}>
                                <MainTabs />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/contact">
                                <Contact />
                            </Route>
                            <Route exact path="/account">
                                <Account />
                            </Route>
                            <Route exact path="/account/user">
                                <User />
                            </Route>
                            {/* Start Administration */}
                            <ProtectedRoute
                                exact
                                path="/account/admin"
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            >
                                <Admin />
                            </ProtectedRoute>
                            <ProtectedRoute
                                exact
                                path="/account/admin/menu"
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            >
                                <EditMenuItems />
                            </ProtectedRoute>
                            <ProtectedRoute
                                exact
                                path="/account/admin/menu/add"
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            >
                                <AddGroup />
                            </ProtectedRoute>
                            <ProtectedRoute
                                exact
                                path="/account/admin/menu/edit/:group"
                                render={(props) => <EditGroup {...props} />}
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            />
                            <ProtectedRoute
                                exact
                                path="/account/admin/menu/add/:group"
                                render={(props) => <AddMenuItem {...props} />}
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            />
                            <ProtectedRoute
                                exact
                                path="/account/admin/menu/edit/:group/:id"
                                render={(props) => <EditMenuItem {...props} />}
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            />
                            <ProtectedRoute
                                exact
                                path="/account/admin/orders"
                                condition={userIsAdmin(user)}
                                redirect="/account"
                            />
                            {/* End Administration*/}
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </IonApp>
        </AppContextProvider>
    )
}

export default App
