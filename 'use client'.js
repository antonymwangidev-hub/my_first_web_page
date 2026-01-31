'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Lightbulb, Video, BookOpen, FileText } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const mailtoLink = `mailto:antony.mwangi.dev@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
      window.location.href = mailtoLink

      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-screen bg-gradient-to-br from-primary to-primary/80 text-primary-foreground pt-32 pb-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Get In Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Have questions about our courses? Need technical support? Want to collaborate? We're here to help and love hearing from our community!
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  content: 'antony.mwangi.dev@gmail.com',
                  subtext: 'Response within 24 hours',
                  color: 'accent'
                },
                {
                  icon: MessageSquare,
                  title: 'Live Chat',
                  content: 'Chat Support',
                  subtext: 'Monday-Friday 9AM-6PM UTC',
                  color: 'secondary'
                },
                {
                  icon: Clock,
                  title: 'Support Hours',
                  content: 'Mon-Fri 9AM-6PM UTC',
                  subtext: 'Weekends: Community Support',
                  color: 'accent'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '+254 116270545',
                  subtext: 'Schedule a call',
                  color: 'secondary'
                }
              ].map((contact, idx) => {
                const Icon = contact.icon
                const bgColor = contact.color === 'accent' ? 'bg-accent/10' : 'bg-secondary/10'
                const textColor = contact.color === 'accent' ? 'text-accent' : 'text-secondary'

                return (
                  <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={textColor} size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{contact.title}</h3>
                    <p className="font-semibold text-foreground mb-1">{contact.content}</p>
                    <p className="text-sm text-muted-foreground">{contact.subtext}</p>
                  </div>
                )
              })}
            </div>

            <div className="bg-primary/5 border border-border rounded-xl p-8 text-center mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Links</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/courses"
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-bold hover:bg-accent/90 transition-colors"
                >
                  Browse Courses
                </a>
                <a
                  href="/live-classes"
                  className="px-6 py-3 border border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition-colors"
                >
                  Join Live Classes
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* --- UPDATED SECTION: Graphics Design Resources --- */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-foreground text-center mb-10">
                <Lightbulb className="inline-block w-8 h-8 mr-2 text-accent" />
                Graphics Design Resources
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Video Tutorials */}
                <div className="bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <Video className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">Video Tutorials</h3>
                  <p className="text-muted-foreground mb-4">Learn the fundamentals of design software.</p>
                  <a
                    href="https://www.youtube.com/watch?v=Ye8Mts4yCsc" // 🔗 Graphics Design Fundamentals
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-2"
                  >
                    Graphics Design Fundamentals (YouTube)
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=zJg5k619Wn8" // 🔗 Adobe Illustrator Tutorial
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Full Adobe Illustrator Course (YouTube)
                  </a>
                </div>

                {/* E-books (Free Resources) */}
                <div className="bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">E-books (Free)</h3>
                  <p className="text-muted-foreground mb-4">Download comprehensive design handbooks.</p>
                  <a
                    href="https://learnui.design/tools/guides/beginners-guide-to-color-design.html" // 🔗 Guide to Color Design
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-2"
                  >
                    A Beginner's Guide to Color Design
                  </a>
                  <a
                    href="https://designforhackers.com/blog/design-for-hackers-free-ebook-download/" // 🔗 Design for Hackers
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
                  >
                    Design For Hackers E-book
                  </a>
                </div>

                {/* Journals & Articles */}
                <div className="bg-card border border-border rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                  <FileText className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">Journals & Articles</h3>
                  <p className="text-muted-foreground mb-4">Read about design theory and current trends.</p>
                  <a
                    href="https://www.smashingmagazine.com/category/design-theory/" // 🔗 Smashing Magazine - Design Theory
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors mb-2"
                  >
                    Design Theory Articles (Smashing Magazine)
                  </a>
                  <a
                    href="https://99designs.com/blog/design-history-movements/" // 🔗 History of Graphic Design
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 border border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary/10 transition-colors"
                  >
                    History of Graphic Design (99designs)
                  </a>
                </div>
              </div>
            </div>
            {/* --- END UPDATED SECTION --- */}


            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Have a question or feedback? Fill out the form and we'll get back to you shortly.
                </p>

                {isSubmitted ? (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-700 mb-6">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Course inquiry, technical support, partnership, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-card border border-border rounded-xl overflow-hidden h-96 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-accent/40 mx-auto mb-4" />
                      <p className="text-foreground font-semibold">Online Platform - Available Globally</p>
                      <p className="text-muted-foreground mt-2">Supporting students in 150+ countries</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb size={24} className="text-accent" />
                    Frequently Asked Topics
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Course content and curriculum questions',
                      'Technical issues and account support',
                      'Certificate and completion verification',
                      'Corporate training and partnerships'
                    ].map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3 py-2">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span className="text-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Response Times</h3>
                  <div className="space-y-2">
                    <p className="text-foreground"><span className="font-semibold">Email:</span> Within 24 hours</p>
                    <p className="text-foreground"><span className="font-semibold">Live Chat:</span> 1-2 hours (business hours)</p>
                    <p className="text-foreground"><span className="font-semibold">Phone:</span> By appointment</p>
                    <p className="text-muted-foreground text-sm mt-3">Community support available 24/7 on our forums</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Can't Wait to Get Started?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Browse our course catalog and find the perfect program for you. No credit card required to get started!
            </p>
            <a
              href="/courses"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors"
            >
              Explore Courses
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}