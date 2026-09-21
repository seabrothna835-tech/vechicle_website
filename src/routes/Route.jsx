import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Vechicles from '../page/Vechicles'
import About from '../page/About'
import Contact from '../page/Contact'
import RouteLayout from '../components/Layout/Layout'
import MainWeb from '../page/MainWeb'
import PopularCar from '../page/PopularCar'

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RouteLayout />}>
					<Route path="/" element={<MainWeb />} />
					<Route path="/home" element={<MainWeb />} />
					<Route path="/vehicles" element={<Vechicles />} />
					<Route path="/about" element={<About />} />
					<Route path="/popularCar" element={<PopularCar />} />
					<Route path="/contact" element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
