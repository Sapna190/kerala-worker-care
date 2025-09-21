import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Users, QrCode, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-muted overflow-hidden">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">HealthCard Kerala</h1>
                <p className="text-sm text-muted-foreground">Digital Health Records for All</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">Secure & Verified</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-secondary opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-border rounded-full mb-8">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Kerala Government Initiative</span>
            </div>

            {/* Hero Heading */}
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Your Health,</span><br />
              <span className="text-foreground">Your Records</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Secure digital health record management system for migrant workers in Kerala. 
              Access your complete medical history anywhere, anytime.
            </p>
            
            {/* Role Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-4xl mx-auto">
              {/* Worker Card */}
              <Card 
                className="group hover:shadow-medical transition-all duration-500 cursor-pointer border-2 hover:border-primary/30 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                onClick={() => navigate('/user')}
              >
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto mb-6 p-5 bg-gradient-primary rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl mb-3 text-foreground">I'm a Worker</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Register and manage your health records securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <Button 
                    size="lg" 
                    className="w-full mb-6 bg-gradient-primary hover:bg-gradient-primary/90 text-white font-semibold py-3 h-auto"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <QrCode className="h-5 w-5 text-primary" />
                      <span>Get your digital health card</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Shield className="h-5 w-5 text-primary" />
                      <span>Secure & private records</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Doctor Card */}
              <Card 
                className="group hover:shadow-medical transition-all duration-500 cursor-pointer border-2 hover:border-secondary/30 bg-white/60 backdrop-blur-sm hover:bg-white/80"
                onClick={() => navigate('/doctor')}
              >
                <CardHeader className="text-center pb-6 pt-8">
                  <div className="mx-auto mb-6 p-5 bg-gradient-secondary rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl mb-3 text-foreground">I'm a Doctor</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Register and help patients manage their health
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full mb-6 bg-gradient-secondary hover:bg-gradient-secondary/90 text-white font-semibold py-3 h-auto"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <QrCode className="h-5 w-5 text-secondary" />
                      <span>Scan patient QR codes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-muted-foreground">
                      <Shield className="h-5 w-5 text-secondary" />
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
      <section className="py-20 bg-white/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-6 text-foreground">Why Choose HealthCard Kerala?</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built specifically for migrant workers, ensuring healthcare access and continuity across Kerala
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: QrCode,
                title: "Digital Health Card",
                description: "Unique QR code for instant access to your complete medical history",
                gradient: "bg-gradient-primary"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your health data is protected with enterprise-grade security measures",
                gradient: "bg-gradient-secondary"
              },
              {
                icon: Heart,
                title: "Better Healthcare",
                description: "Improved treatment decisions with complete, accessible medical history",
                gradient: "bg-gradient-primary"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`mx-auto mb-6 p-6 ${feature.gradient} rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-2xl font-semibold mb-4 text-foreground">{feature.title}</h4>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Join Thousands of Workers
            </h3>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Already using HealthCard Kerala for better healthcare access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white text-primary hover:bg-white/90 border-white px-8 py-3 h-auto font-semibold"
                onClick={() => navigate('/user')}
              >
                Register as Worker
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-white hover:bg-white/10 border-white px-8 py-3 h-auto font-semibold"
                onClick={() => navigate('/doctor')}
              >
                Register as Doctor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold">HealthCard Kerala</h4>
            </div>
            <p className="text-white/80 mb-2">© 2025 HealthCard Kerala - Digital Health Records System</p>
            <p className="text-white/60 text-sm">
              Supporting migrant worker healthcare in Kerala • Government of Kerala Initiative
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;