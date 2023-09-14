import { useCallback, useState } from "react";
import { BASE_PAGES } from "./base-pages";

export const useCustomNavigation = (initialPage = "profile") => {
  const [page, setPage] = useState(() => BASE_PAGES[initialPage]);
  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false);
  const openHamburguer = useCallback(
    event => {
      if (isHamburguerOpen) return;
      setIsHamburguerOpen(true);
      event.stopPropagation();
      event.preventDefault();
    },
    [setIsHamburguerOpen, isHamburguerOpen]
  );
  const goToPage = useCallback(
    page => {
      setPage(BASE_PAGES[page]);
      window.history.pushState({}, "", `?tab=${BASE_PAGES[page]}`);
      setIsHamburguerOpen(false);
    },
    [setIsHamburguerOpen]
  );
  return {
    page,
    goToPage,
    openHamburguer,
    isHamburguerOpen
  };
};
