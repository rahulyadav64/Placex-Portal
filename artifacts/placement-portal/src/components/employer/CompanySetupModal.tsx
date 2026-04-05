import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, AlertCircle, Clock, X, ShieldCheck, ShieldAlert,
  Loader2, Building2, HelpCircle
} from "lucide-react";
import type { CompanyProfile, VerificationResult } from "@/lib/employer-profile";
import { validateCIN, validateGSTIN } from "@/lib/employer-profile";

const INDUSTRIES = [
  "Information Technology", "Banking & Finance", "E-Commerce", "EdTech",
  "HealthTech", "Fintech", "Manufacturing", "Automobile", "Consulting",
  "Media & Entertainment", "Retail", "Logistics", "Telecom", "Government",
  "Defence & Aerospace", "Agriculture", "Real Estate", "Legal", "Other",
];

const COMPANY_SIZES = [
  "1–10 employees", "11–50 employees", "51–200 employees",
  "201–500 employees", "501–1000 employees", "1001–5000 employees",
  "5001–10000 employees", "10000+ employees",
];

const INDIA_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Mizoram", "Odisha", "Punjab",
  "Rajasthan", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

const TABS = ["Company Info", "Verification", "HR Contact"] as const;
type Tab = typeof TABS[number];

interface Props {
  open: boolean;
  onClose: () => void;
  company: CompanyProfile;
  onSave: (company: Partial<CompanyProfile>) => void;
  onVerify: (name: string, cin: string, gstin: string) => Promise<VerificationResult>;
  verifying: boolean;
  verificationResult: VerificationResult | null;
}

