"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type EditModeContextValue = {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
};

const EditModeContext = createContext<EditModeContextValue>({
  isAdmin: false,
  editMode: false,
  toggleEditMode: () => {},
});

export function EditModeProvider({ isAdmin, children }: { isAdmin: boolean; children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider
      value={{ isAdmin, editMode: isAdmin && editMode, toggleEditMode: () => setEditMode((v) => !v) }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

/** isAdmin: user has admin/owner role. editMode: isAdmin AND edit mode is switched on. */
export function useEditMode() {
  return useContext(EditModeContext);
}
