import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function errorHandler(error, toastStatus) {
  if (error?.error?.data?.error || error?.error) {
    toastStatus && toast.error(error?.error?.data?.error || error?.error);
    return {
      message: "error",
      error: error?.error?.data?.error,
    };
  } else {
    toastStatus && toast.warning("Something went wrong, Please try again");
    return {
      message: "error",
      error: "Something went wrong, Please try again",
    };
  }
}

export function successHandler(data, message, messageType = "success") {
  message && toast[messageType](message);
  return {
    message: "success",
    data,
  };
}
export const getTokenFromPersistedState = () => {
  // Retrieve the persisted state from local storage
  const persistedStateString = localStorage.getItem("persist:root");

  // Parse the persisted state JSON string to an object
  const persistedState = JSON.parse(persistedStateString);

  // Access the auth slice from the persisted state and parse it to an object
  const authState = JSON.parse(persistedState?.auth);

  // Retrieve the token from the auth slice
  const token = authState?.token;

  return token;
};

export const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const transformArray = (array, idKey, nameLabel) => {
  return array?.map((item) => ({
    user_id: item[idKey],
    label: item[nameLabel],
  }));
};

export const formatKey = (key) => {
  // Uppercase first letter and replace underscores with spaces
  return key?.charAt(0)?.toUpperCase() + key?.slice(1)?.replace(/_/g, " ");
};
export const  formatDate =(dateString)=> {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [year, month, day] = dateString?.split("-");
  const monthName = months[parseInt(month) - 1];
  return `${monthName} ${parseInt(day)}`;
}


export const filterHiddenColumns = (columns, object) => {
  const {user_type } = useSelector((item) => item.auth.user);

  return columns?.filter((column) => {
    // Check if the column's Header is not "Edit" and object.edit is true
    if (object?.delete === false && object?.edit === false && user_type !== "portal_admin") {
      return column.Header !== "Delete" && column.Header !== "Edit";
    } else if (object?.delete === false  && user_type !== "portal_admin") {
      return column.Header !== "Delete";
    } else if (object?.edit === false && user_type !== "portal_admin") {
      return column.Header !== "Edit";
    } else {
      return columns;
    }
    

  });
};
