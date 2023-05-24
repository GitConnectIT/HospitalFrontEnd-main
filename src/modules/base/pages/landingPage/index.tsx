import { FC, useEffect, useState } from "react";
import React from "react";
import { Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LandingPage: FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 770);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 770);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const items = [
    {
      blockquote:
        " Amo questa piattaforma. Ricco di opzioni, questo software funziona perfettamente e l assistenza clienti è eccezionale! Sono davvero soddisfatto di Prenotissimo, mi piace tutto di questo software.",
      figcaption: "Rebecca Panizzolo",
    },
    {
      blockquote:
        "Ottimo strumento di pianificazione gratuito. Adoro la possibilità di prenotare direttamente da Google Maps e di programmare gli appuntamenti! Mi piace anche il modo in cui posso gestire più account per i miei dipendenti.",
      figcaption: "Matteo Corsi",
    },
    {
      blockquote:
        "Sto utilizzando questo prodotto da qualche mese e sinceramente lo trovo molto efficace e semplice da utilizzare sia per me che le persone le quali dovevano prenotare. Ho potuto utilizzare il piano gratuito inizialmente e questo mi ha sicuramente aiutato molto nella scelta di un piano avanzato successivamente.",
      figcaption: "Emanuela D'Angelo",
    },
  ];

  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const navigate = useNavigate();


  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-page" style = {{position: "absolute", width: "300px", height: "300px", margin:"auto",
    top:"0", left:"0", right: "0", bottom: "0"}}>
      <Container style = {{margin: "auto", border: "1px solid black", borderRadius: "3rem"}}>
        <div className = "d-flex justify-content-center my-3" style = {{gap: "1rem"}}>
        <Button color="primary" onClick = {()=>navigate("/login")}>
          Log in
        </Button>

        <Button color="primary" onClick = {()=>navigate("/register")}>
          Register
        </Button>
        </div>
       
      </Container>
 
    </div>
  );
};

export default LandingPage;
