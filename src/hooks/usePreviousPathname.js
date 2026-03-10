import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousPathname() {
  const location = useLocation();

  // guarda o último pathname "real" (sem query)
  const previousPathnameRef = useRef(null);
  const currentPathnameRef = useRef(location.pathname);

  useEffect(() => {
    // só considera mudança de página se mudou o pathname
    if (location.pathname !== currentPathnameRef.current) {
      previousPathnameRef.current = currentPathnameRef.current;
      currentPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  return previousPathnameRef.current;
}