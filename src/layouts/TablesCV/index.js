import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardInputGrowth from "components/Card/CardInputGrowth";

// Soft UI Dashboard React components
import Box from '@mui/material/Box'
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CircularProgressWithLabel from "components/Progress/CircularProgressWithLabel";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import data from "layouts/TablesCV/data";
import CardInputCV from "components/Card/CardInputCV";

function TablesCV() {
    const [inputData, setInputData] = useState(false);
    const [inputData_cv, setInputData_cv] = useState(false);
    const [cowId, setCowId] = useState(null);
    const [maTranId, setmaTranId] = useState(null)
    const [gStatus, setGstatus] = useState(null);
    const [refreshData, setRefershData] = useState(false);

    //const { columns, rows } = authorsTableData;
    //const { columns: prCols, rows: prRows } = projectsTableData;
    //console.log(growthfourmonth);
    //const growth = growthfourmonth();

    const closeInput = () => {
        setRefershData(!refreshData)
        setInputData(!inputData);
    }
    const closeInput_cv = () => {
        setRefershData(!refreshData)
        setInputData_cv(!inputData_cv);
    }

    const setValueCowId = { setCowId, setmaTranId, setGstatus, closeInput, closeInput_cv, refreshData };
    const { columns: gcvCols, rows: gcvRows } = data(setValueCowId, { inputData_cv: inputData_cv });

    /*if (gcvRows == '') {
        return (
            <SuiBox component="footer" py={6} mt={10}>
                <Grid container justifyContent="center">
                    <SuiBox display="flex" alignItems="center" p={3}>
                        <CircularProgressWithLabel />
                    </SuiBox>
                </Grid>
            </SuiBox>
        );
    }*/

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {!inputData && !inputData_cv && <SuiBox py={3}>
                <SuiBox mb={3}>
                    {gcvRows == '' ? <Grid container justifyContent="center">
                        <SuiBox display="flex" alignItems="center" p={3}>
                            <CircularProgressWithLabel />
                        </SuiBox>
                    </Grid> :
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
                        </Card>}
                </SuiBox>
            </SuiBox>}
            {inputData && <SuiBox py={3}><CardInputGrowth closeInput={closeInput} cowId={cowId} gStatus={gStatus} /></SuiBox>}
            {inputData_cv && <SuiBox py={3}><CardInputCV closeInput={closeInput_cv} cowId={cowId} gStatus={gStatus} maTranId={maTranId} /></SuiBox>}
            {/*<Footer />*/}
        </DashboardLayout>
    );
}

export default TablesCV;
