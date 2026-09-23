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
    <section id="peer-reviews" style={{ padding: "clamp(60px, 10vh, 100px) 0", position: "relative" }}>
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
          padding: "0 clamp(14px, 3.5vw, 32px)",
          width: "100%",
        }}
      >
        <SectionHead index="07" title="Featured" em="testimonials" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mx-auto max-w-sm px-0 sm:px-4 py-4 sm:py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 select-none"
        >
          <div className="relative grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-2">
            {/* 3D Stacked Avatar Column */}
            <div className="flex flex-col">
              <div className="relative h-72 sm:h-84 w-full" style={{ minHeight: "clamp(260px, 45vw, 340px)" }}>
                <AnimatePresence>
                  {testimonials.map((testimonial, index) => {
                    const rot = randomRotateY(index);
                    const isActive = index === active;
                    return (
                      <motion.div
                        key={testimonial.src}
                        initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rot }}
                        animate={{
                          opacity: isActive ? 1 : 0.65,
                          scale: isActive ? 1 : 0.94,
                          z: isActive ? 0 : -100,
                          rotate: isActive ? 0 : rot,
                          zIndex: isActive ? 40 : testimonials.length + 2 - index,
                          y: isActive ? [0, -60, 0] : 0,
                        }}
                        exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rot }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute inset-0 origin-bottom"
                      >
                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-[#2A271E]/15 border-2 border-[rgba(42,39,30,0.12)] bg-[#F4EFE1]">
                          <img
                            src={testimonial.src}
                            alt={testimonial.name}
                            width={500}
                            height={500}
                            draggable={false}
                            className="h-full w-full object-cover object-center"
                          />
                          {/* Floating Pinterest-style frosted badge */}
                          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[rgba(244,239,225,0.92)] backdrop-blur-md border border-[rgba(42,39,30,0.12)] flex items-center justify-between shadow-md">
                            <div className="pr-2 truncate">
                              <p style={{ ...serif, color: c.ink }} className="text-sm font-bold truncate">
                                {testimonial.name}
                              </p>
                              <p style={{ ...mono, color: c.inkSoft }} className="text-[10px] uppercase tracking-wider truncate">
                                {testimonial.designation}
                              </p>
                            </div>
                            <span 
                              style={{ ...mono, background: "rgba(86,96,71,0.15)", color: c.moss }} 
                              className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                            >
                              3D Avatar
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Avatar Selector Strip */}
              <div
                className="flex items-center justify-center md:justify-start gap-3 mt-6 px-3 py-2.5 overflow-x-auto md:overflow-visible max-w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {testimonials.map((item, idx) => {
                  const isSelected = idx === active;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActive(idx)}
                      className={`relative rounded-full transition-all duration-300 cursor-pointer p-0.5 shrink-0 ${
                        isSelected
                          ? "ring-2 ring-[#566047] scale-110 shadow-md"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      aria-label={`View testimonial from ${item.name}`}
                      title={item.name}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[rgba(42,39,30,0.15)]"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Testimonial Quote and Designation */}
            <div className="flex flex-col justify-between py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4" style={{ background: "rgba(164,89,47,0.12)", color: c.clay, ...mono }}>
                    Endorsement {active + 1} of {testimonials.length}
                  </div>

                  <h3 style={{ ...serif, color: c.ink }} className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {testimonials[active].name}
                  </h3>
                  <p style={{ ...mono, color: c.inkSoft }} className="text-xs uppercase tracking-wider mt-1.5">
                    {testimonials[active].designation}
                  </p>
                  <p
                    style={{ ...serif, color: c.inkSoft, fontStyle: "italic", lineHeight: 1.65 }}
                    className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl"
                  >
                    "{testimonials[active].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4 pt-10 md:pt-4">
                <button
                  onClick={handlePrev}
                  style={{ background: c.paper, border: `1px solid ${c.line}`, color: c.ink }}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/80 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  style={{ background: c.paper, border: `1px solid ${c.line}`, color: c.ink }}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/80 active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
                <span style={{ ...mono, color: c.inkFaint }} className="text-xs ml-2">
                  0{active + 1} / 0{testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
