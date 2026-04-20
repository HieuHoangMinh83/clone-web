import Header from '../../components/shared/Header/Header.jsx'
import Contact from '../../components/shared/Contact/Contact.jsx'
import { contactData } from '../../data/contact.js'

export default function ContactPage() {
  return (
    <>
      <Header variant="default" />
      <Contact {...contactData} />
    </>
  )
}
