import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import content from "../Onboarding/content.json"
import "./Onboarding.sass"

function Onboarding({ onComplete }) {
  const [index, setIndex] = useState(0);
  const slides = content.slides;

  function handleNext() {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      completeOnboarding();
    }
  }

  function handlePrev() {
    if (index > 0) setIndex(index - 1);
  }

  function handleDotClick(i) {
    setIndex(i);
  }

  function handleDragEnd(event, info) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) handleNext();
    if (offset > 100 || velocity > 500) handlePrev();
  }

  function completeOnboarding() {
    localStorage.setItem("firstVisitOnboarding", "true");
    onComplete(); // navigate to login page or next step
  }

  return (
    <div className="onboarding">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="slide"
        >
          <img
            src={slides[index].image}
            alt={slides[index].header}
            className="slide__image"
          />
          <h2 className="slide__header">{slides[index].header}</h2>
          <p className="slide__desc">{slides[index].desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="onboarding__dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "dot--active" : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>

      <div className="onboarding__actions">
        <button className="onboarding__btn skip" onClick={completeOnboarding}>
          Skip
        </button>

        <button onClick={handleNext} className="onboarding__btn next">
          {index === slides.length - 1 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Onboarding;
