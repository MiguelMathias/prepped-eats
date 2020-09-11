import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react'
import { calendar, receipt, repeat } from 'ionicons/icons'
import React from 'react'
import { Redirect, Route } from 'react-router'
import { Menu } from './Menu'
import { MenuItemDetail } from './MenuItemDetail'
import OrderDetail from './OrderDetail'
import Orders from './Orders'
import Plans from './Plans'

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/menu" />
                <Route path="/tabs/menu" exact>
                    <Menu />
                </Route>
                <Route
                    path="/tabs/menu/:id"
                    render={(routeProps) => <MenuItemDetail {...routeProps} />}
                    exact
                />
                <Route path="/tabs/orders" render={() => <Orders />} exact />
                <Route
                    path="/tabs/orders/:id"
                    render={() => <OrderDetail />}
                    exact
                />
                <Route path="/tabs/plans" exact>
                    <Plans />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="menu" href="/tabs/menu">
                    <IonIcon icon={calendar} />
                    <IonLabel>Menu</IonLabel>
                </IonTabButton>
                <IonTabButton tab="plans" href="/tabs/plans">
                    <IonIcon icon={repeat} />
                    <IonLabel>Plans</IonLabel>
                </IonTabButton>
                <IonTabButton tab="orders" href="/tabs/orders">
                    <IonIcon icon={receipt} />
                    <IonLabel>Orders</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default MainTabs
