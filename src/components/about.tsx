"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FileCode,
  FileCode2,
  Code,
  Activity,
  SquareActivity,
  Wind,
  Terminal,
  Server,
  Package,
  Database,
  Zap,
  Cloud,
} from "lucide-react";

const skillItems = [
  { label: "HTML", icon: FileCode2 },
  { label: "CSS", icon: FileCode },
  { label: "Tailwindcss", icon: Wind },
  { label: "JAVASCRIPT", icon: Code },
  { label: "REACT.JS", icon: SquareActivity },
  { label: "REACT NATIVE", icon: Activity },
  { label: "NEXT.JS", icon: Terminal },
  { label: "NODE.JS", icon: Server },
  { label: "EXPRESS.JS", icon: Package },
  { label: "MONGODB", icon: Database },
  { label: "FIREBASE", icon: Zap },
  { label: "AXIOS", icon: Cloud },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="w-[90%] max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Skills Grid & About Paragraph */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                Skills:
              </h2>
              
              {/* Flat rectangular skill badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skillItems.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.label}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-center gap-3 border border-zinc-800 bg-[#070708] px-4 py-3 rounded-none text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:border-[#8b5cf6]/50 hover:-translate-y-[2px] transition duration-300"
                    >
                      <Icon className="h-5 w-5 text-zinc-400" />
                      <span className="font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                        {skill.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* About Paragraph below the grid */}
            <div className="border-t border-zinc-900 pt-8 space-y-6">
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed tracking-wide">
                I&apos;m committed to delivering high-quality code and efficient solutions that meet client needs. 
                Whether it&apos;s developing a seamless user interface, designing robust APIs, or implementing efficient 
                CI/CD pipelines, I bring a comprehensive approach to each project.
              </p>

              {/* Mini experience timeline — unique to this portfolio */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8b5cf6]">Journey:</p>
                {[
                  { year: "2024", title: "Governor Sindh IT Initiative", desc: "Enrolled in intensive MERN stack program" },
                  { year: "2025", title: "Full Stack Developer", desc: "Building production apps & freelance projects" },
                  { year: "NOW", title: "Exploring AI & Cloud", desc: "Expanding into intelligent, scalable systems" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
                      {i < 2 && <span className="w-px h-8 bg-zinc-800" />}
                    </div>
                    <div className="-mt-1">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{item.year}</p>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Developer portrait photo with status overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full relative aspect-[3/4] lg:aspect-auto lg:h-[650px] bg-zinc-950 overflow-hidden border border-zinc-800 group"
          >
            <Image
              src="/me.jpg"
              alt="Abdullah Arif - Full Stack Web Developer and MERN Stack Specialist"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover rounded-none group-hover:scale-[1.03] transition-transform duration-700"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
