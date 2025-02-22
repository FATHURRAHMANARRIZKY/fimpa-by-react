import React, { useEffect } from "react";

const Hero = () =>{
    useEffect(() => {
        const title = document.querySelector(".title");
        const subtitle = document.querySelector(".subtitle");
        const leaf1 = document.querySelector(".leaf1");
        const leaf2 = document.querySelector(".leaf2");
        const bush2 = document.querySelector(".bush2");
        const mount1 = document.querySelector(".mount1");
        const mount2 = document.querySelector(".mount2");
    
        const handleScroll = () => {
          let value = window.scrollY;
    
          if (title) title.style.marginTop = value * 1.1 + "px";
          if (subtitle) subtitle.style.marginTop = value * 1.05 + "px";
          if (leaf1) leaf1.style.marginLeft = -value + "px";
          if (leaf2) leaf2.style.marginLeft = value + "px";
          if (bush2) bush2.style.marginBottom = -value + "px";
          if (mount1) mount1.style.marginBottom = -value * 1.1 + "px";
          if (mount2) mount2.style.marginBottom = -value * 1.2 + "px";
        };
    
        document.addEventListener("scroll", handleScroll);
    
        return () => {
          document.removeEventListener("scroll", handleScroll);
        };
      }, []);
    return(
        <section className="home">
        <img src="assets/paralax/mount2.png" className="mount2" alt="Mount 2" />
        <img src="assets/paralax/mount1.png" className="mount1" alt="Mount 1" />
        <img src="assets/paralax/bush2.png" className="bush2" alt="Bush 2" />

        <h1 className="title">FIMPA</h1>
        <p className="subtitle">Your Pipes, Our Priority: Repair, Install, and Maintain with Care.</p>

        <img src="assets/paralax/bush1.png" className="bush1" alt="Bush 1" />
        <img src="assets/paralax/leaf2.png" className="leaf2" alt="Leaf 2" />
        <img src="assets/paralax/leaf1.png" className="leaf1" alt="Leaf 1" />
      </section>
    );
}

export default Hero;