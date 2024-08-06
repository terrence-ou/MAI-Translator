import { ComponentProps } from "react";

const HistoryContent = ({ ...props }: ComponentProps<"div">) => {
  return <div {...props}>Here is the history content</div>;
};

export default HistoryContent;
