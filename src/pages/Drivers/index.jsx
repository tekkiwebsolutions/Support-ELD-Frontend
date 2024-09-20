import { Container } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import SearchFilter from "../../Components/Searchfilter";
import Table from "../../Components/Table";
import { useDeleteDriverMutation, useFetchDriverQuery } from "../../Redux/DriverRtkApi";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CustomPagination from "../../Components/Pagination";
import DeleteConfirmationDialog from "../../Components/ConfirmDialogPop";
import { errorHandler, filterHiddenColumns, successHandler } from "../../ulits/Commonfuction";
import { useNavigate } from "react-router";
import { useFetchPermissionQuery } from "../../Redux/Permission";
const Drivers = () => {
  const [endpoint, setEndpoint] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });
  const { data, isLoading,refetch ,error} = useFetchDriverQuery(endpoint);
   const[DelectDriver,{isLoading:Loading}]=useDeleteDriverMutation()
  const [Searchfilter, setSearchfilter] = useState("");
  const [dialogOpen, setDialogopen] = useState(false);
  const [deleteID,setdeleteId]=useState(null)
const navigate =useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
const{data:permission,refetch:reloadpermission}=useFetchPermissionQuery()
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
        Header: "Driver license Number",
        accessor: "driver_license_number",
      },
      {
        Header: " Driver Address",
        accessor: "driver_address",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "Status",
        accessor: "driver_status",
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
       
        Cell: ({ row }) => (
          <button
            onClick={() => navigate(`/edit-driver/${row.original.user_id}`)}
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
  const closedialog = () => {
    setDialogopen(false);
  };
  const handleDelete=(id)=>{
    setDialogopen(true)
    setdeleteId(id)
  }
  useEffect(() => {
    // Update endpoint state when page, pageSize, or filterSearch changes
    setEndpoint({
      page: page,
      pageSize: pageSize,
      filter: Searchfilter,
    });
  }, [page, pageSize, Searchfilter]);
  const ondelectHandle = async () => {
    try {
      const res = await DelectDriver(deleteID);
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

  const showColumn =filterHiddenColumns(columns,permission?.driver)
  return (
    <div className="mx-4">
      <PageHeader
        title="Drivers"
        btntext="Add Drivers"
        permission={permission?.driver?.add}
        addOnClick={() => navigate("/add-driver")}
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
        onDelete={ondelectHandle}
        isloading={Loading}
      />
    </div>

  );
};

export default Drivers;
