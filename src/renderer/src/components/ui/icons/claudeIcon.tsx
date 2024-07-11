import IconWrapper from "./IconWrapper";
import { ComponentProps } from "react";

const ClaudeIcon = ({ width = 20, height = 20, ...props }: ComponentProps<"svg">) => {
  return (
    <IconWrapper width={width} height={height} viewBox="0 0 512 512" {...props}>
      <path d="M318.663 149.787h-43.368l78.952 212.423 43.368.004-78.952-212.427zm-125.326 0l-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427h-45.317zm-4.251 128.341l26.91-74.701 27.083 74.701h-53.993z" />
    </IconWrapper>
  );
};

export default ClaudeIcon;
