import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Animals } from "../pages/Animals"
import { Services } from "../pages/Services"
import { Contact } from "../pages/Contact"
import { NotFound } from "../pages/NotFound"
import { Routes, Route } from "react-router"

export const Routing = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}
