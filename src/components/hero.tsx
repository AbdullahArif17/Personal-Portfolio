"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code2, Download } from "lucide-react";
import { useEffect, useState } from "react";

const techLogos = [
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, start: () => setStarted(true) };
}

export default function Hero() {
  const xMouse = useMotionValue(0);
  const yMouse = useMotionValue(0);
  const rotateX = useTransform(yMouse, [-300, 300], [3, -3]);
  const rotateY = useTransform(xMouse, [-300, 300], [-3, 3]);

  const years = useCounter(2, 1800);
  const projects = useCounter(20, 2000);
  const tech = useCounter(15, 1600);



  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    xMouse.set(e.clientX - rect.left - rect.width / 2);
    yMouse.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden pt-36 pb-20 select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[140px]"
          style={{ top: "8%", left: "5%" }}
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-fuchsia-500/5 blur-[120px]"
          style={{ bottom: "15%", right: "8%" }}
          animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Content with 3D tilt */}
      <motion.div
        className="w-[90%] max-w-[1400px] mx-auto relative z-10 flex flex-col items-center justify-center flex-grow"
        style={{ rotateX, rotateY, perspective: 1200 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Small intro label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-zinc-500 border border-zinc-800 px-5 py-2 rounded-full"
          >
            ✦ Available for freelance work
          </motion.p>

          {/* Main Massive Typography Heading */}
          <h1 className="text-[8.5vw] md:text-[6vw] font-black uppercase tracking-tight text-white leading-[0.9] flex flex-col items-center">
            <span className="flex items-center justify-center flex-wrap gap-4 md:gap-6">
              ABDULLAH ARIF
              <motion.span
                initial={{ rotate: -20, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
                className="inline-flex h-[8vw] w-[8vw] md:h-[5.5vw] md:w-[5.5vw] items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] text-white shadow-[0_0_50px_rgba(139,92,246,0.3)]"
              >
                <Code2 className="h-[4.5vw] w-[4.5vw] md:h-[2.8vw] md:w-[2.8vw] text-white" />
              </motion.span>
              HERE !
            </span>
            <span className="text-[8.5vw] md:text-[5.5vw] font-black tracking-tight mt-2 block bg-gradient-to-r from-[#a78bfa] via-[#e879f9] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(167,139,250,0.2)]">
              MERN STACK DEVELOPER
            </span>
          </h1>

          {/* Subtitle Slogan */}
          <p className="text-[3.8vw] sm:text-[1.8vw] md:text-[1.1vw] text-zinc-400 font-medium max-w-2xl leading-relaxed tracking-wide">
            Turning your vision into engaging digital experiences through scalable, robust and revenue-driving web solutions.
          </p>

          {/* Transparent Outline Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2">
            {[
              "Frontend Development",
              "Backend Development",
              "API Integration",
            ].map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-[3vw] sm:text-[1.4vw] md:text-[0.85vw] font-bold uppercase tracking-wider text-white bg-transparent border border-zinc-700 px-6 py-3 rounded-full hover:border-[#8b5cf6] hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-default"
              >
                {pill}
              </motion.span>
            ))}
          </div>

          {/* Animated Stats Bar — unique differentiator */}
          <motion.a
            href="/Abdullah_Arif_CV.pdf"
            download="Abdullah_Arif_CV.pdf"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors duration-300 hover:bg-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Download Abdullah Arif's CV"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => {
              years.start();
              projects.start();
              tech.start();
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 md:gap-10 pt-6"
          >
            {[
              { value: years.count, suffix: "+", label: "Years Exp" },
              { value: projects.count, suffix: "+", label: "Projects" },
              { value: tech.count, suffix: "+", label: "Technologies" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-white tabular-nums">
                  {stat.value}{stat.suffix}
                </p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee Technology Strip */}
      <div className="w-full overflow-hidden py-6 border-t border-zinc-900/50 mt-auto">
        <div className="max-w-[70vw] md:max-w-[45vw] mx-auto overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />

          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
            {[...techLogos, ...techLogos].map((tech, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 grayscale opacity-25 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="h-5 w-5 md:h-7 md:w-7 object-contain"
                />
                <span className="text-white text-[10px] md:text-xs font-semibold tracking-wider uppercase">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
