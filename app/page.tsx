import AboutUs from "@/components/aboutUs";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";
import Games from "@/components/games";
import Hero from "@/components/hero-section/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import Reviews from "@/components/reviews";
import Snacks from "@/components/snacks";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0417]">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="games">
        <Games />
      </section>

      <section id="snacks">
        <Snacks />
      </section>

      <section id="gallery">
       <Gallery images={[
        "/assets/pics/pc1.jpeg",
        "/assets/pics/pc2.jpeg",
        "/assets/pics/pc3.jpeg",
        "/assets/pics/pc4.jpeg",
        "/assets/pics/pc5.jpeg",
        "/assets/pics/pc6.jpeg",
       "/assets/pics/pc7.jpeg",
       "/assets/pics/pc8.jpeg",
      ]}/>
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}
