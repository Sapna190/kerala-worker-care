import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Download, Eye, User, Stethoscope } from "lucide-react";

interface HealthRecordsProps {
  userId: string;
}

export const HealthRecords = ({ userId }: HealthRecordsProps) => {
  // Mock health records data
  const [healthRecords] = useState([
    {
      id: "REC001",
      date: "2025-01-15",
      doctor: "Dr. Anjali Nair",
      hospital: "Kerala Medical College",
      diagnosis: "Annual Health Checkup",
      treatment: "Routine examination, Blood tests",
      prescriptions: ["Vitamin D3 - 1000 IU daily", "Multivitamin - Once daily"],
      status: "Completed",
      followUp: "2025-07-15",
      type: "Preventive Care"
    },
    {
      id: "REC002", 
      date: "2024-12-10",
      doctor: "Dr. Rajesh Kumar",
      hospital: "Government General Hospital",
      diagnosis: "Common Cold, Mild Fever",
      treatment: "Rest, Hydration, Symptomatic treatment",
      prescriptions: ["Paracetamol 500mg - TDS", "Cough syrup - BDS"],
      status: "Completed",
      followUp: null,
      type: "Acute Care"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'ongoing': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'preventive care': return 'secondary';
      case 'acute care': return 'outline';
      case 'chronic care': return 'destructive';
      default: return 'outline';
    }
  };

  if (healthRecords.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-16 h-16 flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>No Health Records</CardTitle>
          <CardDescription>
            You don't have any medical records yet. Visit a healthcare provider to start building your health history.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Your medical records will appear here after your first doctor visit.
          </p>
          <Button variant="outline">
            Find Healthcare Providers
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Health Records Summary</span>
          </CardTitle>
          <CardDescription>
            Complete medical history for patient ID: {userId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{healthRecords.length}</div>
              <div className="text-sm text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {healthRecords.filter(r => r.followUp).length}
              </div>
              <div className="text-sm text-muted-foreground">Follow-ups Due</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {new Set(healthRecords.map(r => r.doctor)).size}
              </div>
              <div className="text-sm text-muted-foreground">Doctors Consulted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Medical Records</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        {healthRecords.map((record) => (
          <Card key={record.id} className="shadow-card hover:shadow-medical transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{record.date}</CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <Stethoscope className="h-3 w-3" />
                      <span>{record.doctor}</span>
                      <span>•</span>
                      <span>{record.hospital}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getTypeColor(record.type)}>{record.type}</Badge>
                  <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-primary">Diagnosis</h4>
                  <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-secondary">Treatment</h4>
                  <p className="text-sm text-muted-foreground">{record.treatment}</p>
                </div>
              </div>

              {record.prescriptions && record.prescriptions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-accent">Prescriptions</h4>
                  <div className="space-y-1">
                    {record.prescriptions.map((prescription, index) => (
                      <div key={index} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                        • {prescription}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {record.followUp && (
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-secondary">Follow-up Required</p>
                      <p className="text-xs text-muted-foreground">Scheduled for {record.followUp}</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Schedule
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-xs text-muted-foreground">
                  Record ID: {record.id}
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Information */}
      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Emergency Medical Information</span>
          </CardTitle>
          <CardDescription>
            Critical information for emergency situations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Blood Type</p>
              <p className="text-sm text-muted-foreground">Not specified</p>
            </div>
            <div>
              <p className="text-sm font-medium">Allergies</p>
              <p className="text-sm text-muted-foreground">None reported</p>
            </div>
            <div>
              <p className="text-sm font-medium">Chronic Conditions</p>
              <p className="text-sm text-muted-foreground">None reported</p>
            </div>
            <div>
              <p className="text-sm font-medium">Emergency Contact</p>
              <p className="text-sm text-muted-foreground">Update in profile</p>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <Button variant="outline" size="sm" className="w-full">
              Update Emergency Information
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};