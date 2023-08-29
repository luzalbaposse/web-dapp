import { BASE_PAGES } from "../base-pages";

export const useMobileHeader = (initialPage = "profile") => {
  const [currentPage, setCurrentPage] = useState(() => BASE_PAGES[initialPage]);
  const goToPage = page;
  return {};
};
