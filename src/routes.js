// Soft UI Dashboard React layouts
//import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Tables4 from "layouts/Tables4";
import Tables12 from "layouts/Tables12";
import Tables18 from "layouts/Tables18";
import TablesCV from "layouts/TablesCV"
// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// Simport RTL from "layouts/rtl";
// import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
//import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
// import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
// import CustomerSupport from "examples/Icons/CustomerSupport";
// import CreditCard from "examples/Icons/CreditCard";
// import Cube from "examples/Icons/Cube";
import TableViewIcon from '@mui/icons-material/TableView';
import TocIcon from '@mui/icons-material/Toc';

const routes = [
  /*{
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: Dashboard,
    noCollapse: true,
  },*/
  {
    type: "collapse",
    name: "น้ำหนักโค",
    key: "tables",
    route: "/tables",
    icon: <TableViewIcon size="12px" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "โคอายุ 4 เดือน",
    key: "table4",
    route: "/table4",
    icon: <TocIcon size="12px" />,
    component: Tables4,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "โคอายุ 12 เดือน",
    key: "table12",
    route: "/table12",
    icon: <TocIcon size="12px" />,
    component: Tables12,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "โคอายุ 18 เดือน",
    key: "table18",
    route: "/table18",
    icon: <TocIcon size="12px" />,
    component: Tables18,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "โคคลอดลูกตัวแรก",
    key: "tableCV",
    route: "/tableCV",
    icon: <TocIcon size="12px" />,
    component: TablesCV,
    noCollapse: true,
  },
  /* {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: Billing,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: VirtualReality,
    noCollapse: true,
  }, */
  /* {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: RTL,
    noCollapse: true,
  }, */
  { type: "title", title: "Account Pages", key: "account-pages" },
  /* {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: Profile,
    noCollapse: true,
  }, */
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: SignUp,
    noCollapse: true,
  },
];

export default routes;
