import AshishImg from '../images/Ashish.jpeg';
import AshutoshImg from '../images/Ashutosh.jpg';
import DharuvImg from '../images/dharuv.jpeg';
import DibyanshuImg from '../images/Dibyanshu.jpeg';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertTriangle,
  Earth, 
  Mail, 
  MessageSquare, 
  Shield, 
  User 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // Would normally send to a backend here
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const teamMembers = [
    {
      name: "Ashish Kumar Dubey",
      role: "Technical Lead & Backend Engineer",
      bio: "BCA student, backend developer & team lead with interest in Java and AI.",
      image: AshishImg,
    },
    {
      name: "Ashutosh Pandey",
      role: "Data Engineer & Research Analyst",
      bio: "BCA student with skills in design, research, and databases. Interested in Data and System Design roles.",
      image: AshutoshImg,
    },
    {
      name: "Dharuv Singh",
      role: "Media & Visual Design Head",
      bio: "Creative BCA student skilled in media, presentation, and design. Aspires to work in digital communication.",
      image: DharuvImg,
    },
    {
      name: "Dibyanshu kumar dubey",
      role: "Frontend Lead & UI/UX Strategist",
      bio: "BCA student focused on frontend development and UI/UX. Aims to be a top-tier Frontend Engineer.",
      image: DibyanshuImg,
    },
  ];

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center mb-16">
        <h1 className="text-4xl font-bold">About EcoShield</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Learn about our mission, our team, and how we're working to protect both you and the environment.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                <Earth className="h-6 w-6 text-ecoshield-sky-blue" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <div className="space-y-4">
              <p>
                EcoShield was founded with a clear purpose: to empower individuals with knowledge and tools to protect themselves from 
                UV radiation while promoting environmental awareness and action to address ozone depletion.
              </p>
              <p>
                Our platform combines educational resources, personalized protection recommendations, and community initiatives to create 
                a holistic approach to addressing this global environmental challenge.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-3">Our Core Values</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="bg-ecoshield-deep-green/20 p-1 rounded-full mt-1">
                      <Shield className="h-4 w-4 text-ecoshield-deep-green" />
                    </div>
                    <div>
                      <span className="font-medium">Protection</span> - Providing practical tools for personal safety
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-ecoshield-deep-green/20 p-1 rounded-full mt-1">
                      <Shield className="h-4 w-4 text-ecoshield-deep-green" />
                    </div>
                    <div>
                      <span className="font-medium">Education</span> - Increasing understanding of environmental issues
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-ecoshield-deep-green/20 p-1 rounded-full mt-1">
                      <Shield className="h-4 w-4 text-ecoshield-deep-green" />
                    </div>
                    <div>
                      <span className="font-medium">Action</span> - Inspiring community participation in solutions
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-ecoshield-deep-green/20 p-1 rounded-full mt-1">
                      <Shield className="h-4 w-4 text-ecoshield-deep-green" />
                    </div>
                    <div>
                      <span className="font-medium">Accessibility</span> - Making information available to everyone
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
                alt="Beautiful landscape showing earth's environment" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-ecoshield-sky-blue/10 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-ecoshield-deep-green/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                alt="Sun shining through trees showing protection from UV rays" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-ecoshield-sky-blue/10 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-ecoshield-deep-green/10 rounded-lg -z-10"></div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-ecoshield-sky-blue" />
              </div>
              <h2 className="text-2xl font-semibold">The Challenge We Address</h2>
            </div>
            <div className="space-y-4">
              <p>
                Ozone depletion and increased UV radiation pose significant risks to human health and ecosystems worldwide. 
                Despite progress in reducing ozone-depleting substances, the ozone layer remains vulnerable, and UV radiation 
                continues to cause millions of skin cancer cases annually.
              </p>
              <p>
                Yet, there's a gap in accessible, personalized information that connects environmental monitoring with practical, 
                everyday protection strategies. EcoShield aims to bridge this gap by providing a comprehensive platform that makes 
                environmental science actionable at an individual level.
              </p>
              <div className="mt-6 bg-muted p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="italic">
                  "A world where everyone has the knowledge and tools to protect themselves from environmental hazards, 
                  and where collective action leads to a restored and healthy atmosphere for future generations."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
            <User className="h-6 w-6 text-ecoshield-sky-blue" />
          </div>
          <h2 className="text-2xl font-semibold">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden eco-card">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-ecoshield-sky-blue font-medium text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full">
            <MessageSquare className="h-6 w-6 text-ecoshield-sky-blue" />
          </div>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you. 
              Fill out the form, and our team will get back to you as soon as possible.
            </p>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-ecoshield-sky-blue/20 p-2 rounded-full mt-1">
                <Mail className="h-5 w-5 text-ecoshield-sky-blue" />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">contact@ecoshield.example</p>
              </div>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg">
              <h4 className="font-medium mb-3">Join Our Mission</h4>
              <p className="text-muted-foreground">
                Interested in working with us? We're always looking for passionate individuals who share our commitment 
                to environmental protection and education.
              </p>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
