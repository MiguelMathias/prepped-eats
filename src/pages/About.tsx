import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import {
    alertCircleOutline,
    bodyOutline,
    callOutline,
    eggOutline,
    helpCircleOutline,
    informationCircleOutline,
    logoInstagram,
    mailOutline,
    mapOutline,
    openOutline,
    receiptOutline,
    sendOutline,
} from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { storageRef } from '../Firebase'
import { AccordionItem } from '../components/AccordionItem'
import './About.scss'

export const About: React.FC = () => {
    const [posterSrc, setPosterSrc] = useState('')
    const [vidSrc, setVidSrc] = useState('')
    const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState('')
    const [tacUrl, setTacUrl] = useState('')

    const fetchImgVidUrls = async () => {
        setPosterSrc(
            await storageRef.child('img/about-banner.jpg').getDownloadURL()
        )
        setVidSrc(
            await storageRef
                .child('vid/prepped-eats-promo.mp4')
                .getDownloadURL()
        )
        setPrivacyPolicyUrl(
            await storageRef
                .child('PREPPED EATS PRIVACY POLICY.pdf')
                .getDownloadURL()
        )
        setTacUrl(
            await storageRef
                .child('PREPPED EATS TERMS AND CONDITIONS.pdf')
                .getDownloadURL()
        )
    }
    useEffect(() => {
        fetchImgVidUrls().catch((e) => console.error(e))
    }, [])

    return (
        <IonPage id="about-page">
            <IonContent>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <video
                    className="about-header about-image"
                    poster={posterSrc}
                    src={vidSrc}
                    controls
                />

                <IonList className="accordion-list">
                    <AccordionItem
                        header="About Us"
                        icon={informationCircleOutline}
                    >
                        <p className="ion-padding-start ion-padding-end">
                            Prepped Eats was founded in Sacramento County,
                            California in 2020 with a humble goal in mind:
                            Deliver, delicious, affordable, locally-sourced
                            meals directly to the door of health-minded foodies
                            who are pressed for time.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            At Prepped Eats, we believe that there should be no
                            barriers when it comes to accessing healthy,
                            nourishing, and delicious food – so it became our
                            goal to eradicate those barriers one customer at a
                            time. By delivering carefully curated and delightful
                            dishes directly to your home that include local
                            ingredients, are free from GMOs, and are
                            customizable for various dietary needs, Prepped Eats
                            is able to save you the time, money, and frustration
                            that traditionally comes with self-food prepping and
                            eating healthy. No more searching for recipes, no
                            more hours in the grocery store, and no more
                            overpaying for take-out: Prepped Eats brings
                            everything right to your door.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            As a small, local business – we believe in the power
                            of community and sustainability.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            Thank you for joining us on our humble mission. We
                            look forward to feeding you, supporting our
                            community, and creating a more sustainable world one
                            meal at a time.
                        </p>

                        <h3 className="ion-padding-top ion-padding-start">
                            How it Works
                        </h3>
                        <p className="ion-padding-start ion-padding-end">
                            Enjoying a delicious, healthy, organic, restaurant
                            quality meal in the comfort of your home has never
                            been easier. Prepped Eats takes inspiration from
                            International cuisine, five-star restaurants, and
                            world-renowned chefs to cultivate, create, prep, and
                            deliver incredible meals with locally-sourced
                            ingredients direct to your door. Meticulously
                            prepped and ready to roll, Prepped Eats makes fine
                            dining quick, easy, and affordable.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            <i>…here’s how we do it:</i>
                        </p>
                        <ul>
                            <li>
                                <b>Culinary Cultivation.</b> Prepped Eats team
                                has spent hundreds of hours assembling,
                                researching, and creating phenomenally delicious
                                meals that are quick and easy to create in the
                                comfort of your own home. Prepped Eats creates
                                delicious meal options and meal plan packages
                                designed to fit your needs, budget, and personal
                                values.
                            </li>
                            <li>
                                <b>Tell Us What You Want.</b> Now comes the fun
                                part: Browse our many meal options, and let your
                                taste buds soar. Pick the meals that sound right
                                for you, tell us the number of people you’ll be
                                serving, identify any dietary restrictions, and
                                place your order. It truly is THAT easy. From
                                single meal options to our weekly and monthly
                                meal prep plans, Prepped Eats has the options
                                designed to fit your needs.
                            </li>
                            <li>
                                <b>We Get to Work.</b> Once we have your order,
                                we get straight to the task of prepping your
                                food. With the freshest ingredients and
                                meticulous attention to detail, we create your
                                meals to your exact specifications. Carefully
                                packaged in individual meal containers, our next
                                step is to personally deliver your food directly
                                to your door.
                            </li>
                            <li>
                                <b>Now it’s Your Turn.</b> The doorbell rings,
                                and your food appears! No more trips to the
                                grocery store, no more wasted food in the
                                fridge, no more frustration searching for
                                specific ingredients – everything you need to
                                make your meal is right here. Simply follow the
                                instructions and eat. It truly is that easy.
                            </li>
                        </ul>

                        <h3 className="ion-padding-top ion-padding-start">
                            Why Us
                        </h3>
                        <p className="ion-padding-start ion-padding-end">
                            At Prepped Eats, we have a simple belief that drives
                            everything we do:{' '}
                            <b>
                                Everyone deserves access to healthy, organic,
                                GMO-free food.
                            </b>
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            We believe in removing the barriers between you and
                            delicious, healthy, and locally-sourced food. We
                            believe that everyone deserves a meal that nourishes
                            the body and mind, regardless of dietary needs, time
                            restrictions, or culinary skills – and with our
                            weekly and monthly meal prep package deals, we are
                            able to offer affordable, easy to assemble,
                            delicious to taste, and naturally nutritious meals
                            delivered right to your door.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            So, why us? Because we believe in the power of a
                            delicious meal. We believe that food nourishes more
                            than the body, it feeds the soul and helps bring us
                            together. We believe that extra time spent around
                            the table is irreplaceable, and that eating well is
                            the ultimate form of self-care. We believe in
                            supporting local businesses and caring for our
                            community, and that through Prepped Eats, we can do
                            both.
                        </p>
                        <p className="ion-padding-start ion-padding-end">
                            And, we believe that if you are reading this now,
                            you likely feel the same way.
                        </p>
                    </AccordionItem>
                    <AccordionItem header="FAQ" icon={helpCircleOutline}>
                        <AccordionItem
                            className="ion-padding-start"
                            header="Food"
                            icon={eggOutline}
                        >
                            <ol className="ion-padding-end">
                                <li>What do I do after I received my meals?</li>
                                <p>
                                    Refrigerate your meals as soon as you
                                    receive your delivery, to avoid any spoilage
                                    and to keep it at the best taste.
                                </p>
                                <li>Do I have to return meal containers?</li>
                                <p>
                                    No, as per health regulations we are not
                                    able to accept used meal containers.
                                    However, our containers are dishwasher and
                                    freezer safe and would work perfect for
                                    storing any food at your preference.
                                </p>
                                <li>How long do my meals last?</li>
                                <p>
                                    Our meals stay fresh up to 6 days from the
                                    day they were delivered, please ready “Enjoy
                                    Before” labels on meal containers for the
                                    exact expiration date.
                                </p>
                                <li>Can I freeze my meals?</li>
                                <p>
                                    Yes, our meals are freezable, however we do
                                    not recommend freezing your meals as
                                    freezing will affect the taste of the food.
                                </p>
                                <li>Can I microwave my meals?</li>
                                <p>
                                    Absolutely! Our containers microwave safe.
                                    To properly warm up your food please remove
                                    any sauces from the container.
                                </p>
                                <li>How long do I microwave my food for?</li>
                                <p>
                                    We recommend microwaving your food for two
                                    rounds of 15 to 20 seconds to avoid
                                    overheating your meals.
                                </p>
                                <li>Do the meals come frozen?</li>
                                <p>
                                    Never, all food we cook deliver to you fresh
                                    within 24 hours after cooking it.
                                </p>
                                <li>Where do you get your ingredients?</li>
                                <p>
                                    All of the ingredients we use to cook our
                                    food with are 100% natural and locally
                                    sourced. We never use ingredients that are
                                    frozen or ingredients that contain
                                    artificial flavoring and coloring as well as
                                    GMO products.
                                </p>
                            </ol>
                        </AccordionItem>
                        <AccordionItem
                            className="ion-padding-start"
                            header="Ordering"
                            icon={receiptOutline}
                        >
                            <ol>
                                <li>
                                    Do I have to order package meal options?
                                </li>
                                <p>
                                    No, you can choose meals from our current
                                    menu at any time. However, there is a 4-meal
                                    minimum per order.
                                </p>
                                <li>
                                    Can I still place order if I missed the
                                    order deadline?
                                </li>
                                <p>
                                    We understand that things may get in the
                                    way, please contact us at&nbsp;
                                    <a href="mailto:preppedeats.ca@gmail.com">
                                        prepped.eat@gmail.com
                                    </a>{' '}
                                    and we will do our best to accommodate your
                                    order.
                                </p>
                                <li>What is the deadline for ordering?</li>
                                <p>
                                    As of right now, we take order every Sunday
                                    11:59PM and Thursday 11:59PM. Sunday orders
                                    will be delivered on Wednesday. Thursday
                                    orders will be delivered on Saturday.
                                </p>
                                <li>Can I cancel my order?</li>
                                <p>
                                    To receive a full refund, you can only
                                    cancel your order before the deadline. After
                                    the deadline you can only will receive 50%
                                    refund of the total.
                                </p>
                                <li>Can I make changes to my order?</li>
                                <p>
                                    If you wish to change your order, please let
                                    us know about your change as soon as you
                                    can. Please note: we do not guarantee that
                                    your order will be changed.
                                </p>
                                <li>
                                    Do I Have to order exactly 10 meals with a
                                    weekly package?
                                </li>
                                <p>
                                    Yes, you can order more than 10 meals with
                                    the package meal plan, there will be a
                                    charge of $9 per each additional meal and
                                    $10 per each additional seafood meal on top
                                    of the package meal plan price.
                                </p>
                                <li>
                                    What if there’s a problem with my order?
                                </li>
                                <p>
                                    If you have an issue with your order, please
                                    let us know and will be happy to resolve an
                                    issue to make sure you are satisfied with
                                    your order.
                                </p>
                                <li>Where is the food made?</li>
                                <p>
                                    All our food is made in a certified
                                    commercial kitchen in Citrus Heights, CA
                                    that holds all required health permits; we
                                    also hold a food handler license.
                                </p>
                                <li>Can I cancel my order?</li>
                                <p>
                                    To receive a full refund, you can only
                                    cancel your order before the deadline. After
                                    deadline you can only will receive 50%
                                    refund of the total.
                                </p>
                            </ol>
                        </AccordionItem>
                        <AccordionItem
                            className="ion-padding-start"
                            header="Delivery"
                            icon={sendOutline}
                        >
                            <ol>
                                <li>Where do you deliver?</li>
                                <p>
                                    We deliver to any residential communities
                                    and business offices.
                                    <br />
                                    *If you live in a gated community please
                                    make sure to leave a gate code.
                                    <br />
                                    *If you want your order to be delivered to
                                    business office, please make sure to leave a
                                    correct office number.
                                </p>
                                <li>What Areas do you delivery?</li>
                                <br />
                                <span>
                                    We delivery to most cities in Sacramento
                                    area. Please see the list of the cities and
                                    delivery fees.
                                    <ul>
                                        <li>
                                            Folsom, Orangevale, Citrus Heights,
                                            El Dorado Hills ($5)
                                        </li>
                                        <li>
                                            Roseville, Rocklin, Fair Oaks,
                                            Carmichael, Rancho Cordova ($7)
                                        </li>
                                        <li>Sacramento (Check Zip)</li>
                                        <li>Elk Grove ($12)</li>
                                    </ul>
                                </span>
                                <br />
                                <li>What are your delivery timeframes?</li>
                                <p>
                                    We deliver anytime between 4-7PM on the day
                                    of the delivery.
                                </p>
                                <li>
                                    Can I pick up my food? I don’t want to pay
                                    for delivery.
                                </li>
                                <p>
                                    At this time, we do not accommodate
                                    self-pick up option for our clients.
                                </p>
                            </ol>
                        </AccordionItem>
                    </AccordionItem>
                    <IonItem href={privacyPolicyUrl} target="_blank">
                        <IonIcon icon={bodyOutline} />
                        <IonTitle>Privacy Policy</IonTitle>
                        <IonIcon slot="end" icon={openOutline} />
                    </IonItem>
                    <IonItem href={tacUrl} target="_blank">
                        <IonIcon icon={alertCircleOutline} />
                        <IonTitle>Terms and Conditions</IonTitle>
                        <IonIcon slot="end" icon={openOutline} />
                    </IonItem>
                </IonList>

                <h3 className="ion-padding-start">Connect with us!</h3>
                <IonList>
                    <IonItem
                        href="https://www.google.com/maps/place/Sacramento,+CA"
                        target="_blank"
                    >
                        <IonLabel>Location</IonLabel>
                        Sacramento, CA
                        <IonIcon icon={mapOutline} slot="end" />
                    </IonItem>
                    <IonItem
                        href="https://www.instagram.com/prepped_eats/"
                        target="_blank"
                    >
                        <IonLabel>Instagram</IonLabel>
                        @prepped_eats
                        <IonIcon icon={logoInstagram} slot="end" />
                    </IonItem>
                    <IonItem
                        href="mailto:prepped.eats@gmail.com"
                        target="_blank"
                    >
                        <IonLabel>Email</IonLabel>
                        prepped.eats@gmail.com
                        <IonIcon icon={mailOutline} slot="end" />
                    </IonItem>
                    <IonItem href="tel:(916)412-3920" target="_blank">
                        <IonLabel>Telephone</IonLabel>
                        (916) 412-3920
                        <IonIcon icon={callOutline} slot="end" />
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}
