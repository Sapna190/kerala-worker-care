import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DoctorRegistration } from "@/components/DoctorRegistration";
import { QrScanner } from "@/components/QrScanner";
import { PatientRecords } from "@/components/PatientRecords";
import { ArrowLeft, Stethoscope, QrCode, FileText, Users, Clock, ShieldCheck, Activity, TrendingUp } from "lucide-react";
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
    // Simulate verification process
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
        <header className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-secondary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-secondary rounded-xl shadow-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Doctor Registration</h1>
                  <p className="text-sm text-muted-foreground">Join the healthcare network</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <DoctorRegistration onRegistrationComplete={handleRegistrationComplete} />
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted flex items-center justify-center">
        <Card className="w-full max-w-lg mx-6 shadow-medical bg-white/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-6 p-5 bg-gradient-secondary rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg">
              <Clock className="h-10 w-10 text-white animate-pulse-slow" />
            </div>
            <CardTitle className="text-2xl">Verification in Progress</CardTitle>
            <CardDescription className="text-base">
              Thank you for registering, Dr. {doctorInfo?.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 text-base px-4 py-2">
              Doctor ID: {doctorInfo?.doctorId}
            </Badge>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Your registration is being reviewed by the Kerala Health Department. 
                You'll receive access to patient records once verification is complete.
              </p>
              
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-secondary h-3 rounded-full w-3/4 animate-pulse"></div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Verification typically takes 24-48 hours
              </p>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="w-full"
              >
                Return to Home
              </Button>
              <p className="text-xs text-muted-foreground">
                You'll receive an email notification once verified
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-secondary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-secondary rounded-xl shadow-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Doctor Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome, Dr. {doctorInfo?.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 hidden sm:flex">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="outline" className="hidden md:flex">
                ID: {doctorInfo?.doctorId}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm p-1 h-auto">
            <TabsTrigger value="overview" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Stethoscope className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="scanner" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <QrCode className="h-4 w-4" />
              <span>Scan Patient</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <FileText className="h-4 w-4" />
              <span>Patient Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Welcome Card */}
            <Card className="bg-gradient-secondary text-white border-0 shadow-medical overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Ready to Help Patients</CardTitle>
                    <CardDescription className="text-white/80 text-base">
                      Your verification is complete and you're ready to access patient records
                    </CardDescription>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Doctor ID</p>
                    <p className="text-xl font-semibold">{doctorInfo?.doctorId}</p>
                  </div>
                  <Button variant="outline" className="bg-white text-secondary border-white hover:bg-white/90">
                    <QrCode className="h-4 w-4 mr-2" />
                    Scan Patient
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Profile */}
            <Card className="shadow-card bg-white/70 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-secondary" />
                  </div>
                  <span>Professional Profile</span>
                </CardTitle>
                <CardDescription>Your medical credentials and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Full Name", value: `Dr. ${doctorInfo?.name}`, icon: Users },
                    { label: "Specialization", value: doctorInfo?.specialization, icon: Activity },
                    { label: "License Number", value: doctorInfo?.licenseNumber, icon: ShieldCheck },
                    { label: "Contact", value: doctorInfo?.contact, icon: Users },
                    { label: "Verification Status", value: "Verified", icon: ShieldCheck },
                    { label: "Registration Date", value: "Today", icon: Clock }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                      </div>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Patients Seen", value: "0", icon: Users, color: "text-primary", bgColor: "bg-primary/10" },
                { title: "Records Added", value: "0", icon: FileText, color: "text-secondary", bgColor: "bg-secondary/10" },
                { title: "QR Scans", value: "0", icon: QrCode, color: "text-accent", bgColor: "bg-accent/10" },
                { title: "This Month", value: "0", icon: TrendingUp, color: "text-success", bgColor: "bg-success/10" }
              ].map((stat, index) => (
                <Card key={index} className="shadow-card bg-white/70 backdrop-blur-sm border-border/50 hover:shadow-medical transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card hover:shadow-medical transition-all duration-300 bg-white/70 backdrop-blur-sm border-border/50 group cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                      <QrCode className="h-5 w-5 text-secondary group-hover:text-white" />
                    </div>
                    <span>Scan Patient QR</span>
                  </CardTitle>
                  <CardDescription>Quickly access patient records by scanning their health card</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-secondary hover:bg-gradient-secondary/90 text-white">
                    <QrCode className="h-4 w-4 mr-2" />
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/70 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Your latest patient interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium">Account verified</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                  
                  <div className="text-center py-6 text-muted-foreground">
                    <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No patient interactions yet</p>
                    <p className="text-xs">Scan your first patient QR code to get started</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scanner" className="space-y-6">
            <QrScanner onPatientScanned={handlePatientScanned} />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
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