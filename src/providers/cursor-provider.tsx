"use client";

import { createContext, useContext, useState } from "react";

type CursorState = {
  active: boolean;
  type: "default" | "media" | "text";
  data: string;
};

type CursorContextType = {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({ active: false, type: "default", data: "" });
  
  const resetCursor = () => setCursorState({ active: false, type: "default", data: "" });

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within a CursorProvider");
  return context;
}
