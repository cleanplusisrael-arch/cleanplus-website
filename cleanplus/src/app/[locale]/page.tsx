import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HowItWorks from '@/components/HowItWorks';
import WhyUs from '@/components/WhyUs';
import Stats from '@/components/Stats';
import Guarantee from '@/components/Guarantee';
import Testimonials from '@/components/Testimonials';
import Areas from '@/components/Areas';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Guarantee />
        <Testimonials />
        <Areas />
        <ContactForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
