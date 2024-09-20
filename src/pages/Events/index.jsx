import React, { useMemo } from 'react'
import PageHeader from '../../Components/PageHeader'
import Table from '../../Components/Table'

const Events = () => {





  const data = [
    {
      time: "09:30 AM",
      vechile: "Truck A",
      event: "Engine Start",
      status: "Running",
      location: "New York, NY",
      odometer: "12500 miles",
      engine: "320 hours",
    },
    {
      time: "11:45 AM",
      vechile: "Truck B",
      event: "Delivery",
      status: "Stopped",
      location: "Los Angeles, CA",
      odometer: "18900 miles",
      engine: "490 hours",
    },
    // Add more dummy data as needed...
  ];
  


  const columns = useMemo(
    () => [
     

      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Vechile",
        accessor: "vechile",
      },

      {
        Header: "Event",
        accessor: "event",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Odometer",
        accessor: "odometer",
      },
      {
        Header: "Engine Hours",
        accessor: "engine",
      },
     
    ],
    []
  );
  return (
    <div className='mx-4'>
    <PageHeader title="Unidentified  Events" permission={false} />
    <div style={{ width: "100%" }}>
        {/* <SearchFilter filterFunction={setSearchfilter} /> */}
        <Table
          columns={columns}
          data={data}
          //   loading={isLoading}
        />
      </div>
    </div>
  )
}

export default Events
