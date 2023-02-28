import { cn } from "@/helpers";
import { GooglePicker } from "@hello-pangea/color-picker";
import ChangeRadius from "@/components/Editor/ChangeRadius";
import useLocaleStore from "@/components/Editor/useLocaleStore";

const patterns = [
  "palette-1",
  "palette-2",
  "palette-3",
  "palette-4",
  "palette-5",
  "palette-6",
  "palette-7",
  "palette-8",
  "palette-9",
  "palette-10",
  "palette-11",
  "palette-12",
  "palette-13",
  "palette-14",
  "palette-15",
  "palette-16",
  "palette-17",
  "palette-18",
  "palette-19",
  "palette-20",
  "palette-21",
  "palette-22",
  "palette-23",
  "palette-24",
  "palette-25",
  "palette-26",
  "palette-27",
  "palette-28",
];

export default function Tools() {
  const {
    color,
    setColor,
    setBorderColor,
    setIsBorder,
    isBorder,
    borderColor,
    percent,
    setPercent,
    pattern,
    setPattern,
    setThickness,
    thickness,
  } = useLocaleStore();

  return (
    <div className="border-l h p-4 flex flex-col gap-2">
      <section>
        <h2 className="text-lg font-bold text-center mb-3">Choose pattern</h2>
        <div className="grid grid-cols-7 justify-center items-center gap-1">
          {patterns.map((item) => (
            <label
              key={item}
              className={cn(
                "flex items-center border p-0.5 rounded-lg cursor-pointer",
                item === pattern ? "border-indigo-700" : null
              )}
            >
              <input
                onChange={(e) => setPattern(e.target.value)}
                name="pattern"
                className="hidden"
                type="radio"
                value={item}
              />
              <span className={cn("block w-full rounded-md aspect-square", item)} />
            </label>
          ))}
        </div>
      </section>
      <section>
        <div>
          <h2 className="text-lg font-bold text-center mb-2">Choose color</h2>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center justify-center gap-2 mb-2">
            <label
              htmlFor="modeChanger"
              className={cn(
                "text-xs text-right cursor-pointer",
                !isBorder ? "text-black font-bold" : "text-gray-400 "
              )}
            >
              Background
            </label>
            <div className="form-control justify-center flex">
              <label className="swap swap-flip text-4xl">
                <input
                  id="modeChanger"
                  checked={isBorder}
                  onChange={(e) => setIsBorder(e.target.checked)}
                  type="checkbox"
                />
                <div className="swap-on">→</div>
                <div className="swap-off">←</div>
              </label>
            </div>
            <label
              htmlFor="modeChanger"
              className={cn(
                "text-xs cursor-pointer",
                isBorder ? "text-black font-bold" : "text-gray-400"
              )}
            >
              Border
            </label>
          </div>
          <div className="flex justify-center">
            <GooglePicker
              className="overflow-hidden !w-full !grid grid-rows-[auto_50px] !rounded-lg"
              color={isBorder ? borderColor : color}
              onChange={({ hex }) => (isBorder ? setBorderColor(hex) : setColor(hex))}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-lg font-bold text-center mb-2">Set background size</h2>
          <input
            className="w-full range range-primary range-xs"
            value={percent}
            onChange={(e) => setPercent(e.target.valueAsNumber)}
            type="range"
            min={50}
            max={120}
            step={1}
          />
          <span className="text-2xl tabular-nums text-center">{percent}</span>
        </div>
      </section>
      <section>
        <div className="flex items-center justify-center flex-col">
          <h2 className="text-lg font-bold text-center mb-2">Set border thickness</h2>
          <input
            className="w-full range range-info range-xs"
            value={thickness}
            onChange={(e) => setThickness(e.target.valueAsNumber)}
            type="range"
            min={0}
            max={50}
            step={1}
          />
          <span className="text-2xl tabular-nums text-center">{thickness}</span>
        </div>
      </section>
      <section>
        <ChangeRadius />
      </section>
    </div>
  );
}

export function MagicWand({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#magicWandSVGIcon)">
        <path
          d="M41.4156 13.4766L44.9516 3.05183L34.526 6.58704L25.7038 0.00299072L25.8445 11.0105L16.8568 17.3657L22.3687 19.0796L1.35684 40.0916C0.481874 40.9665 0 42.1298 0 43.3671C0 44.6045 0.481874 45.7677 1.35684 46.6426C2.26003 47.5458 3.44587 47.9973 4.63227 47.9971C5.8183 47.997 7.0048 47.5455 7.9078 46.6426L28.9217 25.6287L30.6369 31.1455L36.9926 22.1585L48.0001 22.299L41.4156 13.4766ZM5.72408 44.4589C5.12202 45.0608 4.14243 45.061 3.54046 44.459C3.24881 44.1673 3.08812 43.7795 3.08812 43.367C3.08812 42.9546 3.24881 42.5668 3.54046 42.2751L25.7002 20.1153L27.3688 20.6341L27.8857 22.2971L5.72408 44.4589ZM35.4086 19.05L31.7281 24.2541L29.8357 18.1674L23.7487 16.2747L28.9532 12.5946L28.8718 6.22057L33.9802 10.0331L40.017 7.98598L37.9695 14.0225L41.7823 19.1314L35.4086 19.05Z"
          fill="currentColor"
        />
        <path
          d="M27.4596 33.0191L25.276 35.2028L27.4596 37.3864L29.6432 35.2028L27.4596 33.0191Z"
          fill="currentColor"
        />
        <path
          d="M12.0187 18.6067L9.83508 20.7903L12.0187 22.974L14.2023 20.7903L12.0187 18.6067Z"
          fill="currentColor"
        />
        <path
          d="M17.9459 4.97636L15.7623 7.15997L17.9459 9.34358L20.1295 7.15997L17.9459 4.97636Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="magicWandSVGIcon">
          <rect width="48" height="48" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}
