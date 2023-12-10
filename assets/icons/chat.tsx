import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ChatIcon = (props: SvgProps) => (
  <Svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    id="chat"
    data-name="Line Color"
    {...props}
  >
    <Path
      id="primary"
      d="M18.81,16.23,20,21l-4.95-2.48A9.84,9.84,0,0,1,12,19c-5,0-9-3.58-9-8s4-8,9-8,9,3.58,9,8A7.49,7.49,0,0,1,18.81,16.23Z"
      style={{
        fill: "none",
        stroke: "rgb(0, 0, 0)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </Svg>
);
export default ChatIcon;
