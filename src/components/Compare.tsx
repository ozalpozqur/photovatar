import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
export default function Compare({
  original,
  modified,
  className,
}: {
  original: string;
  modified: string;
  className?: string;
}) {
  return (
    <ReactCompareSlider
      itemOne={<ReactCompareSliderImage src={original} alt="original photo" />}
      itemTwo={<ReactCompareSliderImage src={modified} alt="modified photo" />}
      className={className}
    />
  );
}
