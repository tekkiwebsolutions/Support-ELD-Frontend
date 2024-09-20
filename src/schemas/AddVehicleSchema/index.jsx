import * as Yup from "yup";

// Define Yup validation schema
const AddVehiclevalidationSchema = Yup.object().shape({
  Eld_connection_interface: Yup.string().required(
    "Eld connection interface is required"
  ),
  Vehicle_identification_number: Yup.string().required(
    "Vehicle identification number is required"
  ),
  Vehicle_status: Yup.string().required("Vehicle status is required"),
  Vehicle_unit: Yup.string().required("Vehicle unit is required"),
  fuel: Yup.string().required("Fuel is required"),
  model: Yup.string().required("Model is required"),
  plate_number: Yup.string().required("Plate number is required"),
  driver_user_id: Yup.string().required("Driver is required"),
});

export default AddVehiclevalidationSchema;
