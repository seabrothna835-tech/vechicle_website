import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Vechicles from '../page/Vechicles'
import About from '../page/About'
import Contact from '../page/Contact'
import RouteLayout from '../components/Layout/Layout'
import Content from '../components/Content'

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<RouteLayout />}>
					<Route path="/" element={<Content />} />
					<Route path="/home" element={<Content />} />
					<Route path="/vehicles" element={<Vechicles />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
