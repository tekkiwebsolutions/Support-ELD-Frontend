import { useSelector } from "react-redux";
import SvgColor from "../../Svg-color";
// ----------------------------------------------------------------------

export const icon = (name) => (
  <SvgColor
    src={`../.../../../../../public/sidebarIcon/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const userId =()=>{
 const {user_id} = useSelector((item)=>item.auth)
   return user_id
}
export const profileconfig = (user_id) => [
  {
    title: "Account",
    path: `account/${user_id}`,
    icon: icon("ic_account"),
  },
  {
    title: "Logout",
    path: "/404",
    icon: icon("ic_logout"),
  },
];

const NavConfigPortalAdmin = [
  {
    title: "Portal Staff",
    path: "/portalstaff",
    icon: icon("ic_staffIcon"),
  },
  {
    title: "Company Admin",
    path: "/company-admin",
    icon: icon("ic_company"),
  },
  {
    title: "Comapny Staff",
    path: "/Company-staff",
    icon: icon("ic_staff"),
  },
  {
    title: "Driver",
    path: "/driver",
    icon: icon("ic_driver"),
  },
  {
    title: "Vehicle",
    path: "/vehicle",
    icon: icon("ic_vehicle"),
  },
  {
    title: "Setting",
    path: "/setting",
    icon: icon("ic_settings"),
  },

  // {
  //   title: "user",
  //   path: "/user",
  //   icon: icon("ic_user"),
  //   children: [
  //     {
  //       title: "The Dow Theory",
  //       to: "/thedowtheory",
  //       icon: icon("ic_user"),
  //     },
  //     {
  //       title: "Charts & Chart Patterns",
  //       to: "/chart",
  //     },
  //     {
  //       title: "Trend & Trend Lines",
  //       to: "/trendlines",
  //     },
  //     {
  //       title: "Support & Resistance",
  //       to: "/sandr",
  //     },
  //   ],
  // },
];
export default NavConfigPortalAdmin;

const NavConfigPortalstaff = [
  {
    title: "Company Admin",
    path: "/company-admin",
    icon: icon("ic_company"),
  },

  {
    title: "Driver",
    path: "/driver",
    icon: icon("ic_driver"),
  },
  {
    title: "Vehicle",
    path: "/vehicle",
    icon: icon("ic_vehicle"),
  },
  {
    title: "Setting",
    path: "/setting",
    icon: icon("ic_settings"),
  },
];

const NavConfigCompanyAdmin = [
  {
    title: "Drivers",
    path: "/drivers",
    icon: icon("ic_driver"),
  },
  {
    title: "Logs",
    path: "/Logs",
    icon: icon("ic_vehicle"),
  },

  {
    title: "Setting",
    path: "/setting",
    icon: icon("ic_settings"),
  },

  // {
  //   title: "user",
  //   path: "/user",
  //   icon: icon("ic_user"),
  //   children: [
  //     {
  //       title: "The Dow Theory",
  //       to: "/thedowtheory",
  //       icon: icon("ic_user"),
  //     },
  //     {
  //       title: "Charts & Chart Patterns",
  //       to: "/chart",
  //     },
  //     {
  //       title: "Trend & Trend Lines",
  //       to: "/trendlines",
  //     },
  //     {
  //       title: "Support & Resistance",
  //       to: "/sandr",
  //     },
  //   ],
  // },
];

export const getNavbarAllPanel = () => {
  // Get the user_type from Redux state
  const { user } = useSelector((state) => state.auth);
  // Define and return navbar panels based on the user_type
  switch (user?.user_type) {
    case "portal_admin":
      return NavConfigPortalAdmin;
    case "portal_staff":
      return NavConfigPortalstaff;
    case "company_admin":
      return NavConfigCompanyAdmin;

    default:
      // Default panels for unknown user types or unauthenticated users
      return [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
      ];
  }
};