export default function CompanySetupModal({ open, onClose, company, onSave, onVerify, verifying, verificationResult }: Props) {
  const [draft, setDraft] = useState<CompanyProfile>({ ...company });
  const [activeTab, setActiveTab] = useState<Tab>("Company Info");
  const [saved, setSaved] = useState(false);
  const [cinError, setCinError] = useState("");
  const [gstinError, setGstinError] = useState("");

  const set = (key: keyof CompanyProfile, value: unknown) =>
    setDraft(prev => ({ ...prev, [key]: value }));

  const handleVerify = async () => {
    setCinError("");
    setGstinError("");
    const cinCheck = validateCIN(draft.cin);
    if (!cinCheck.valid) { setCinError(cinCheck.reason || "Invalid CIN"); return; }
    if (draft.gstin && !validateGSTIN(draft.gstin)) { setGstinError("Invalid GSTIN format"); return; }
    await onVerify(draft.name, draft.cin, draft.gstin);
  };

  const handleSave = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  const statusInfo = verificationResult || {
    status: draft.verificationStatus,
    note: draft.verificationNote,
  };

  const statusBadge = {
    verified: { icon: CheckCircle2, color: "text-green-600 bg-green-50 border-green-200", label: "Verified" },
    pending:  { icon: Clock,        color: "text-amber-600 bg-amber-50 border-amber-200",  label: "Pending Review" },
    unverified: { icon: ShieldAlert, color: "text-red-500 bg-red-50 border-red-200",       label: "Unverified" },
    rejected: { icon: X,            color: "text-red-600 bg-red-50 border-red-200",        label: "Rejected" },
  }[statusInfo.status || "unverified"];

  const StatusIcon = statusBadge.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-0 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Company Profile</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Complete your company profile to post verified jobs</p>
            </div>
          </div>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-border px-6 mt-4 gap-1 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {tab === "Verification" && (
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full border ${statusBadge.color}`}>
                  {statusBadge.label}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">

          {/* Company Info */}
          {activeTab === "Company Info" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Company Name *</Label>
                <Input placeholder="e.g. TechNova Solutions Pvt Ltd" value={draft.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Industry *</Label>
                  <Select value={draft.industry} onValueChange={v => set("industry", v)}>
                    <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                    <SelectContent>{INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Company Size</Label>
                  <Select value={draft.size} onValueChange={v => set("size", v)}>
                    <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>{COMPANY_SIZES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>City *</Label>
                  <Input placeholder="e.g. Bangalore" value={draft.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>State</Label>
                  <Select value={draft.state} onValueChange={v => set("state", v)}>
                    <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                    <SelectContent>{INDIA_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Website</Label>
                <Input placeholder="https://yourcompany.com" value={draft.website} onChange={e => set("website", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Company Description *</Label>
                <Textarea
                  className="min-h-[90px]"
                  placeholder="Briefly describe what your company does, your culture, and what makes you a great employer..."
                  value={draft.description}
                  onChange={e => set("description", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Verification */}
          {activeTab === "Verification" && (
            <div className="space-y-5">
              {/* Status Banner */}
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${statusBadge.color}`}>
                <StatusIcon className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{statusBadge.label}</p>
                  {statusInfo.note && <p className="text-xs mt-0.5 opacity-80">{statusInfo.note}</p>}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                  <div className="text-xs text-blue-800 space-y-1">
                    <p className="font-semibold">How verification works</p>
                    <p>Enter your company's CIN (Corporate Identity Number) registered with the Ministry of Corporate Affairs (MCA), India. We validate the format and cross-check against our database of registered Indian companies.</p>
                    <p className="mt-1"><span className="font-semibold">Verified companies</span> get a blue checkmark on all job postings. Verification is <span className="font-semibold">instant</span> for any CIN registered with MCA India.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1">
                    CIN (Corporate Identity Number) *
                    <span className="text-xs text-muted-foreground font-normal">— from MCA portal</span>
                  </Label>
                  <Input
                    placeholder="e.g. U74899DL2000PTC123456"
                    value={draft.cin}
                    onChange={e => { set("cin", e.target.value.toUpperCase()); setCinError(""); }}
                    className={cinError ? "border-red-400" : ""}
                  />
                  {cinError && <p className="text-xs text-red-500">{cinError}</p>}
                  <p className="text-xs text-muted-foreground">Format: L/U + 5-digit NIC code + State + Year + Entity Type + 6-digit serial</p>
                </div>

                <div className="space-y-1.5">
                  <Label>GSTIN (GST Identification Number)</Label>
                  <Input
                    placeholder="e.g. 27AAPFU0939F1ZV"
                    value={draft.gstin}
                    onChange={e => { set("gstin", e.target.value.toUpperCase()); setGstinError(""); }}
                    className={gstinError ? "border-red-400" : ""}
                  />
                  {gstinError && <p className="text-xs text-red-500">{gstinError}</p>}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={verifying || !draft.name || !draft.cin}
                  className="w-full gap-2"
                  variant={statusInfo.status === "verified" ? "outline" : "default"}
                >
                  {verifying ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Verifying with MCA India...</>
                  ) : statusInfo.status === "verified" ? (
                    <><CheckCircle2 className="h-4 w-4 text-green-600" /> Verified — Re-check</>
                  ) : (
                    <><ShieldCheck className="h-4 w-4" /> Verify Company Registration</>
                  )}
                </Button>

                {verificationResult && (
                  <div className={`p-4 rounded-xl border text-sm space-y-1 ${
                    verificationResult.status === "verified" ? "bg-green-50 border-green-200" :
                    verificationResult.status === "pending" ? "bg-amber-50 border-amber-200" :
                    "bg-red-50 border-red-200"
                  }`}>
                    <div className="flex items-center gap-2 font-semibold">
                      {verificationResult.status === "verified" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {verificationResult.status === "pending" && <Clock className="h-4 w-4 text-amber-600" />}
                      {verificationResult.status === "unverified" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      {verificationResult.status === "verified" ? "Company Verified" :
                       verificationResult.status === "pending" ? "Pending Manual Review" : "Verification Failed"}
                    </div>
                    <p className="text-xs opacity-80">{verificationResult.note}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HR Contact */}
          {activeTab === "HR Contact" && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-muted/50 text-xs text-muted-foreground">
                HR contact details will be shared with shortlisted candidates only.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <Label>HR / Recruiter Full Name *</Label>
                  <Input placeholder="e.g. Anita Verma" value={draft.hrName} onChange={e => set("hrName", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Official Email *</Label>
                  <Input type="email" placeholder="hr@company.com" value={draft.hrEmail} onChange={e => set("hrEmail", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" value={draft.hrPhone} onChange={e => set("hrPhone", e.target.value)} />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label>LinkedIn Company Page</Label>
                  <Input placeholder="https://linkedin.com/company/yourname" value={draft.linkedIn} onChange={e => set("linkedIn", e.target.value)} />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border shrink-0 gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="gap-2 min-w-[130px]">
            {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : "Save Company Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
