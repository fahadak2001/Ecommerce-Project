import { useEffect } from "react";

const useOneTimeRefresh = (pageIdentifier) => {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem(pageIdentifier);

    if (!hasRefreshed) {
      sessionStorage.setItem(pageIdentifier, "true");
      window.location.reload();
    }
  }, [pageIdentifier]);
};

export default useOneTimeRefresh;
