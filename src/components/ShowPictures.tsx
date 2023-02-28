import { useProcessStore } from "@/store";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "@/helpers";
import Compare from "@/components/Compare";
import Link from "next/link";

export default function ShowPictures({ outputImage }: { outputImage?: string }) {
  const { originalImage, processedImage, reset, setProcessedImage } = useProcessStore();
  const [compareMode, setCompareMode] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (outputImage) setProcessedImage(outputImage);
  }, [outputImage]);

  function download() {
    if (!processedImage || downloading) return;
    setDownloading(true);
    fetch(processedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "processed-image.png";
        link.click();
        URL.revokeObjectURL(url);
        setDownloading(false);
      });
  }

  function resetHandler() {
    reset();
    router.push("/profile");
  }
  function addNewBackground() {}

  function CompareSwitch() {
    return (
      <div className="flex items-center justify-center gap-2 mb-5">
        <p className={cn("text-lg", compareMode ? "text-gray-400" : "text-black")}>Side by side</p>
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              disabled={!originalImage || !processedImage}
              checked={compareMode}
              onChange={(e) => setCompareMode(e.target.checked)}
              type="checkbox"
              className="toggle toggle-primary"
            />
          </label>
        </div>
        <p className={cn("text-lg", !compareMode ? "text-gray-400" : "text-black")}>Compare</p>
      </div>
    );
  }

  return (
    <div>
      <CompareSwitch />
      <div className="flex flex-col gap-10 items-center">
        <div className="grid md:grid-cols-2 gap-10">
          {!compareMode ? (
            <SideBySide />
          ) : (
            <div className="col-span-2 py-5 md:py-10">
              <Compare
                className="rounded-2xl shadow h-[500px]"
                original={originalImage!}
                modified={processedImage!}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2">
          {processedImage && (
            <>
              <button
                className="border px-4 py-2 shadow rounded-lg bg-indigo-600 transition hover:bg-indigo-700 text-white"
                onClick={resetHandler}
              >
                Reset and try again
              </button>
              <Link
                href={`/change-background/${router.query.id}`}
                onClick={addNewBackground}
                className="border px-4 py-2 shadow rounded-lg bg-amber-600 transition hover:bg-amber-800 text-white"
              >
                Add new background
              </Link>
              <button
                disabled={downloading}
                onClick={download}
                className="border px-4 py-2 shadow rounded-lg bg-green-600 transition hover:bg-green-700 text-white"
              >
                {downloading ? "Downloading..." : "Download Image"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SideBySide() {
  const { originalImage, processedImage, processing } = useProcessStore();
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-2">Original Image</h2>
        <img
          loading="lazy"
          className="rounded-2xl w-full h-auto max-h-[90vh] shadow"
          src={originalImage!}
          alt="Original Image"
        />
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-2">Processed Image</h2>
        {processing ? (
          <div className="flex justify-center items-center h-full w-full">
            <Loading />
          </div>
        ) : (
          <img
            loading="lazy"
            className="rounded-2xl w-full h-auto max-h-[90vh] shadow"
            src={processedImage!}
            alt="Processed Image"
          />
        )}
      </div>
    </>
  );
}
