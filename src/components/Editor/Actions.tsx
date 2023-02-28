import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { BiDownload, BiReset, BiSave } from "react-icons/bi";
import useLocaleStore from "@/components/Editor/useLocaleStore";
import { cn } from "@/helpers";
import { AnimationControls } from "framer-motion";
import { useRef } from "react";

export default function Actions({
  saveToStorage,
  download,
  bgAnimate,
}: {
  download: () => void;
  bgAnimate: AnimationControls;
  saveToStorage: () => void;
}) {
  const saveBtn = useRef<HTMLElement>(null);
  const { loading, reset } = useLocaleStore();
  function resetHandler() {
    bgAnimate.set({ x: 0, y: 0, z: 0 });
    reset();
  }
  const saveHandler = () => {
    saveBtn.current?.blur();
    saveToStorage();
  };

  return (
    <div className="border-b gap-0.5 flex w-full p-2 flex items-center">
      <Tooltip placement="bottom">
        <TooltipTrigger onClick={download} icon className="text-slate-700">
          <BiDownload size={22} />
        </TooltipTrigger>
        <TooltipContent>Download the picture</TooltipContent>
      </Tooltip>
      <Tooltip placement="bottom">
        <TooltipTrigger onClick={resetHandler} icon className="text-slate-700">
          <BiReset size={22} />
        </TooltipTrigger>
        <TooltipContent>Reset the picture</TooltipContent>
      </Tooltip>
      <Tooltip placement="bottom">
        <TooltipTrigger
          ref={saveBtn}
          onClick={saveHandler}
          icon
          className={cn("text-slate-700", loading && "loading")}
          disabled={loading}
        >
          <BiSave size={22} />
        </TooltipTrigger>
        <TooltipContent>Save to storage</TooltipContent>
      </Tooltip>
    </div>
  );
}
