import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomPagination from "../../Components/Pagination";
import Table from "../../Components/Table";
import SearchFilter from "../../Components/Searchfilter";
import PageHeader from "../../Components/PageHeader";
import { Container } from "@mui/material";
import { useNavigate } from "react-router";
import { useDeleteCompanyStaffMutation, useFetchCompanyStaffQuery } from "../../Redux/CompanyStaffRtkApi";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteConfirmationDialog from "../../Components/ConfirmDialogPop";
import { successHandler } from "../../ulits/Commonfuction";

const CompanyStaff = () => {
  const navigate = useNavigate();
  const [Searchfilter, setSearchfilter] = useState("");
  const [dialogOpen, setDialogopen] = useState(false);
  const [deleteID, setdeleteId] = useState(null);
  const [endpoint, setEndpoint] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const { data, isLoading ,refetch} = useFetchCompanyStaffQuery(endpoint);
   const[deleteCompanyStaff,{isLoading:loading}]=useDeleteCompanyStaffMutation()

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "full_name",
      },
      ,
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Phone Number",
        accessor: "staff_phonenumber",
      },
      {
        Header: "Status",
        accessor: "staff_status",
      },

      {
        Header: "Delete",
        accessor: "user_id",
        show: false,
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
            onClick={() =>
              navigate(`/edit-company-staff/${row.original.user_id}`)
            }
          >
            <BorderColorIcon style={{ color: "black" }} />
          </button>
        ),
      },
    ],
    []
  );
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
  useEffect(() => {
    // Update endpoint state when page, pageSize, or filterSearch changes
    setEndpoint({
      page: page,
      pageSize: pageSize,
      filter: Searchfilter,
    });
  }, [page, pageSize, Searchfilter]);

  const closedialog = () => {
    setDialogopen(false);
  };
   const handleDelete = (id) => {
     setDialogopen(true);
     setdeleteId(id);
   };


   const delectHandle = async () => {
    try {
      const res = await deleteCompanyStaff(deleteID);
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
  return (
    <Container>
      <PageHeader
        title="Company Staff"
        btntext="Add Company Staff"
        permission={true}
        addOnClick={() => navigate("/add-company-staff")}
      />
      <div style={{ width: "100%" }}>
        <SearchFilter filterFunction={setSearchfilter} />
        <Table
          columns={columns}
          data={data?.results ? data?.results : []}
          loading={isLoading}
        />
      </div>
      <div className="mt-4">
        {!isLoading && (
        <CustomPagination
          pageSize={endpoint?.pageSize ?? 10}
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

export default CompanyStaff;
