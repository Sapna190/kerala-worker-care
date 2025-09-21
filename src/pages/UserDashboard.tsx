import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { QrCodeComponent } from "@/components/QrCodeComponent";
import { UserRegistration } from "@/components/UserRegistration";
import { HealthRecords } from "@/components/HealthRecords";
import { ArrowLeft, Download, QrCode, User, FileText, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleRegistrationComplete = (userData: any) => {
    setUserInfo(userData);
    setIsRegistered(true);
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
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Worker Registration</h1>
                  <p className="text-xs text-muted-foreground">Create your digital health card</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <UserRegistration onRegistrationComplete={handleRegistrationComplete} />
        </div>
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
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">My Health Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Welcome, {userInfo?.name}</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              ID: {userInfo?.userId}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="qr-card" className="flex items-center space-x-2">
              <QrCode className="h-4 w-4" />
              <span>Health Card</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Summary */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Profile Summary</span>
                </CardTitle>
                <CardDescription>Your basic information and health status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Full Name</Label>
                    <p className="text-sm text-muted-foreground">{userInfo?.name}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Age</Label>
                    <p className="text-sm text-muted-foreground">{userInfo?.age} years</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Origin State</Label>
                    <p className="text-sm text-muted-foreground">{userInfo?.originState}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Occupation</Label>
                    <p className="text-sm text-muted-foreground">{userInfo?.occupation}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Contact</Label>
                    <p className="text-sm text-muted-foreground">{userInfo?.contact}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Health ID</Label>
                    <Badge variant="outline">{userInfo?.userId}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card hover:shadow-medical transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <QrCode className="h-5 w-5 text-primary" />
                    <span>Digital Health Card</span>
                  </CardTitle>
                  <CardDescription>Show this QR code to doctors for quick access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                      <QrCodeComponent 
                        value={userInfo?.userId || ''} 
                        size={120}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Card
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Your latest health interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Health card created</p>
                        <p className="text-xs text-muted-foreground">Just now</p>
                      </div>
                    </div>
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No medical visits yet
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="qr-card">
            <QrCodeComponent 
              value={userInfo?.userId || ''} 
              userInfo={userInfo}
              showCard={true}
            />
          </TabsContent>

          <TabsContent value="records">
            <HealthRecords userId={userInfo?.userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;