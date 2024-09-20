import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CustomPagination({
  totalCount ,
  page,
  onChange,
  pageSize = 10,
  ...rest
}) {

  const [pageCount, setPageCount] = React.useState(page);

  React.useEffect(() => {
    // Calculate the total number of pages based on page size and total count
    const calculatedPageCount = Math.ceil(totalCount / pageSize);
    setPageCount(calculatedPageCount || 1); // Ensure at least 1 page if totalCount or pageSize is 0 or undefined
  }, [pageSize, totalCount]);
  return (
    <Stack
      spacing={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Pagination
        count={pageCount}
        page={page}
        {...rest}
        shape="rounded"
        onChange={onChange}
     color="primary"
      />
    </Stack>
  );
}
