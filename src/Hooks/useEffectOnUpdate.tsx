// react imports
import { useRef, useEffect } from "react";


export default function useEffectOnUpdate<T>(callBackFunction:()=>void, dependencies:T[]):void {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      callBackFunction();
    } else {
      firstRender.current = false;
    }
  }, dependencies);
}
