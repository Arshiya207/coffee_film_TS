// asset imports
import loadingImage from "../assets/loading_noBg.png";

// type imports
import type { JSX } from "react";

export default function LoadingSm(): JSX.Element {
  return (
    <div className="loading-small">
      <img src={loadingImage} alt="loading" />
    </div>
  );
}
