import Dropzone from "react-dropzone";
import type { Prediction } from "@/types";
import { cn, http } from "@/helpers";
import Loading from "@/components/Loading";
import { useAuth, useModalStore, useProcessStore } from "@/store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { FcInfo } from "react-icons/fc";

async function getGeneratedImage(id: string, originalImage: string) {
  try {
    const response = await http.post<{ prediction: Prediction }>("/api/get-processed-image", {
      id,
      originalImage,
    });
    return {
      prediction: response.prediction,
      error: null,
    };
  } catch ({ status, data }) {
    console.log(status, data);
    return {
      prediction: null,
      error: "Something went wrong. Please try again later.",
    };
  }
}
async function restore(file_url: string) {
  return http.post<Prediction>("/api/magic-wand", {
    file_url,
  });
}

export default function MyDropzone({ className }: { className?: string }) {
  const {
    uploading,
    setUploading,
    setProcessing,
    setOriginalImage,
    setProcessedImage,
    setPredictionId,
  } = useProcessStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [beautyMode, setBeautyMode] = useState(false);
  const { user, setUser } = useAuth();
  const { setLoginModalIsOpen } = useModalStore();
  const router = useRouter();

  async function onDrop([acceptedFiles]: File[]) {
    if (acceptedFiles.length === 0) return;
    if (!user) {
      toast.warning("Please log in to your account to continue processing.", {
        position: "top-left",
      });
      return setLoginModalIsOpen(true);
    }
    if (user.credit === 0) return setModalOpen(true);

    setUploading(true);
    let { path } = await upload(acceptedFiles);
    let original = path;

    if (beautyMode) {
      const { output: restored } = await restore(path);
      path = restored;
    }
    let { errors, predictionId } = await startProcess(path);
    setPredictionId(predictionId);

    if (errors) {
      toast.error(errors);
      setUploading(false);
      return;
    }

    setOriginalImage(original);
    router.push({
      pathname: "/processed/" + predictionId,
      query: {
        status: "waiting",
      },
    });
    setUploading(false);
    setProcessing(true);

    const { prediction, error } = await getGeneratedImage(predictionId, original);

    if (error || !prediction) {
      toast.error(error || "Something went wrong. Please try again later.");
      setProcessing(false);
      return;
    }

    setUser({ ...user, credit: user.credit - (beautyMode ? 2 : 1) });
    setProcessedImage(prediction?.output);
    setProcessing(false);
  }
  async function startProcess(image: string) {
    return http.post<{
      prediction: Prediction;
      errors: string;
      originalImage: string;
      predictionId: string;
    }>("/api/start-process", { image });
  }
  async function upload(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    return http.post<{ path: string }>("/api/upload-image", formData);
  }

  return (
    <>
      <Dropzone
        accept={{ "image/jpeg": [], "image/png": [], "image/jpg": [] }}
        onDropAccepted={onDrop}
        onDropRejected={(e) => toast.error(e[0].errors[0].message)}
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className={cn(
              "group px-2 py-10 lg:p-10 rounded-md max-w-full border-2 border-dashed transition hover:bg-gray-50 cursor-pointer flex flex-col items-center justify-center",
              isDragActive ? "border-indigo-700" : "border-gray-300",
              className
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="flex justify-center items-center flex-col gap-4">
              {uploading ? (
                <Loading />
              ) : (
                <>
                  <div
                    className="flex flex-col gap-1 items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1">
                      <Tooltip placement="bottom">
                        <TooltipTrigger>
                          <FcInfo />
                        </TooltipTrigger>
                        <TooltipContent className="w-fit text-left">
                          <p>This mode will make the image look more clear.</p>
                          <p className="text-yellow-200 text-center">
                            Note: It will take longer to process.
                          </p>
                          <p className="text-yellow-200 text-center">
                            Note: This feature will take double credits.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <label htmlFor="beauty-mode" className="text-gray-500 text-xs">
                        Restoration Mode:{" "}
                        <span className="text-gray-700 font-medium">
                          {beautyMode ? "on" : "off"}
                        </span>
                      </label>
                    </div>
                    <input
                      id="beauty-mode"
                      type="checkbox"
                      className="toggle toggle-sm toggle-success"
                      onChange={(e) => setBeautyMode(e.target.checked)}
                      checked={beautyMode}
                    />
                  </div>
                  <Button rounded="full">Upload an image to get started</Button>
                  <p className="text-gray-500 group-hover:text-gray-700">
                    Or drag and drop an image
                  </p>
                  <p className="text-gray-500 text-xs">
                    Supported formats <strong>.jpg, .jpeg, .png</strong>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </Dropzone>
      <Modal isOpen={modalOpen} close={() => setModalOpen(false)}>
        <h3 className="text-4xl text-center text-indigo-700 font-bold">Oops!</h3>
        <p className="text-lg text-center">You don't have enough credit for this action.</p>{" "}
        <p className="text-lg text-center">
          <br /> If you want to continue, Visit the our{" "}
          <Link href="/plans" className="text-indigo-700">
            pricing page
          </Link>{" "}
          to purchase more credit.
        </p>
      </Modal>
    </>
  );
}
