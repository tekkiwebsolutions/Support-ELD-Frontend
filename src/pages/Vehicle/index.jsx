import { Container } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import { useNavigate } from "react-router";
import SearchFilter from "../../Components/Searchfilter";
import Table from "../../Components/Table";
import {
  useDeleteVehicleMutation,
  useFetchVehicleQuery,
} from "../../Redux/VehicleRtkApi";
import CustomPagination from "../../Components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteConfirmationDialog from "../../Components/ConfirmDialogPop";
import { errorHandler, filterHiddenColumns, successHandler } from "../../ulits/Commonfuction";
import { useFetchPermissionQuery } from "../../Redux/Permission";

const Vehicle = () => {
  const navigate = useNavigate();
  const [searchfilter, setSearchfilter] = useState("");
  const [dialogOpen, setDialogopen] = useState(false);
  const [delectId, setdeleteId] = useState(null);
  const [deleteVehicle, { isLoading: Loading }] = useDeleteVehicleMutation();
  const [endpoint, setEndpoint] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });
  const { data, isLoading, refetch,error } = useFetchVehicleQuery(endpoint);
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const handleDelete = (id) => {
    setDialogopen(true);
    setdeleteId(id);
  };
   const{data:permission ,refetch :reloadpermission}=useFetchPermissionQuery()
   console.log(permission,"permissio")
  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "driver_full_name",
      },
      {
        Header: "Company Name",
        accessor: "company_name",
      },
    
      {
        Header: "Vehicle Unit",
        accessor: "Vehicle_unit",
      },
      {
        Header: "Eld Connection Interface",
        accessor: "Eld_connection_interface",
      },
      {
        Header: "Fuel",
        accessor: "fuel",
      },
      {
        Header: "Vehicle Identification Number",
        accessor: "Vehicle_identification_number",
      },
      {
        Header: "Plate Number",
        accessor: "plate_number",
      },
      {
        Header: "Driver Phone  Number",
        accessor: "driver_phone_number",
      },
      {
        Header: "Vehicle Status",
        accessor: "Vehicle_status",
      },
      {
        Header: "Model",
        accessor: "model",
      },
    
      {
        Header: "Delete",
        accessor: "id",
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
            onClick={() => navigate(`/edit-vehicle/${row.original.Vehicle_id}`)}
          >
            <BorderColorIcon style={{ color: "black" }} />
          </button>
        ),
      },
    ],
    []
  );

  const ondelectHandle = async () => {
    try {
      const res = await deleteVehicle(delectId);
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
    // Update endpoint state when page, pageSize, or filterSearch changes
    setEndpoint({
      page: page,
      pageSize: pageSize,
      filter: searchfilter,
    });
  }, [page, pageSize, searchfilter]);

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


  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);

  useEffect(()=>{
    reloadpermission()
  },[])
  const showColumn = filterHiddenColumns(columns,permission?.vehicle
    )
  return (
    <div className="mx-5">
      <PageHeader
        title="Vehicle"
        btntext="Add Vehicle"
        permission={permission?.vehicle?.add}
        addOnClick={() => navigate("/add-vehicle")}
      />
      <div style={{ width: "100%" }}>
        <SearchFilter filterFunction={setSearchfilter} />
        <Table
          columns={showColumn}
          data={data ? data?.results : []}
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

export default Vehicle;
