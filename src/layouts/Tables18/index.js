import { useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardInputGrowth from "components/Card/CardInputGrowth";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import CircularProgressWithLabel from "components/Progress/CircularProgressWithLabel";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import data from "layouts/Tables18/data";

function Tables18() {
    const [inputData, setInputData] = useState(false);
    const [cowId, setCowId] = useState(null);
    const [gStatus, setGstatus] = useState(null);
    const [refreshData, setRefershData] = useState(false);

    const closeInput = () => {
        setRefershData(!refreshData)
        setInputData(!inputData);
    }

    const setValueCowId = { setCowId, setGstatus, closeInput, refreshData };

    const { columns: gfCols, rows: gfRows } = data(setValueCowId);

    /*if (gfRows == '') {
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
            {!inputData && <SuiBox py={3}>
                <SuiBox mb={3}>
                    {gfRows == '' ? <Grid container justifyContent="center">
                        <SuiBox display="flex" alignItems="center" p={3}>
                            <CircularProgressWithLabel />
                        </SuiBox>
                    </Grid> :
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
                                <Table columns={gfCols} rows={gfRows} />
                            </SuiBox>
                        </Card>}
                </SuiBox>

            </SuiBox>}
            {inputData && <SuiBox py={3}><CardInputGrowth closeInput={closeInput} cowId={cowId} gStatus={gStatus} /></SuiBox>}
            {/*<Footer />*/}
        </DashboardLayout>
    );
}

export default Tables18;
