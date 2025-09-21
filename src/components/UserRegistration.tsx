import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Phone, Briefcase } from "lucide-react";

interface UserRegistrationProps {
  onRegistrationComplete: (userData: any) => void;
}

export const UserRegistration = ({ onRegistrationComplete }: UserRegistrationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    originState: "",
    occupation: "",
    contact: "",
    address: "",
    emergencyContact: "",
    emergencyContactName: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const indianStates = [
    "Andhra Pradesh", "Bihar", "Chhattisgarh", "Gujarat", "Haryana", 
    "Jharkhand", "Karnataka", "Madhya Pradesh", "Maharashtra", "Odisha", 
    "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", 
    "West Bengal", "Other"
  ];

  const occupations = [
    "Construction Worker", "Domestic Worker", "Factory Worker", "Farm Worker",
    "Security Guard", "Driver", "Cleaner", "Cook", "Shopkeeper", "Other"
  ];

  const generateUserId = () => {
    const prefix = "USR";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.age || !formData.gender || !formData.contact) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      // Generate user ID
      const userId = generateUserId();
      
      // Create user data object
      const userData = {
        ...formData,
        userId,
        createdAt: new Date().toISOString(),
        qrCodeUrl: `qr-code-${userId}.png`
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Registration Successful!",
        description: `Welcome to HealthCard Kerala! Your ID is ${userId}`,
        variant: "default"
      });

      onRegistrationComplete(userData);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-medical">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Worker Registration</CardTitle>
          <CardDescription>
            Create your digital health record to access healthcare services in Kerala
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Personal Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number *</Label>
                  <Input
                    id="contact"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Origin & Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>Origin & Work Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originState">Origin State</Label>
                  <Select value={formData.originState} onValueChange={(value) => setFormData({...formData, originState: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your home state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Select value={formData.occupation} onValueChange={(value) => setFormData({...formData, occupation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupations.map((occupation) => (
                        <SelectItem key={occupation} value={occupation}>{occupation}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Current Address in Kerala</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your current address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Phone className="h-5 w-5 text-destructive" />
                <span>Emergency Contact</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    placeholder="Name of emergency contact"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                  <Input
                    id="emergencyContact"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By registering, you agree to share your health information with authorized healthcare providers 
                  for medical purposes. Your data will be kept secure and confidential.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
                variant="hero"
              >
                {isSubmitting ? "Creating Your Health Card..." : "Create My Health Card"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};