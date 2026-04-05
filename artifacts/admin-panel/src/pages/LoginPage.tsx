import { useState } from "react";
import { Shield, Eye, EyeOff, Loader2, KeyRound, AlertCircle } from "lucide-react";

interface Props {
  onLogin: (key: string) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) { setError("Please enter the admin access key."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      const data = await res.json() as { valid: boolean };
      if (data.valid) {
        onLogin(key.trim());
      } else {
        setError("Invalid access key. Please check and try again.");
      }
    } catch {
      setError("Unable to reach server. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/15 rounded-2xl border border-purple-500/30 mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            PlaceX <span className="text-purple-400">Admin</span>
          </h1>
          <p className="text-muted-foreground text-sm">Restricted access — authorized personnel only</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <KeyRound className="h-4 w-4 inline mr-2 text-purple-400" />
                Admin Access Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={key}
                  onChange={e => { setKey(e.target.value); setError(""); }}
                  placeholder="PLACEX-ADMIN-XXXXXXXXXX"
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !key.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</>
              ) : (
                <><Shield className="h-4 w-4" /> Enter Admin Panel</>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 space-y-1">
            <p className="font-semibold flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" /> Security Notice
            </p>
            <p>This panel is for authorized PlaceX administrators only. All actions are logged and monitored.</p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          PlaceX Admin Panel • Restricted Access
        </p>
      </div>
    </div>
  );
}
