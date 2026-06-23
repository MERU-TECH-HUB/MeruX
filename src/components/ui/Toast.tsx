"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed right-4 top-4 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50, rotateX: 45, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="pointer-events-auto flex items-center gap-3 overflow-hidden rounded-xl border border-border/50 bg-card/60 p-4 shadow-2xl backdrop-blur-xl min-w-[300px]"
            >
              <div className="shrink-0">
                {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                {t.type === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                {t.type === "info" && <Info className="h-5 w-5 text-cyan-400" />}
              </div>
              <p className="flex-1 text-sm font-semibold text-foreground/90">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-foreground/10 hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Highlight bar */}
              <div 
                className={`absolute bottom-0 left-0 h-[2px] w-full ${
                  t.type === 'success' ? 'bg-emerald-400' : t.type === 'error' ? 'bg-destructive' : 'bg-cyan-400'
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
