
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Globe, LogOut, Menu, Shield, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import EarthModel from "@/components/3d/EarthModel";

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chronicle", path: "/chronicle" },
    { name: "RegenEarth", path: "/regen-earth" },
    { name: "MyShield", path: "/my-shield" },
    { name: "About", path: "/about" },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
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

      <footer className="border-t py-8 bg-muted/40 relative overflow-hidden">
        {/* Background animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-ecoshield-sky-blue/5 to-ecoshield-deep-green/5 animate-pulse z-0"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-6 w-6 text-ecoshield-sky-blue" />
                    <span className="text-xl font-bold">EcoShield</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Protecting you and our planet from harmful UV radiation.
                  </p>
                </div>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-4 md:mt-0"
                >
                  <Button 
                    asChild 
                    size="sm" 
                    variant="outline" 
                    className="hover-scale"
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            <div className="md:col-span-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold mb-4 story-link inline-block">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      show: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {[
                      { name: "Home", path: "/" },
                      { name: "Chronicle", path: "/chronicle" },
                      { name: "RegenEarth", path: "/regen-earth" },
                      { name: "MyShield", path: "/my-shield" },
                      { name: "About", path: "/about" },
                    ].map((link, i) => (
                      <motion.li 
                        key={link.path}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          show: { opacity: 1, x: 0 }
                        }}
                      >
                        <Link
                          to={link.path}
                          className="text-muted-foreground hover:text-foreground transition-colors story-link"
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.div>
                </ul>
              </motion.div>
            </div>
            
            <div className="md:col-span-4 flex flex-col items-center md:items-end">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <h3 className="font-semibold mb-4 text-center md:text-right">Our Planet</h3>
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="hover-scale"
                  >
                    <EarthModel size={1} className="mx-auto" />
                  </motion.div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Together we can heal the ozone layer
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground"
          >
            <p>&copy; {new Date().getFullYear()} EcoShield. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
