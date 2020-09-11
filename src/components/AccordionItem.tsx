import React, { PropsWithChildren, useState } from 'react'
import { IonIcon, IonItem, IonTitle } from '@ionic/react'
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons'

interface AccordionItemProps extends PropsWithChildren<{}> {
    header: string
    icon: string
    initiallyOpen?: boolean
    className?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    header,
    icon,
    initiallyOpen,
    className,
    children,
}) => {
    const [showItem, setShowItem] = useState(initiallyOpen)

    return (
        <>
            <IonItem button onClick={() => setShowItem(!showItem)}>
                <IonIcon
                    icon={showItem ? chevronDownOutline : chevronForwardOutline}
                />
                <IonTitle>{header}</IonTitle>
                <IonIcon slot="end" icon={icon} />
            </IonItem>
            <div className={className}>{showItem ? children : <></>}</div>
        </>
    )
}
