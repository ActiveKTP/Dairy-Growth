import { useState, useMemo } from "react";
// @mui material components
import Card from "@mui/material/Card";
import CardInputGrowth from "components/Card/CardInputGrowth";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Growth4 from "layouts/tables/data/growth4";
import Growth12 from "layouts/tables/data/growth12";
import Growth18 from "layouts/tables/data/growth18";
import Growth_cv from "layouts/tables/data/growth_cv";
import Growth from "layouts/tables/data/growth";

function Tables() {
  const [inputData, setInputData] = useState(false);
  const [cowId, setCowId] = useState(null);
  //const [gTranId, setgTranId] = useState(null)
  const [gStatus, setGstatus] = useState(null);

  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  //console.log(growthfourmonth);
  //const growth = growthfourmonth();

  const closeInput = () => {
    setInputData(!inputData);
  }

  const setValueCowId = { setCowId, setGstatus, closeInput, inputData };

  const { columns: gfCols, rows: gfRows } = Growth4(setValueCowId);
  const { columns: g12Cols, rows: g12Rows } = Growth12(setValueCowId);
  const { columns: g18Cols, rows: g18Rows } = Growth18(setValueCowId);
  const { columns: gcvCols, rows: gcvRows } = Growth_cv(setValueCowId);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!inputData ? <SuiBox py={3}>
        {/*<SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Authors table</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Projects table</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={prCols} rows={prRows} />
            </SuiBox>
          </Card>
        </SuiBox>*/}
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">โคอายุ 4 เดือน</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={gfCols} rows={gfRows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">โคอายุ 12 เดือน</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={g12Cols} rows={g12Rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">โคอายุ 18 เดือน</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={g18Cols} rows={g18Rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">โคคลอดลูกตัวแรก</SuiTypography>
            </SuiBox>
            <SuiBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={gcvCols} rows={gcvRows} />
            </SuiBox>
          </Card>
        </SuiBox>
      </SuiBox>
        : <SuiBox py={3}><CardInputGrowth closeInput={closeInput} cowId={cowId} gStatus={gStatus} /></SuiBox>
      }
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
