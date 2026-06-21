import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const messages: Record<string, string> = {
  created: "Profile added.",
  updated: "Profile updated."
};

export function RouteToast() {
  const location = useLocation();
  const navigate = useNavigate();

  const message = useMemo(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("created")) return messages.created;
    if (params.get("updated")) return messages.updated;
    return "";
  }, [location.search]);

  useEffect(() => {
    if (!message) return;
    toast.success(message);
    const timer = window.setTimeout(() => {
      navigate(location.pathname, { replace: true });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [location.pathname, message, navigate]);

  return null;
}
