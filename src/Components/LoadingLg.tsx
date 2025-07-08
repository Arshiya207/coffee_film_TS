// asset imports
import loadingImage from "../assets/loading_noBg.png";

// type imports
import type { JSX } from "react";

export default function LoadingLg(): JSX.Element {
  return (
    <div className="loading-large">
      <img src={loadingImage} alt="loading" />
    </div>
  );
}
