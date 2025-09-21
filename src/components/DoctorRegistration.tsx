import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Stethoscope, FileText, Phone, Award } from "lucide-react";

interface DoctorRegistrationProps {
  onRegistrationComplete: (doctorData: any) => void;
}

export const DoctorRegistration = ({ onRegistrationComplete }: DoctorRegistrationProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    licenseNumber: "",
    qualification: "",
    experience: "",
    contact: "",
    email: "",
    workAddress: "",
    hospitalAffiliation: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializations = [
    "General Medicine", "Pediatrics", "Cardiology", "Dermatology", 
    "Orthopedics", "Gynecology", "Psychiatry", "Surgery", 
    "Emergency Medicine", "Family Medicine", "Other"
  ];

  const generateDoctorId = () => {
    const prefix = "DOC";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.specialization || !formData.licenseNumber || !formData.contact) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      // Generate doctor ID
      const doctorId = generateDoctorId();
      
      // Create doctor data object
      const doctorData = {
        ...formData,
        doctorId,
        verified: false,
        createdAt: new Date().toISOString(),
        approvedByAdmin: null
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Registration Submitted!",
        description: `Your application has been submitted for verification. Doctor ID: ${doctorId}`,
        variant: "default"
      });

      onRegistrationComplete(doctorData);
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
          <div className="mx-auto mb-4 p-4 bg-gradient-secondary rounded-full w-16 h-16 flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Doctor Registration</CardTitle>
          <CardDescription>
            Join our healthcare network to serve migrant workers in Kerala
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Stethoscope className="h-5 w-5 text-secondary" />
                <span>Personal Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Dr. Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select value={formData.specialization} onValueChange={(value) => setFormData({...formData, specialization: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Professional Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Medical License Number *</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="IMR/KER/12345"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    min="0"
                    max="50"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    placeholder="MBBS, MD, etc."
                    value={formData.qualification}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5 text-accent" />
                <span>Work Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hospitalAffiliation">Hospital/Clinic Affiliation</Label>
                  <Input
                    id="hospitalAffiliation"
                    placeholder="Government Hospital, Private Clinic, etc."
                    value={formData.hospitalAffiliation}
                    onChange={(e) => setFormData({...formData, hospitalAffiliation: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workAddress">Work Address</Label>
                  <Textarea
                    id="workAddress"
                    placeholder="Enter your clinic/hospital address"
                    value={formData.workAddress}
                    onChange={(e) => setFormData({...formData, workAddress: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-semibold text-secondary mb-2">Verification Process:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your medical license will be verified with Indian Medical Register</li>
                  <li>• Admin approval required before accessing patient records</li>
                  <li>• Verification typically takes 24-48 hours</li>
                  <li>• You'll receive email notification once approved</li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
                variant="secondary"
              >
                {isSubmitting ? "Submitting Application..." : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};