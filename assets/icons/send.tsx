import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Send = (props: SvgProps) => (
  <Svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    id="send"
    data-name="Flat Color"
    className="icon flat-color"
    {...props}
  >
    <Path
      id="primary"
      d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13l.45-1-.45-1L3.18,5.87A2,2,0,0,1,5.87,3.25l14.65,6.94A2,2,0,0,1,21.66,12Z"
      style={{
        fill: "rgb(0, 0, 0)",
      }}
    />
    <Path
      id="secondary"
      d="M12,12a1,1,0,0,1-1,1H5.46l.45-1-.45-1H11A1,1,0,0,1,12,12Z"
      style={{
        fill: "rgb(44, 169, 188)",
      }}
    />
  </Svg>
);
export default Send;
