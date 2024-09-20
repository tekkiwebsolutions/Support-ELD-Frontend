import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import SearchFilter from "../../Components/Searchfilter";
import Table from "../../Components/Table";
import { useFetchCompanyDriverQuery } from "../../Redux/CompanyDrivers";
import CustomPagination from "../../Components/Pagination";
import { errorHandler } from "../../ulits/Commonfuction";
import { useNavigate } from "react-router";

const CompanyDriver = () => {
  const [Searchfilter, setSearchfilter] = useState("");
  const [endpoint, setEndpoint] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const { data, isLoading, error } = useFetchCompanyDriverQuery(endpoint);
const navigate =useNavigate()
  const DropdownFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    // Handle filter change
    // Handle filter change

    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
    const handleFilterChange = (e) => {
      const value = e.target.value;
      if (value === "All") {
        setFilter(undefined);
      } else {
        setFilter(value); // Use "includes" match for other values
      }
    };
    

    return (
      <div className="w-40">
        <select
          value={filterValue || ""}
          onChange={handleFilterChange}
          className="w-full text-black text-center p-1"
        >
          <option >All</option>
         
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "User Name",
        accessor: "full_name",
      },
      {
        Header: "Status",
        accessor: "driver_status",
        Filter: DropdownFilter,
        filter: "exact"
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Vehicles",
        accessor: "vehicles",
      },

      {
        Header: "Break ",
        accessor: "break_time",
      },
{
        Header: "Drive",
        accessor:"drive_time",
      },
      {
        Header: "Shift",
        accessor: "shift",
      },
      {
        Header: "Cycle",
        accessor: "cycle",
      },
    
      {
        Header: "Violations",
        accessor: "violations",
      },
      {
        Header: "Eld",
        accessor: "eld",
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

  useEffect(() => {
    if (error) {
      errorHandler(error, true);
    }
  }, [error]);
   const rowclickhandle=(row)=>{
 console.log(row,"rowAll")
 navigate("/driverview")
 
   }
  return (
    <div className="mx-5">
      <PageHeader
        title=" Company Drivers"
        btntext="Add Company Drivers"
        permission={false}
        addOnClick={() => navigate("/add-company-driver")}
      />
      <div style={{ width: "100%" }}>
        <SearchFilter filterFunction={setSearchfilter} />
        <Table
          columns={columns}
          data={data?.results ? data?.results : []}
          loading={isLoading}
          onRowClick={rowclickhandle}
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
    </div>
  );
};

export default CompanyDriver;
