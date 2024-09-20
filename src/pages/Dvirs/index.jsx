import React, { useMemo } from 'react'
import PageHeader from '../../Components/PageHeader'
import Table from '../../Components/Table';
import { useNavigate } from 'react-router';


const Dvirs = () => {

const Navigate =useNavigate()

  const data = [
    {
      time: "2024-03-13 10:00:00",
      vehicle: "Car",
      defects: "Engine malfunction",
      status: "Under repair",
      driver:"Rohit",
    },
    {
      time: "2024-03-13 11:30:00",
      vehicle: "Truck",
      defects: "Flat tire",
      status: "Waiting for replacement",
      driver:"vishal",
    },
    {
      time: "2024-03-13 13:45:00",
      vehicle: "Bus",
      defects: "Brake failure",
      status: "In service",
      driver:"vikarm",
    },
    // Add more data as needed
  ];
  

  const columns = useMemo(
    () => [
     

      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Driver",
        accessor: "driver",
      },
      {
        Header: "Vechile",
        accessor: "vechile",
      },

      {
        Header: "Defects",
        accessor: "defects",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      
     
    ],
    []
  );
  const GetRowHandle =(row)=>{
    Navigate("/dvirsview")
  }
  return (
    <div className='mx-4'>
    <PageHeader title="Dvirs" permission={false} />
    <div style={{ width: "100%" }}>
        {/* <SearchFilter filterFunction={setSearchfilter} /> */}
        <Table
          columns={columns}
          data={data}
          onRowClick={GetRowHandle}
          //   loading={isLoading}
        />
      </div>
    </div>
  )
}

export default Dvirs
