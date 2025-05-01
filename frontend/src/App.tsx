// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ChroniclePage from "@/pages/ChroniclePage";
import RegenEarthPage from "@/pages/RegenEarthPage";
import MyShieldPage from "@/pages/MyShieldPage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: 10 },
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.3 };

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnimatedRoute><HomePage /></AnimatedRoute>} />
          <Route path="chronicle" element={<AnimatedRoute><ChroniclePage /></AnimatedRoute>} />
          <Route path="regen-earth" element={<AnimatedRoute><RegenEarthPage /></AnimatedRoute>} />

          {/* <Route path="earth" element={<AnimatedRoute><MyShieldPage /></AnimatedRoute>} /> */}

          <Route path="my-shield" element={
            <ProtectedRoute>
              <AnimatedRoute><MyShieldPage /></AnimatedRoute>
            </ProtectedRoute>
          } />
          <Route path="about" element={<AnimatedRoute><AboutPage /></AnimatedRoute>} />
        </Route>
        <Route path="/login" element={<AnimatedRoute><LoginPage /></AnimatedRoute>} />
        <Route path="/signup" element={<AnimatedRoute><SignupPage /></AnimatedRoute>} />
        <Route path="*" element={<AnimatedRoute><NotFoundPage /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
