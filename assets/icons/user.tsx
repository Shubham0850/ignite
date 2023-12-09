import * as React from "react";
import Svg, { G, Circle, Path, SvgProps } from "react-native-svg";
const User = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Circle cx={12} cy={6} r={4} stroke="#1C274C" strokeWidth={1.5} />
      <Path
        d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
        stroke="#1C274C"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </G>
  </Svg>
);
export default User;
