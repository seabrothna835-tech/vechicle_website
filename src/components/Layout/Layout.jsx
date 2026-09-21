import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import CartAndWishlist from '../CartAndWishlist'
import { setPanelOpen } from '../../Store/CartSlice'

function RouteLayout() {
    const dispatch = useDispatch()
    const panelOpen = useSelector((state) => state.cart.panelOpen)

    return (
        <div className="min-h-screen">
            <div className="fixed inset-x-0 top-0 z-50">
                <Header onCartClick={() => dispatch(setPanelOpen(!panelOpen))} />
            </div>
            <div className="pt-16">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
            <CartAndWishlist />
        </div>
    )
}

export default RouteLayout