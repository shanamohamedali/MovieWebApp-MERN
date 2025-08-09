import React, { useEffect, useState } from "react";
import { DEFAULT_DELAY } from "../constants/Constants";

export function useDebounce(incomingValue, delay=DEFAULT_DELAY,searchInput) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      incomingValue;
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

 
}
