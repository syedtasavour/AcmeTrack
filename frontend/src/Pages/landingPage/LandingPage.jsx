import React from "react";
import Hero from "./Hero.jsx";
import Personalizd from "./Personalized.jsx";
import Progress from "./Progress.jsx";
import AcmeTrack from "./AcmeTrack.jsx";
import FAQ from "./FAQ.jsx";
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
function LandingPage() {
  return (
    <>
      <Hero />
      <Personalizd />
      <Progress />
      <AcmeTrack />
      <FAQ />
    </>
  );
}

export default LandingPage;
