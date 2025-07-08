// component imports
import LoadingSm from "../Components/LoadingSm";
import LoadingLg from "../Components/LoadingLg";

// type imports
import { type JSX, type PropsWithChildren } from "react";

type LoadingTypeProps = PropsWithChildren & {
  isLoading: boolean;
  type?: "small" | "large";
};


export default function Loading({
  children,
  isLoading,
  type = "small",
}: LoadingTypeProps): JSX.Element {
  const loadingType = {
    small: <LoadingSm />,
    large: <LoadingLg />,
  };

  return (
    <>
      {children}
      {isLoading && loadingType[type]}
    </>
  );
}
