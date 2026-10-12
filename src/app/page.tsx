import { Contact } from "@/components/contact";
import { Aurora, Cursor } from "@/components/cursor";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Products } from "@/components/products";
import { Profile } from "@/components/profile";
import { Record } from "@/components/record";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <>
      <Aurora />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Profile />
        <Education />
        <Work />
        <Products />
        <Stack />
        <Record />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
