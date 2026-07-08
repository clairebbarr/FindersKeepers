"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type EditModeContextValue = {
  isAdmin: boolean;
  editMode: boolean;
  toggleEditMode: () => void;
  /** When on (and edit mode is on), clicking a taggable element opens the
   *  colour editor instead of editing its text. */
  styleMode: boolean;
  toggleStyleMode: () => void;
};

const EditModeContext = createContext<EditModeContextValue>({
  isAdmin: false,
  editMode: false,
  toggleEditMode: () => {},
  styleMode: false,
  toggleStyleMode: () => {},
});

export function EditModeProvider({ isAdmin, children }: { isAdmin: boolean; children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [styleMode, setStyleMode] = useState(false);

  return (
    <EditModeContext.Provider
      value={{
        isAdmin,
        editMode: isAdmin && editMode,
        toggleEditMode: () => setEditMode((v) => !v),
        styleMode: isAdmin && editMode && styleMode,
        toggleStyleMode: () => setStyleMode((v) => !v),
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

/** isAdmin: user has admin/owner role. editMode: isAdmin AND edit mode is on.
 *  styleMode: isAdmin AND edit mode AND colour-editing sub-mode is on. */
export function useEditMode() {
  return useContext(EditModeContext);
}
