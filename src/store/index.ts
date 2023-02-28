import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useContext } from "react";
import { context } from "@/store/AuthProvider";

export const useAuth = () => useContext(context);

export const useModalStore = create<ModalStore>()(
  devtools(
    (set) => ({
      loginModalIsOpen: false,
      setLoginModalIsOpen: (loginModalIsOpen: boolean) => set({ loginModalIsOpen }),
      registerModalIsOpen: false,
      setRegisterModalIsOpen: (registerModalIsOpen: boolean) => set({ registerModalIsOpen }),
    }),
    {
      name: "modal-storage",
    }
  )
);

export const useProcessStore = create<ProcessStore>()(
  devtools(
    (set) => ({
      uploading: false,
      processing: false,
      originalImage: null,
      processedImage: null,
      predictionId: null,
      reset: () =>
        set({
          originalImage: null,
          processedImage: null,
          uploading: false,
          processing: false,
          predictionId: null,
        }),
      setPredictionId: (predictionId: string | null) => set({ predictionId }),
      setProcessedImage: (processedImage: string | null) => set({ processedImage }),
      setOriginalImage: (originalImage: string | null) => set({ originalImage }),
      setUploading: (uploading: boolean) => set({ uploading }),
      setProcessing: (processing: boolean) => set({ processing }),
    }),
    {
      name: "process-storage",
    }
  )
);

interface ModalStore {
  loginModalIsOpen: boolean;
  setLoginModalIsOpen: (loginModalIsOpen: boolean) => void;
  registerModalIsOpen: boolean;
  setRegisterModalIsOpen: (registerModalIsOpen: boolean) => void;
}

interface ProcessStore {
  uploading: boolean;
  processing: boolean;
  originalImage: string | null;
  processedImage: string | null;
  predictionId: null | string;
  setPredictionId: (predictionId: string | null) => void;
  reset: () => void;
  setProcessedImage: (processedImage: string | null) => void;
  setOriginalImage: (originalImage: string | null) => void;
  setUploading: (uploading: boolean) => void;
  setProcessing: (processing: boolean) => void;
}
