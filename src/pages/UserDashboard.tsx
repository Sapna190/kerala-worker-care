import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { QrCodeComponent } from "@/components/QrCodeComponent";
import { UserRegistration } from "@/components/UserRegistration";
import { HealthRecords } from "@/components/HealthRecords";
import { ArrowLeft, Download, QrCode, User, FileText, Heart, Shield, Clock, MapPin } from "lucide-react";
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
        <header className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Worker Registration</h1>
                  <p className="text-sm text-muted-foreground">Create your digital health card</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <UserRegistration onRegistrationComplete={handleRegistrationComplete} />
        </div>
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
                className="flex items-center space-x-2 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Home</span>
              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">My Health Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Welcome back, {userInfo?.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20 hidden sm:flex">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="outline" className="hidden md:flex">
                ID: {userInfo?.userId}
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
              <Heart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="qr-card" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <QrCode className="h-4 w-4" />
              <span>Health Card</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md">
              <FileText className="h-4 w-4" />
              <span>Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Welcome Card */}
            <Card className="bg-gradient-primary text-white border-0 shadow-medical overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Welcome back!</CardTitle>
                    <CardDescription className="text-white/80 text-base">
                      Your health card is ready to use
                    </CardDescription>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Health ID</p>
                    <p className="text-xl font-semibold">{userInfo?.userId}</p>
                  </div>
                  <Button variant="outline" className="bg-white text-primary border-white hover:bg-white/90">
                    <QrCode className="h-4 w-4 mr-2" />
                    View QR
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card className="shadow-card bg-white/70 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>Your personal and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { label: "Full Name", value: userInfo?.name, icon: User },
                    { label: "Age", value: `${userInfo?.age} years`, icon: Clock },
                    { label: "Origin State", value: userInfo?.originState, icon: MapPin },
                    { label: "Occupation", value: userInfo?.occupation, icon: User },
                    { label: "Contact", value: userInfo?.contact, icon: User },
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

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card hover:shadow-medical transition-all duration-300 bg-white/70 backdrop-blur-sm border-border/50 group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <QrCode className="h-5 w-5 text-primary group-hover:text-white" />
                    </div>
                    <span>Digital Health Card</span>
                  </CardTitle>
                  <CardDescription>Show this QR code to doctors for instant access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-border/50">
                      <QrCodeComponent 
                        value={userInfo?.userId || ''} 
                        size={140}
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Download Card
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card bg-white/70 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <span>Health Summary</span>
                  </CardTitle>
                  <CardDescription>Your medical activity overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm font-medium">Health card created</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Today</span>
                    </div>
                    
                    <div className="text-center py-6 text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No medical visits yet</p>
                      <p className="text-xs">Records will appear here after doctor visits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Total Visits", value: "0", icon: Heart, color: "text-primary" },
                { title: "Records Added", value: "0", icon: FileText, color: "text-secondary" },
                { title: "Last Visit", value: "Never", icon: Clock, color: "text-muted-foreground" }
              ].map((stat, index) => (
                <Card key={index} className="shadow-card bg-white/70 backdrop-blur-sm border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qr-card" className="space-y-6">
            <QrCodeComponent 
              value={userInfo?.userId || ''} 
              userInfo={userInfo}
              showCard={true}
            />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <HealthRecords userId={userInfo?.userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;