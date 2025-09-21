import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Search, Camera, User } from "lucide-react";

interface QrScannerProps {
  onPatientScanned: (patientData: any) => void;
}

export const QrScanner = ({ onPatientScanned }: QrScannerProps) => {
  const { toast } = useToast();
  const [manualId, setManualId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [scanMode, setScanMode] = useState<'manual' | 'camera'>('manual');

  // Mock patient data for demo
  const mockPatients = {
    "USR123456789": {
      userId: "USR123456789",
      name: "Ramesh Kumar",
      age: 32,
      gender: "Male",
      originState: "Bihar",
      occupation: "Construction Worker",
      contact: "+91 9876543210",
      lastVisit: null,
      medicalHistory: []
    },
    "USR987654321": {
      userId: "USR987654321",
      name: "Priya Sharma",
      age: 28,
      gender: "Female",
      originState: "Uttar Pradesh",
      occupation: "Domestic Worker",
      contact: "+91 8765432109",
      lastVisit: "2025-01-15",
      medicalHistory: [
        {
          date: "2025-01-15",
          diagnosis: "Common Cold",
          doctor: "Dr. Anjali Nair",
          treatment: "Rest and fluids"
        }
      ]
    }
  };

  const searchPatient = async (patientId: string) => {
    setIsSearching(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const patient = mockPatients[patientId as keyof typeof mockPatients];
      
      if (patient) {
        toast({
          title: "Patient Found!",
          description: `Retrieved records for ${patient.name}`,
          variant: "default"
        });
        onPatientScanned(patient);
      } else {
        toast({
          title: "Patient Not Found",
          description: "Please check the ID and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSearch = () => {
    if (!manualId.trim()) {
      toast({
        title: "Missing Patient ID",
        description: "Please enter a valid patient ID",
        variant: "destructive"
      });
      return;
    }
    searchPatient(manualId.trim());
  };

  const handleQrScan = () => {
    // In a real app, this would open camera and scan QR code
    // For demo, we'll simulate scanning
    toast({
      title: "Camera Feature",
      description: "QR Camera scanning will be available in mobile app version",
      variant: "default"
    });
    
    // Simulate successful scan with demo data
    setTimeout(() => {
      searchPatient("USR123456789");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Manual ID Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Search Patient by ID</span>
          </CardTitle>
          <CardDescription>
            Enter the patient's health ID to access their records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="patientId" className="sr-only">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter Patient ID (e.g., USR123456789)"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              />
            </div>
            <Button 
              onClick={handleManualSearch}
              disabled={isSearching}
              variant="default"
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
          
          {/* Demo IDs for testing */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">Demo Patient IDs for testing:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>USR123456789</span>
                <span>(Ramesh Kumar - New patient)</span>
              </div>
              <div className="flex justify-between">
                <span>USR987654321</span>
                <span>(Priya Sharma - Has medical history)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Scanner */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5 text-secondary" />
            <span>Scan Patient QR Code</span>
          </CardTitle>
          <CardDescription>
            Use camera to scan patient's digital health card
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-8 border-2 border-dashed border-muted rounded-lg">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              QR Code scanner will appear here
            </p>
            <Button 
              onClick={handleQrScan}
              variant="secondary"
              className="w-full"
            >
              <Camera className="h-4 w-4 mr-2" />
              Start Camera Scanner
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Camera access required for QR scanning.</p>
            <p>Make sure the QR code is clearly visible and well-lit.</p>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <User className="h-5 w-5" />
            <span>How to Find Patients</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <div>
              <p className="font-medium">Ask for Health Card</p>
              <p className="text-sm text-muted-foreground">Patient should show their digital health card with QR code</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <div>
              <p className="font-medium">Scan or Enter ID</p>
              <p className="text-sm text-muted-foreground">Use QR scanner or manually enter the patient ID</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <div>
              <p className="font-medium">Access Records</p>
              <p className="text-sm text-muted-foreground">View and update patient's medical history</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};