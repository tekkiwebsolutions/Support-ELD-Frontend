import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import FilterTable from "../../Components/Table";
import CustomPagination from "../../Components/Pagination";

  const Users = () => {

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },

    // Add more columns as needed
  ];

  // Define your table data
  const data = [
    { name: 'John', age: 30},
    { name: 'Jane', age: 25 },
    { name: 'John', age: 30  },
    { name: 'Jane', age: 25 },
    // Add more data as needed
    // Add more data as needed
  ];
  return (
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Users</Typography>

          <Button variant="contained" color="inherit">
            New User
          </Button>
        </Stack>
        <div >
       <FilterTable columns={columns} data={data} />
        </div>
        <div  className="mt-4" >

       <CustomPagination/>
        </div>
      </Container>
  );
};

export default Users

