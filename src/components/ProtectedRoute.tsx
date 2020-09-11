import React, { PropsWithChildren } from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router'

interface ProtectedRouteProps extends PropsWithChildren<{}> {
    component?: React.ComponentType<any>
    exact?: boolean
    path?: string
    render?: (props: RouteComponentProps<any>) => React.ReactNode
    sensitive?: boolean
    strict?: boolean
    condition: boolean
    redirect: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component,
    exact,
    path,
    render,
    sensitive,
    strict,
    children,
    condition,
    redirect,
}) => {
    if (!condition) return <Redirect to={redirect} />
    return (
        <Route
            component={component}
            exact={exact}
            path={path}
            render={render}
            sensitive={sensitive}
            strict={strict}
        >
            {children}
        </Route>
    )
}
