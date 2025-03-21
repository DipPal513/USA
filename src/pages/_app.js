import { useEffect } from "react";
import Footer from "@/components/footer/Footer";
import HeaderTop from "@/components/header/headerTop/HeaderTop";
import HeaderMenu from "@/components/header/headerMenu/HeaderMenu";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/fonts.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease', // Easing for the animation
      once: true, // Whether the animation should only happen once
    });
  }, []);
  return (
    <>
      <HeaderTop />
      <HeaderMenu />
      <Component {...pageProps} />
      <Footer></Footer>
      <ToastContainer />
    </>
  );
}
