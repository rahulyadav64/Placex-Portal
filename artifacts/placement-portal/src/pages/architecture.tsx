import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Cloud, Shield, Cpu, Activity } from "lucide-react";

export default function Architecture() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">System Architecture</h1>
        <p className="text-xl text-muted-foreground">A robust, scalable, and secure microservices-based infrastructure.</p>
      </div>

      {/* Architecture Diagram Visualization */}
      <div className="mb-20">
        <Card className="glass-card border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-2xl text-center">High-Level Architecture Diagram</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-8">
              
              {/* Clients Layer */}
              <div className="w-full max-w-3xl border-2 border-dashed border-blue-500/30 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-6 bg-background px-2 text-sm font-semibold text-blue-500">Client Layer</div>
                <div className="flex justify-center gap-8">
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 w-32 text-center shadow-sm">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium">Student Web App</span>
                  </div>
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 w-32 text-center shadow-sm">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium">Employer Portal</span>
                  </div>
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30 w-32 text-center shadow-sm">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <span className="text-sm font-medium">Admin Dashboard</span>
                  </div>
                </div>
              </div>

              <div className="h-8 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs">HTTPS / REST / JSON</div>
              </div>

              {/* API Gateway / Load Balancer */}
              <div className="w-full max-w-2xl bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 text-center shadow-sm">
                <Cloud className="h-6 w-6 mx-auto mb-1 text-purple-500" />
                <span className="font-semibold text-purple-500">API Gateway & Load Balancer (Nginx / AWS ALB)</span>
              </div>

              <div className="flex gap-16 w-full max-w-2xl justify-center">
                <div className="h-8 w-px bg-gradient-to-b from-purple-500/50 to-indigo-500/50" />
                <div className="h-8 w-px bg-gradient-to-b from-purple-500/50 to-indigo-500/50" />
                <div className="h-8 w-px bg-gradient-to-b from-purple-500/50 to-indigo-500/50" />
              </div>

              {/* Services Layer */}
              <div className="w-full max-w-4xl border-2 border-dashed border-indigo-500/30 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-6 bg-background px-2 text-sm font-semibold text-indigo-500">Microservices Layer</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 text-center shadow-sm hover:bg-indigo-500/20 transition-colors">
                    <Server className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                    <span className="text-sm font-medium">Auth Service</span>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 text-center shadow-sm hover:bg-indigo-500/20 transition-colors">
                    <Server className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                    <span className="text-sm font-medium">Profile Service</span>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 text-center shadow-sm hover:bg-indigo-500/20 transition-colors">
                    <Server className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                    <span className="text-sm font-medium">Job Engine</span>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 text-center shadow-sm hover:bg-indigo-500/20 transition-colors">
                    <Cpu className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
                    <span className="text-sm font-medium">AI Matcher</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-16 w-full max-w-2xl justify-center">
                <div className="h-8 w-px bg-gradient-to-b from-indigo-500/50 to-teal-500/50" />
                <div className="h-8 w-px bg-gradient-to-b from-indigo-500/50 to-teal-500/50" />
              </div>

              {/* Data Layer */}
              <div className="w-full max-w-3xl border-2 border-dashed border-teal-500/30 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-6 bg-background px-2 text-sm font-semibold text-teal-500">Data Layer</div>
                <div className="flex justify-center gap-8">
                  <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30 w-40 text-center shadow-sm">
                    <Database className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                    <span className="text-sm font-medium">Primary DB (MySQL)</span>
                  </div>
                  <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30 w-40 text-center shadow-sm">
                    <Database className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                    <span className="text-sm font-medium">Cache (Redis)</span>
                  </div>
                  <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/30 w-40 text-center shadow-sm">
                    <Cloud className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                    <span className="text-sm font-medium">Storage (S3)</span>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-6 w-6 text-primary" />
              Cloud Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>Deployed on AWS to ensure high availability and scalability during peak placement seasons.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>EC2 Instances:</strong> Compute power for microservices</li>
              <li><strong>RDS (MySQL):</strong> Managed relational database for transactional data</li>
              <li><strong>S3:</strong> Secure storage for student resumes and company assets</li>
              <li><strong>CloudFront:</strong> Application load balancing</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>Data privacy and security are foundational to the platform's design.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Encryption:</strong> AES-256 for data at rest, TLS 1.3 for data in transit</li>
              <li><strong>Authentication:</strong> JWT-based stateless authentication</li>
              <li><strong>Authorization:</strong> Role-Based Access Control (RBAC)</li>
              <li><strong>Compliance:</strong> Designed with GDPR and India's DPDP Act principles in mind</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
