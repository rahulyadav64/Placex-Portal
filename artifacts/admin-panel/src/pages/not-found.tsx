import { Link } from "wouter";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Shield className="h-16 w-16 mx-auto mb-4 text-purple-400 opacity-50" />
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found.</p>
        <Link href="/">
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-medium transition-colors">
            Go to Admin Panel
          </button>
        </Link>
      </div>
    </div>
  );
}
