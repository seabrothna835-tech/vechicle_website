import Home from './Home'
import React, { useEffect, useRef, useState } from 'react'
import About from './About'
import Contact from './Contact'
import PopularCar from './PopularCar'
import Alert from '../components/alert/Alert'
import ViewDetailVehicle from '../components/ViewDetailVechicle'
import {useDispatch,useSelector } from 'react-redux'
import { viewItem as setViewItem } from '../Store/CartSlice'

function MainWeb() {
    const dispatch = useDispatch()
    const selectedViewItem = useSelector((state) => state.cart.viewItem)
    const cartCount = useSelector((state) => state.cart.count)
    const previousCartCount = useRef(cartCount)
    const [alert, setAlert] = useState({
        show: false,
        message: "Add to cart success !",
        type: "success"
    });
    // const isView = useSelector((state)=>state.)

    useEffect(() => {
        const cartWasIncreased = cartCount > previousCartCount.current
        previousCartCount.current = cartCount

        if (!cartWasIncreased) {
            return
        }

        setAlert((currentAlert) => ({ ...currentAlert, show: true }))
        const timeoutId = window.setTimeout(() => {
            setAlert((currentAlert) => ({ ...currentAlert, show: false }))
        }, 2000)

        return () => window.clearTimeout(timeoutId)
    }, [cartCount])

    return (
        <main>
            <section id="home-content" className="scroll-mt-16"><Home /></section>
            <section id="popular-page" className="scroll-mt-16"><PopularCar /></section>
            <section id="about-page" className="scroll-mt-16"><About /></section>
            <section id="contact-page" className="scroll-mt-16"><Contact /></section>
            {alert.show && <Alert message={alert.message} type={alert.type} />}
            {selectedViewItem && (
                <ViewDetailVehicle
                    vehicle={selectedViewItem}
                    onClose={() => dispatch(setViewItem(null))}
                />
            )}
        </main>
    )
}

export default MainWeb