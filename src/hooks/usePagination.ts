import { useEffect, useState } from "react";

const usePagination = (perPage: number) => {
  const [pagination, setPagination] = useState({
    limit: perPage,
    offset: 0,
  });

  useEffect(() => {
    setPagination({
      limit: perPage,
      offset: 0,
    });
  }, [perPage]);

  return { pagination, setPagination };
};

export default usePagination;
