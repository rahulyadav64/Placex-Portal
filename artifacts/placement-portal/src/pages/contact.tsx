import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium">
            <Mail className="h-4 w-4" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, feedback, or want to collaborate? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10" data-testid="success-message">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <Button className="mt-6" onClick={() => setSubmitted(false)} data-testid="btn-send-another">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold mb-6">Send us a message</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Rahul Sharma"
                        className="mt-1.5"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        data-testid="input-contact-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        className="mt-1.5"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        data-testid="input-contact-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="mt-1.5"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      data-testid="input-contact-subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      className="mt-1.5 min-h-32 resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      data-testid="input-contact-message"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" data-testid="btn-submit-contact">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 space-y-5">
                <h2 className="text-xl font-bold">Contact Information</h2>
                {[
                  { icon: Mail, label: "Email", value: "contact@placementportal.in", href: "mailto:contact@placementportal.in" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                  { icon: MapPin, label: "Address", value: "BCA Department, Delhi University, New Delhi — 110007", href: "#" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" data-testid={`contact-info-${i}`}>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                      <a href={item.href} className="font-medium hover:text-primary transition-colors">{item.value}</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Connect with Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Github, label: "GitHub", href: "#" },
                    { icon: Twitter, label: "Twitter", href: "#" },
                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      aria-label={social.label}
                      data-testid={`social-link-${i}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-card rounded-2xl overflow-hidden h-48 flex items-center justify-center bg-muted/50">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Delhi University, New Delhi</p>
                  <p className="text-xs">North Campus, Delhi 110007</p>
                </div>
              </div>

              {/* Project Note */}
              <div className="rounded-2xl bg-gradient-primary p-5 text-white text-sm">
                <p className="font-semibold mb-1">Note: BCA Final Year Project</p>
                <p className="text-blue-100">This is an academic project developed as part of a BCA curriculum. All data shown is for demonstration purposes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
