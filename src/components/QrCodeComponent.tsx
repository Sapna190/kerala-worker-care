import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, QrCode, Heart } from "lucide-react";

interface QrCodeComponentProps {
  value: string;
  size?: number;
  userInfo?: any;
  showCard?: boolean;
}

export const QrCodeComponent = ({ value, size = 200, userInfo, showCard = false }: QrCodeComponentProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current && value) {
        try {
          await QRCode.toCanvas(canvasRef.current, value, {
            width: size,
            margin: 2,
            color: {
              dark: '#0A85C2',
              light: '#FFFFFF'
            }
          });

          // Also generate data URL for download
          const dataUrl = await QRCode.toDataURL(value, {
            width: size * 2,
            margin: 2,
            color: {
              dark: '#0A85C2',
              light: '#FFFFFF'
            }
          });
          setQrDataUrl(dataUrl);
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      }
    };

    generateQR();
  }, [value, size]);

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = `health-card-${userInfo?.userId || 'qr'}.png`;
      link.href = qrDataUrl;
      link.click();
    }
  };

  if (showCard && userInfo) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-medical border-2 border-primary/20">
          <CardHeader className="text-center bg-gradient-hero text-white">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="h-6 w-6" />
              <CardTitle className="text-xl">Digital Health Card</CardTitle>
            </div>
            <CardDescription className="text-white/90">
              Kerala Health Record System
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Patient Information */}
              <div className="space-y-4">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{userInfo.name}</h3>
                  <Badge variant="outline" className="mb-4">
                    ID: {userInfo.userId}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Age:</span>
                    <span className="text-sm">{userInfo.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Gender:</span>
                    <span className="text-sm">{userInfo.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Origin:</span>
                    <span className="text-sm">{userInfo.originState}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Occupation:</span>
                    <span className="text-sm">{userInfo.occupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Contact:</span>
                    <span className="text-sm">{userInfo.contact}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="inline-block p-4 bg-white rounded-lg shadow-card">
                  <canvas ref={canvasRef} className="block" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Show this QR code to healthcare providers
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                onClick={downloadQR}
                variant="default"
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Health Card</span>
              </Button>
              <Button 
                variant="outline"
                className="flex-1 flex items-center justify-center space-x-2"
                onClick={() => window.print()}
              >
                <QrCode className="h-4 w-4" />
                <span>Print Card</span>
              </Button>
            </div>

            {/* Emergency Information */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-semibold text-destructive mb-2">Emergency Instructions:</h4>
              <p className="text-xs text-muted-foreground">
                In case of emergency, any healthcare provider can scan this QR code to access your medical history. 
                Keep this card with you at all times.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-center">
      <canvas ref={canvasRef} className="block mx-auto" />
      {userInfo && (
        <Button 
          onClick={downloadQR}
          variant="outline"
          size="sm"
          className="mt-2 flex items-center space-x-2 mx-auto"
        >
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      )}
    </div>
  );
};