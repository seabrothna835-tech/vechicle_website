import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

function RouteLayout() {
    return (
        <div className="min-h-screen">
            <div className="fixed inset-x-0 top-0 z-50">
                <Header />
            </div>
            <div className="pt-16">
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default RouteLayout