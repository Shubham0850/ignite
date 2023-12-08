import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
const Explore = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M9.73319 10.4608C9.82276 10.1025 10.1025 9.82273 10.4608 9.73315L13.9187 8.86869C14.651 8.68559 15.3144 9.34899 15.1313 10.0814L14.2669 13.5392C14.1773 13.8975 13.8975 14.1773 13.5393 14.2668L10.0814 15.1313C9.34902 15.3144 8.68562 14.651 8.86872 13.9186L9.73319 10.4608Z"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 3.5C5.5 3.5 3.5 5.5 3.5 12C3.5 18.5 5.5 20.5 12 20.5C18.5 20.5 20.5 18.5 20.5 12C20.5 5.5 18.5 3.5 12 3.5Z"
        stroke="#000000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default Explore;
