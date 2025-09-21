import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HealthCard Kerala</h1>
                <p className="text-xs text-muted-foreground">Digital Health Records for All</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Your Health, Your Records
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Secure digital health record management system for migrant workers in Kerala. 
              Access your medical history anywhere, anytime.
            </p>
            
            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
              <Card 
                className="hover:shadow-medical transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
                onClick={() => navigate('/user')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Worker</CardTitle>
                  <CardDescription className="text-base">
                    Register and manage your health records
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="hero" size="lg" className="w-full">
                    Get Started
                  </Button>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center space-x-2">
                      <QrCode className="h-4 w-4" />
                      <span>Get your digital health card</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure & private records</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="hover:shadow-medical transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50"
                onClick={() => navigate('/doctor')}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-secondary rounded-full w-16 h-16 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Doctor</CardTitle>
                  <CardDescription className="text-base">
                    Register and help patients manage their health
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button variant="secondary" size="lg" className="w-full">
                    Register Now
                  </Button>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center space-x-2">
                      <QrCode className="h-4 w-4" />
                      <span>Scan patient QR codes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Update medical records</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose HealthCard Kerala?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built specifically for migrant workers, ensuring healthcare access and continuity
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                <QrCode className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Digital Health Card</h4>
              <p className="text-muted-foreground">
                Unique QR code for instant access to your complete medical history
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-secondary rounded-full w-16 h-16 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure & Private</h4>
              <p className="text-muted-foreground">
                Your health data is protected with enterprise-grade security
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Better Healthcare</h4>
              <p className="text-muted-foreground">
                Improved treatment decisions with complete medical history
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-hero text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 HealthCard Kerala - Digital Health Records System</p>
          <p className="text-white/80 text-sm">
            Supporting migrant worker healthcare in Kerala
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;