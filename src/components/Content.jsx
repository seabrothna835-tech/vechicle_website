import Home from '../page/Home'
import Vechicles from '../page/Vechicles'
import About from '../page/About'
import Contact from '../page/Contact'

function Content() {
	return (
		<div>
			<section id="home-content" className="scroll-mt-16"><Home /></section>
			<section id="vehicles-page" className="scroll-mt-16"><Vechicles /></section>
			<section id="about-page" className="scroll-mt-16"><About /></section>
			<section id="contact-page" className="scroll-mt-16"><Contact /></section>
		</div>
	)
}

export default Content
