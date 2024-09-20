import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@mui/material";

import {  useLocation, useNavigate } from "react-router";
import Table from "../../Components/Table";
import CustomPagination from "../../Components/Pagination";
import {
  useDeleteStaffMutation,
  useFetchStaffQuery,
} from "../../Redux/PortalStaffRtkQueryApi";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import CustomizeMenus from "../../Components/CustomMenu";
import SearchFilter from "../../Components/Searchfilter";
import DeleteConfirmationDialog from "../../Components/ConfirmDialogPop";
import { errorHandler, successHandler } from "../../ulits/Commonfuction";
import PageHeader from "../../Components/PageHeader";

const PortalStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSearch, setfilterSearch] = useState("");
  const [dialogOpen, setDialogopen] = useState(false);
  const [deleteId, setDelecteId] = useState(null);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const { data, isLoading, refetch, error } = useFetchStaffQuery({
    page: currentPage,
    pageSize: currentPageSize,
    filter: filterSearch,
  });
  const [DeleteProtalSraff, { isLoading: loading }] = useDeleteStaffMutation();
  // Get the values of page and pageSize parameters
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "full_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Designation",
        accessor: "designation",
      },
      {
        Header: "Permission",
        accessor: "permissions",
        Cell: ({ value }) => (
          <div className="m-auto">
            {value && value.some((item) => item.value) ? (
              <CustomizeMenus rowData={value} />
            ) : (
              "none"
            )}
          </div>
        ),
      },
      {
        Header: "Delete",
        accessor: "user_id",
        Cell: ({ value }) => (
          <button onClick={() => handleDelete(value)}>
            <DeleteIcon style={{ color: "red" }} />
          </button>
        ),
      },
      {
        Header: "Edit",
        // accessor: "user_id",
        Cell: ({ row }) => (
          <button
            onClick={() => navigate(`/editportalstaff/${row.original.user_id}`)}
          >
            <BorderColorIcon style={{ color: "black" }} />
          </button>
        ),
      },
    ],
    [data]
  );

  useEffect(() => {
    if (page || pageSize || filterSearch) {
      setCurrentPage(page);
      setCurrentPageSize(pageSize);
      setfilterSearch(filterSearch);
    }
  }, [page, pageSize]);

  const handlePaginationChange = useCallback(
    (event, newPage) => {
      // Assuming you have state variables for page and pageSize

      // Update URL search parameters
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", newPage);
      searchParams.set("pageSize", 10); // Assuming page size is fixed

      navigate(`${location.pathname}?${searchParams.toString()}`);

      // Add your logic here
    },
    [location]
  );

  const closedialog = useCallback(() => {
    setDialogopen(false);
  }, []);
  const handleDelete = (id) => {
    setDelecteId(id); // Set the delete ID when the delete button is clicked
    setDialogopen(true); // Open the delete confirmation dialog
  };
  const delectHandle = async () => {
    try {
      const res = await DeleteProtalSraff(deleteId);
      if (res?.data?.success) {
        successHandler(res, res?.data?.success);
        refetch();
        closedialog();
      } else {
        errorHandler(res, true);
      }
    } catch (err) {
      console.error("Error occurred during login:", err);
      errorHandler(err, true);
    } finally {
    }
  };

  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
  return (
    <Container>
      <PageHeader title="Portal Staff Users" btntext="Add portal Staff" addOnClick={()=>navigate("/addportalStaff")} />
      <div style={{ width: "100%" }}>
        <SearchFilter filterFunction={setfilterSearch} />
        <Table
          columns={columns}
          data={data?.results ? data?.results : []}
          loading={isLoading}
        />
      </div>
      <div className="mt-4">
        {!isLoading && (
          <CustomPagination
            pageSize={pageSize}
            onChange={handlePaginationChange}
            totalCount={data?.total_count}
          />
        )}
      </div>

      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={closedialog}
        onDelete={delectHandle}
        isloading={loading}
      />
    </Container>
  );
};

export default PortalStaff;
