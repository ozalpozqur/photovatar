import { toPng, toBlob } from "html-to-image";
import { useCallback, useEffect, useRef } from "react";
import { cn, http } from "@/helpers";
import { toast } from "react-toastify";
import { motion, useAnimationControls } from "framer-motion";
import Tools from "@/components/Editor/Tools";
import Actions from "@/components/Editor/Actions";
import useLocaleStore from "@/components/Editor/useLocaleStore";
import type { PredictionWithAvatar } from "@/types";

const rounds: { [key: string]: string } = {
  "0": "rounded-[10px]",
  "1": "rounded-[25px]",
  "2": "rounded-full",
};

export default function Editor({
  prediction,
  className,
}: {
  className?: string;
  prediction: PredictionWithAvatar;
}) {
  const {
    color,
    setColor,
    borderColor,
    round,
    percent,
    pattern,
    setPattern,
    thickness,
    setLoading,
    loading,
    reset,
  } = useLocaleStore();

  const ref = useRef<HTMLDivElement>(null);
  const bgAnimate = useAnimationControls();

  useEffect(() => {
    return () => reset();
  }, []);

  useEffect(() => {
    if (color) setPattern(null);
  }, [color]);

  useEffect(() => {
    if (pattern) setColor(undefined);
  }, [pattern]);

  const saveToStorage = useCallback(async () => {
    if (ref.current === null || loading) return;
    toast.dismiss();
    try {
      setLoading(true);
      const blob = await toBlob(ref.current, { cacheBust: true });
      if (!blob) return;
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("id", prediction.avatar._id);
      await http.post<{ publicPath: string }>("/api/save-to-storage", formData);
      toast.success("Your avatar saved to storage", { position: "top-left" });
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  }, [ref]);

  const download = useCallback(() => {
    if (ref.current === null) return;
    toast.dismiss();
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong, please try again later");
      });
  }, [ref]);

  return (
    <div
      className={cn(
        "my-5 border rounded-md grid sm:grid-cols-[1fr_300px] h-full pb-header sm:pb-0",
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Actions bgAnimate={bgAnimate} saveToStorage={saveToStorage} download={download} />
        <section
          className={cn("group overflow-hidden w-64", rounds[round])}
          style={{ border: `${thickness}px solid ${borderColor}` }}
          ref={ref}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={bgAnimate}
                dragMomentum={false}
                whileDrag={{ opacity: 0.6 }}
                whileHover={{ opacity: 0.8 }}
                drag
                style={{
                  ...(color && { backgroundColor: color }),
                  width: `${percent}%`,
                  height: `${percent}%`,
                }}
                className={cn(
                  "w-full h-full aspect-square z-[1] !cursor-move group-hover:z-[2]",
                  pattern && pattern,
                  rounds[round]
                )}
              />
            </div>
            <img
              draggable={false}
              className={cn(
                "w-full aspect-square object-cover z-[2] group-hover:z-[1] relative",
                rounds[round]
              )}
              src={prediction.output}
              alt="processedImage"
            />
          </div>
        </section>
        <div className="bg-blue-500 px-2 py-1 text-center text-xs rounded-md text-white">
          <strong>Tip:</strong> You can drag the image to change <br />
          the position of the background
        </div>
      </div>
      <Tools />
    </div>
  );
}
