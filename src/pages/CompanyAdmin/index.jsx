import { Container } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import SearchFilter from "../../Components/Searchfilter";
import CustomPagination from "../../Components/Pagination";
import Table from "../../Components/Table";
import { useNavigate } from "react-router";
import {
  useDeleteCompanyAdminMutation,
  useFetchCompanyAdminQuery,
} from "../../Redux/CompanyAdminRtkQueryApi";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteConfirmationDialog from "../../Components/ConfirmDialogPop";
import { errorHandler, filterHiddenColumns, successHandler } from "../../ulits/Commonfuction";
import { useFetchPermissionQuery } from "../../Redux/Permission";

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [Searchfilter, setSearchfilter] = useState("");
  const [dialogOpen, setDialogopen] = useState(false);
  const [deleteID, setdeleteId] = useState(null);
  const [endpoint, setEndpoint] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });
  const { data, isLoading, error, refetch } =
    useFetchCompanyAdminQuery(endpoint);
  const [deleteCompanyAdmin, { isLoading: loading }] =
    useDeleteCompanyAdminMutation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
 const{data:datafetch ,refetch:reloadpermission}=useFetchPermissionQuery()

 const closedialog = () => {
   setDialogopen(false);
 };
  const handleDelete = (id) => {
    setDialogopen(true);
    setdeleteId(id);
  };
  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "full_name",
      },
      {
        Header: "Company Name",
        accessor: "company_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "address",
        accessor: "address",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
     
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
              navigate(`/edit-company-admin/${row.original.user_id}`)
            }
          >
            <BorderColorIcon style={{ color: "black" }} />
          </button>
        ),
      },
    ],
    [data]
  );

  useEffect(()=>{
    reloadpermission()
  },[])
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

  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
  const delectHandle = async () => {
    try {
      const res = await deleteCompanyAdmin(deleteID);
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

 const showColumn = filterHiddenColumns(columns,datafetch?.companyadmin)

  return (
    <Container>
      <PageHeader
        title="Company Admin"
        btntext="Add Company Admin"
        permission={datafetch?.companyadmin?.add}
        addOnClick={() => navigate("/add-company-admin")}
      

      />
      <div style={{ width: "100%" }}>
        <SearchFilter filterFunction={setSearchfilter} />
        <Table
          columns={showColumn}
          
          data={data?.results ? data?.results : []}
          loading={isLoading}
        />
      </div>
      <div className="mt-4">
        {!isLoading && (
          <CustomPagination
            pageSize={endpoint?.pageSize}
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

export default CompanyAdmin;
