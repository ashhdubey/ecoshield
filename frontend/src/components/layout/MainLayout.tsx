import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, Menu, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import EarthModel from "../3d/EarthModel"

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // For programmatic navigation

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chronicle", path: "/chronicle" },
    { name: "RegenEarth", path: "/regen-earth" },
    { name: "MyShield", path: "/my-shield" },
    { name: "About", path: "/about" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(); // Assuming signOut updates the auth state
      toast.success("Signed out successfully");

      // Redirect to the home or login page after successful sign-out
      navigate("/"); // Or you can use "/" if you want to direct to the homepage
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-ecoshield-sky-blue" />
              <span className="text-xl font-bold">EcoShield</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-ecoshield-sky-blue",
                  location.pathname === link.path && "text-ecoshield-sky-blue"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="hidden md:inline-flex gap-2"
                >
                  <Link to="/my-shield">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden md:inline-flex gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="outline" className="hidden md:inline-flex">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="hidden md:inline-flex">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden fixed inset-0 top-16 z-50 bg-background",
            isMobileMenuOpen ? "block" : "hidden"
          )}
        >
          <div className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "py-2 text-lg",
                  location.pathname === link.path && "text-ecoshield-sky-blue"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              {user ? (
                <>
                  <Button asChild variant="outline">
                    <Link to="/my-shield" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

 

      <footer className="border-t py-8 bg-muted/40">
        <div className="overflow-hidden h-[85vh] sm:h-screen">
          <div data-scroll data-scroll-speed="-0.5" className="relative w-full flex items-center overflow-hidden h-[85vh] sm:h-screen  bg-[#070707] text-[#F8FAFC]">
            <div className="video-container absolute top-0 right-0 h-1/2 w-2/3 sm:w-3/5 flex items-center">
              <video
                className="w-full scale-125"
                autoPlay
                muted
                loop
                src="https://www.exoape.com/video/video-6.mp4"
              ></video>
            </div>
            <div className="absolute w-full max-w-screen-2xl mx-auto px-7 sm:px-28">
              <div className="space-y-7 sm:space-y-10">
                <div>
                  <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">Our</h1>
                  <h1 className="text-6xl sm:text-[9rem] sm:tracking-tighter">Story</h1>
                </div>
                <p className="text-lg sm:opacity-90 sm:text-2xl sm:w-1/2 leading-[1.5rem]">
                EcoShield is a TECH-POWERED software to protect from UV rays and spread ozone awareness.
                </p>
                <a className="border-b-2 inline-block sm:hidden border-[#e0ccbb]" href="#">
                  Our Story
                </a>
                <span className="inline-block w-full h-[1px] opacity-50 bg-[#e0ccbb]"></span>
                <div className="flex justify-between items-end">
                  <div className="flex gap-28 sm:gap-32">
                    <ul className="space-y-2 max-sm:hidden">
                      {["United University", "Rawatpur, Prayagra", "India", "EcoShield@gmail.com"].map(item => (
                        <a
                          key={item}
                          className="block text-sm opacity-85"
                          href="#"
                        >
                          {item}
                        </a>
                      ))}
                    </ul>
                    <ul className="space-y-2">
                      {["Quick links", "Research", "Patners", "Contact Us"].map((item) => (
                        <a
                          key={item}
                          className="block text-sm opacity-85 capitalize"
                          href="#"
                        >
                          {item}
                        </a>
                      ))}
                    </ul>
                    <ul className="space-y-2">
                      {["Doctor Consultation", "Travel Mode", "UV Safety Tips", "Download Report"].map((item) => (
                        <a
                          key={item}
                          className="block text-sm opacity-85 capitalize"
                          href="https://www.instagram.com/ecoshield_uu/"
                        >
                          {item}
                        </a>
                      ))}
                    </ul>
                    <ul className="space-y-2">
                      {["NASA Science", "American Academy of Dermatology", "World health organization"].map((item) => (
                        <a
                          key={item}
                          className="block text-sm opacity-85 capitalize"
                          href="#"
                        >
                          {item}
                        </a>
                      ))}
                    </ul>
                  </div>

                  <a className="border-b inline-block max-sm:hidden border-[#e0ccbb]" href="#">More About Ozone</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
