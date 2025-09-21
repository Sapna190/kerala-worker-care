import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DoctorRegistration } from "@/components/DoctorRegistration";
import { QrScanner } from "@/components/QrScanner";
import { PatientRecords } from "@/components/PatientRecords";
import { ArrowLeft, Stethoscope, QrCode, FileText, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleRegistrationComplete = (doctorData: any) => {
    setDoctorInfo(doctorData);
    setIsRegistered(true);
    // Simulate verification process - in real app this would be admin approval
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  };

  const handlePatientScanned = (patientData: any) => {
    setSelectedPatient(patientData);
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted">
        <header className="bg-white/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-secondary rounded-lg">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Doctor Registration</h1>
                  <p className="text-xs text-muted-foreground">Join the healthcare network</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <DoctorRegistration onRegistrationComplete={handleRegistrationComplete} />
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 shadow-medical">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-gradient-secondary rounded-full w-16 h-16 flex items-center justify-center">
              <Clock className="h-8 w-8 text-white animate-pulse-slow" />
            </div>
            <CardTitle>Verification in Progress</CardTitle>
            <CardDescription>
              Thank you for registering, Dr. {doctorInfo?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              Doctor ID: {doctorInfo?.doctorId}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Your registration is being reviewed by the health department. 
              You'll be able to access patient records once verified.
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-secondary h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-xs text-muted-foreground">
              This usually takes 24-48 hours
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-secondary rounded-lg">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Doctor Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Welcome, Dr. {doctorInfo?.name}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden sm:flex bg-success text-success-foreground">
                Verified ✓
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                ID: {doctorInfo?.doctorId}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Stethoscope className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center space-x-2">
              <QrCode className="h-4 w-4" />
              <span>Scan Patient</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Patient Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Doctor Profile */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-secondary" />
                  <span>Doctor Profile</span>
                </CardTitle>
                <CardDescription>Your professional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">Dr. {doctorInfo?.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specialization</label>
                    <p className="text-sm text-muted-foreground">{doctorInfo?.specialization}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">License Number</label>
                    <p className="text-sm text-muted-foreground">{doctorInfo?.licenseNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact</label>
                    <p className="text-sm text-muted-foreground">{doctorInfo?.contact}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Doctor ID</label>
                    <Badge variant="outline">{doctorInfo?.doctorId}</Badge>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Badge variant="secondary" className="bg-success text-success-foreground">Verified ✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Patients Seen</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    <span>Records Added</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-secondary">0</p>
                  <p className="text-sm text-muted-foreground">Total records</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <QrCode className="h-5 w-5 text-accent" />
                    <span>QR Scans</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent">0</p>
                  <p className="text-sm text-muted-foreground">Successful scans</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scanner">
            <QrScanner onPatientScanned={handlePatientScanned} />
          </TabsContent>

          <TabsContent value="records">
            <PatientRecords 
              selectedPatient={selectedPatient}
              doctorId={doctorInfo?.doctorId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;