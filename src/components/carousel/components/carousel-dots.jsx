
// STYLED COMPONENTS
import { Dot, DotList } from "../styles";


// ==============================================================


// ==============================================================

export default function CarouselDots({
  dotColor,
  activeDotColor,
  sx
}) {
  return {
    appendDots: dots => <DotList sx={sx} activeDotColor={activeDotColor}>{dots}</DotList>,
    customPaging: () => <Dot dotColor={dotColor} />
  };
}