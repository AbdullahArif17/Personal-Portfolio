"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()
      if (json.success) {
        setMessage({ text: "Message sent successfully! I'll get back to you soon.", isError: false })
        e.currentTarget.reset()
      } else {
        setMessage({ text: json.error || "Failed to send message. Please try again.", isError: true })
      }
    } catch {
      setMessage({ text: "An error occurred. Please try again later.", isError: true })
    }

    setLoading(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "abdullaharif893@gmail.com",
      href: "mailto:abdullaharif893@gmail.com",
      color: "text-purple-400"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+92 336 2725979",
      href: "tel:+923362725979",
      color: "text-purple-400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Karachi, Pakistan",
      href: "https://maps.google.com/?q=Karachi,Pakistan",
      color: "text-purple-400"
    },
  ]

  return (
    <section id="contact" className="py-24 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="w-[90%] max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b5cf6] mb-3">Contact:</p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Let&apos;s Connect !</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left Column: Direct Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="border border-zinc-800 bg-[#070708] p-8 rounded-none">
              <h3 className="text-lg font-black uppercase tracking-wider text-white mb-4">Direct Contact</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I&apos;m available for freelance and full-time opportunities. Reach out for a quick quote, collaboration, or just a friendly chat.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 border border-zinc-800 bg-[#070708] p-5 rounded-none hover:border-zinc-700 transition duration-300"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-zinc-800 bg-zinc-950 text-white rounded-none">
                    <info.icon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b5cf6] mb-1">{info.title}</p>
                    <p className="text-sm font-semibold text-white tracking-wide">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: High-End Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="border border-zinc-800 bg-[#070708] p-8 rounded-none space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-wider text-white">Send a Message</h3>
                <p className="text-zinc-500 text-xs uppercase tracking-wider">I&apos;ll reply within 24 hours on business days.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">First Name</span>
                    <input
                      name="firstName"
                      required
                      placeholder="e.g. John"
                      className="w-full bg-[#050505] border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-[#8b5cf6] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Last Name</span>
                    <input
                      name="lastName"
                      required
                      placeholder="e.g. Doe"
                      className="w-full bg-[#050505] border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-[#8b5cf6] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#050505] border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-[#8b5cf6] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Subject</span>
                  <input
                    name="subject"
                    required
                    placeholder="Project Collaboration"
                    className="w-full bg-[#050505] border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3.5 text-sm rounded-none focus:outline-none focus:border-[#8b5cf6] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Message</span>
                  <textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full bg-[#050505] border border-zinc-800 text-white placeholder:text-zinc-600 p-4 text-sm rounded-none focus:outline-none focus:border-[#8b5cf6] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8b5cf6] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#7c3aed] transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`border p-4 text-center text-xs font-bold uppercase tracking-wider ${
                        message.isError
                          ? "border-red-900 bg-red-950/20 text-red-400"
                          : "border-emerald-900 bg-emerald-950/20 text-emerald-400"
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
