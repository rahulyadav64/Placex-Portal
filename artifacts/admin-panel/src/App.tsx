import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Comp, adminKey }: { component: React.ComponentType<{adminKey: string; onLogout: () => void}>; adminKey: string; onLogout: () => void }) {
  const [,navigate] = useLocation();
  useEffect(() => { if (!adminKey) navigate("/"); }, [adminKey, navigate]);
  if (!adminKey) return null;
  return <Comp adminKey={adminKey} onLogout={() => { sessionStorage.removeItem("placex_admin_key"); window.location.href = import.meta.env.BASE_URL; }} />;
}

function App() {
  const [adminKey, setAdminKey] = useState<string>(() => sessionStorage.getItem("placex_admin_key") || "");

  const handleLogin = (key: string) => {
    sessionStorage.setItem("placex_admin_key", key);
    setAdminKey(key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("placex_admin_key");
    setAdminKey("");
  };

  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Switch>
          <Route path="/">
            {adminKey
              ? <Dashboard adminKey={adminKey} onLogout={handleLogout} />
              : <LoginPage onLogin={handleLogin} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
