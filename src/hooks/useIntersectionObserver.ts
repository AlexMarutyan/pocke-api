import { useRef, useEffect, LegacyRef } from "react";

const useIntersectionObserver = (
  intersectionHandler: (isInView: boolean) => void,
  options = {}
) => {
  const trackingRef = useRef<any>();

  useEffect(() => {
    const observable = trackingRef?.current;
    const observer = new IntersectionObserver(([entry]) => {
      intersectionHandler(entry.isIntersecting);
    }, options);

    if (observable) {
      observer.observe(observable);
    }

    return () => {
      if (observable) {
        observer.unobserve(observable!);
      }
    };
  }, [options, intersectionHandler]);

  return trackingRef;
};

export default useIntersectionObserver;
