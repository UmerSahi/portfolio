import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { c, serif, mono, testimonials } from "../../data/portfolioData";
import { SectionHead } from "../common/SectionHead";

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const randomRotateY = (index: number) => {
    const rotations = [-6, 5, -3, 7, -5];
    return rotations[index % rotations.length];
  };

  return (
    <section id="peer-reviews" style={{ padding: "100px 0", position: "relative" }}>
      {/* Translucent Frosted Glass Background Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(214, 205, 178, 0.42)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1080,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
        }}
      >
        <SectionHead index="07" title="Featured" em="testimonials" />

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 select-none"
        >
          <div className="relative grid grid-cols-1 gap-12 md:gap-20 md:grid-cols-2">
            {/* 3D Stacked Image Column */}
            <div>
              <div className="relative h-80 w-full" style={{ minHeight: "320px" }}>
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => {
                    const rot = randomRotateY(index);
                    const isActive = index === active;
                    return (
                      <motion.div
                        key={testimonial.src}
                        initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rot }}
                        animate={{
                          opacity: isActive ? 1 : 0.7,
                          scale: isActive ? 1 : 0.95,
                          z: isActive ? 0 : -100,
                          rotate: isActive ? 0 : rot,
                          zIndex: isActive ? 40 : testimonials.length + 2 - index,
                          y: isActive ? [0, -80, 0] : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rot }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 origin-bottom"
                      >
                        <img
                          src={testimonial.src}
                          alt={testimonial.name}
                          width={500}
                          height={500}
                          draggable={false}
                          className="h-full w-full rounded-3xl object-cover object-center shadow-lg border border-[rgba(42,39,30,0.1)]"
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Testimonial Quote and Designation */}
            <div className="flex flex-col justify-between py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <h3 style={{ ...serif, color: c.ink }} className="text-2xl font-bold">
                    {testimonials[active].name}
                  </h3>
                  <p style={{ ...mono, color: c.inkSoft }} className="text-xs uppercase tracking-wider mt-1">
                    {testimonials[active].designation}
                  </p>
                  <p
                    style={{ ...serif, color: c.inkSoft, fontStyle: "italic", lineHeight: 1.6 }}
                    className="mt-8 text-lg md:text-xl"
                  >
                    "{testimonials[active].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex gap-4 pt-12 md:pt-0">
                <button
                  onClick={handlePrev}
                  style={{ background: c.paper, border: `1px solid ${c.line}`, color: c.ink }}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-85 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  style={{ background: c.paper, border: `1px solid ${c.line}`, color: c.ink }}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-85 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
