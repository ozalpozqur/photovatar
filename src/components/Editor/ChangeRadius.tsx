import { cn } from "@/helpers";
import useLocaleStore from "@/components/Editor/useLocaleStore";
export default function ChangeRadius() {
  const { setRound, round } = useLocaleStore();
  const options = [
    {
      value: "0",
      icon: <RadiusOne className="w-[20px]" />,
    },
    {
      value: "1",
      icon: <RadiusTwo className="w-[20px]" />,
    },
    {
      value: "2",
      icon: <RadiusThree className="w-[20px]" />,
    },
  ];
  return (
    <div className="flex items-center justify-center flex-col">
      <h2 className="text-lg font-bold text-center mb-2">Choose border radius</h2>
      <div className="flex justify-center gap-2">
        {options.map((item) => (
          <label
            key={item.value}
            className={cn(
              "bg-gray-700 ring-offset-2 ring-indigo-600 hover:bg-gray-900 cursor-pointer rounded-full text-white aspect-square w-10 h-10 flex items-center justify-center p-2",
              round === item.value && "ring-2"
            )}
          >
            <input
              type="radio"
              value={item.value}
              name="rounds"
              onChange={(e) => setRound(e.target.value)}
              className="hidden"
            />
            {item.icon}
          </label>
        ))}
      </div>
    </div>
  );
}

const RadiusOne = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 54V14C4 8.47715 8.47715 4 14 4H54"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const RadiusTwo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 54V29C4 15.1929 15.1929 4 29 4H54"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const RadiusThree = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 54V54C4 26.3858 26.3858 4 54 4V4"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
};
