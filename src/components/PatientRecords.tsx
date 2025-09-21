import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, FileText, Plus, Calendar, Download, Upload } from "lucide-react";

interface PatientRecordsProps {
  selectedPatient: any;
  doctorId: string;
}

export const PatientRecords = ({ selectedPatient, doctorId }: PatientRecordsProps) => {
  const { toast } = useToast();
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    symptoms: "",
    treatment: "",
    prescriptions: "",
    notes: "",
    followUpDate: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!newRecord.diagnosis.trim()) {
        toast({
          title: "Missing Information",
          description: "Please enter a diagnosis",
          variant: "destructive"
        });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Record Added Successfully",
        description: "Medical record has been saved to patient's history",
        variant: "default"
      });

      // Reset form
      setNewRecord({
        diagnosis: "",
        symptoms: "",
        treatment: "",
        prescriptions: "",
        notes: "",
        followUpDate: ""
      });

    } catch (error) {
      toast({
        title: "Failed to Save Record",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPatient) {
    return (
      <Card className="shadow-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-16 h-16 flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>No Patient Selected</CardTitle>
          <CardDescription>
            Please scan a patient's QR code or search by ID to view their records
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Use the "Scan Patient" tab to find a patient and access their medical history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Info Header */}
      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-primary rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">{selectedPatient.name}</CardTitle>
                <CardDescription>
                  {selectedPatient.age} years • {selectedPatient.gender} • {selectedPatient.occupation}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline">
              ID: {selectedPatient.userId}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Origin State</Label>
              <p className="text-sm">{selectedPatient.originState}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Contact</Label>
              <p className="text-sm">{selectedPatient.contact}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Last Visit</Label>
              <p className="text-sm">{selectedPatient.lastVisit || "First visit"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Medical History</span>
          </TabsTrigger>
          <TabsTrigger value="add-record" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Record</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          {selectedPatient.medicalHistory && selectedPatient.medicalHistory.length > 0 ? (
            <div className="space-y-4">
              {selectedPatient.medicalHistory.map((record: any, index: number) => (
                <Card key={index} className="shadow-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{record.date}</span>
                      </CardTitle>
                      <Badge variant="secondary">{record.doctor}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Diagnosis</Label>
                      <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Treatment</Label>
                      <p className="text-sm text-muted-foreground">{record.treatment}</p>
                    </div>
                    {record.prescriptions && (
                      <div>
                        <Label className="text-sm font-medium">Prescriptions</Label>
                        <p className="text-sm text-muted-foreground">{record.prescriptions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Medical History</h3>
                <p className="text-muted-foreground">
                  This patient has no previous medical records. Add the first record using the "Add New Record" tab.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="add-record">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-secondary" />
                <span>Add New Medical Record</span>
              </CardTitle>
              <CardDescription>
                Record new diagnosis, treatment, and prescriptions for {selectedPatient.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddRecord} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis *</Label>
                    <Input
                      id="diagnosis"
                      placeholder="Primary diagnosis"
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followUpDate">Follow-up Date</Label>
                    <Input
                      id="followUpDate"
                      type="date"
                      value={newRecord.followUpDate}
                      onChange={(e) => setNewRecord({...newRecord, followUpDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Patient reported symptoms..."
                    value={newRecord.symptoms}
                    onChange={(e) => setNewRecord({...newRecord, symptoms: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment">Treatment & Procedures</Label>
                  <Textarea
                    id="treatment"
                    placeholder="Treatment provided, procedures performed..."
                    value={newRecord.treatment}
                    onChange={(e) => setNewRecord({...newRecord, treatment: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescriptions">Prescriptions</Label>
                  <Textarea
                    id="prescriptions"
                    placeholder="Medications prescribed with dosage..."
                    value={newRecord.prescriptions}
                    onChange={(e) => setNewRecord({...newRecord, prescriptions: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional observations or instructions..."
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  />
                </div>

                {/* File Upload Section */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">Attach Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload lab reports, X-rays, or other medical documents
                    </p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    className="flex-1" 
                    disabled={isSubmitting}
                    variant="secondary"
                  >
                    {isSubmitting ? "Saving Record..." : "Save Medical Record"}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setNewRecord({
                      diagnosis: "",
                      symptoms: "",
                      treatment: "",
                      prescriptions: "",
                      notes: "",
                      followUpDate: ""
                    })}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};