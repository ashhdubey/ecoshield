
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    skinType: "",
    disease: "",
    routine: "",
    city: "",
    country: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      setStep(2);
    } else {
      // Validate second step
      if (!formData.age || !formData.skinType || !formData.city || !formData.country) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      try {
        setLoading(true);
        
        // Create the user in Supabase Auth
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        });

        if (error) throw error;

        // Store additional user data in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user?.id,
              name: formData.name,
              email: formData.email,
              age: parseInt(formData.age),
              skin_type: formData.skinType,
              medical_conditions: formData.disease,
              daily_routine: formData.routine,
              city: formData.city,
              country: formData.country,
            }
          ]);

        if (profileError) throw profileError;
        
        toast.success("Account created successfully! Please verify your email.");
        navigate("/login");
      } catch (error: any) {
        toast.error(error.message || "Error creating account");
        console.error("Signup error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const skinTypes = [
    { value: "type1", label: "Type I - Always burns, never tans" },
    { value: "type2", label: "Type II - Usually burns, tans minimally" },
    { value: "type3", label: "Type III - Sometimes burns, tans uniformly" },
    { value: "type4", label: "Type IV - Burns minimally, tans easily" },
    { value: "type5", label: "Type V - Rarely burns, tans darkly" },
    { value: "type6", label: "Type VI - Never burns, deeply pigmented" },
  ];

  const routines = [
    { value: "indoor", label: "Mostly Indoor" },
    { value: "mixed", label: "Mixed Indoor/Outdoor" },
    { value: "outdoor", label: "Mostly Outdoor" },
  ];

  return (
    <div className="container max-w-md py-16">
      <div className="flex justify-center mb-8">
        <div className="p-2 rounded-full bg-ecoshield-sky-blue/20">
          <Shield className="h-12 w-12 text-ecoshield-sky-blue" />
        </div>
      </div>
      
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            {step === 1 
              ? "Enter your details to create your EcoShield account" 
              : "Tell us more about yourself for personalized protection"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {step === 1 ? (
              // Step 1: Basic account information
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              // Step 2: Personal and location information
              <>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    name="age" 
                    type="number" 
                    placeholder="25" 
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skinType">Skin Type</Label>
                  <Select 
                    value={formData.skinType} 
                    onValueChange={(value) => handleSelectChange("skinType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      {skinTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disease">Medical Conditions (Optional)</Label>
                  <Input 
                    id="disease" 
                    name="disease" 
                    placeholder="e.g., Photosensitivity" 
                    value={formData.disease}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routine">Daily Routine</Label>
                  <Select 
                    value={formData.routine} 
                    onValueChange={(value) => handleSelectChange("routine", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your daily routine" />
                    </SelectTrigger>
                    <SelectContent>
                      {routines.map((routine) => (
                        <SelectItem key={routine.value} value={routine.value}>
                          {routine.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="New York" 
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      placeholder="USA" 
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {step === 1 ? "Continue" : loading ? "Creating Account..." : "Create Account"}
            </Button>
            {step === 2 && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                Back
              </Button>
            )}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-ecoshield-sky-blue hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
