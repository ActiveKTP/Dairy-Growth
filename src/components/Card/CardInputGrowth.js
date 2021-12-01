//import React from "react";
import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
// components
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from '@mui/material/Tooltip';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import Socials from "layouts/authentication/components/Socials";
import SeparatorIuput from "components/SuiSeparator/SeparatorInput";

import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import useFetch from "useFetch";


export default function CardSettings(props) {
    let gStatusTitle = null;

    if (props.gStatus == '01') gStatusTitle = 'โคอายุ 4 เดือน'
    else if (props.gStatus == '02') gStatusTitle = 'โคอายุ 12 เดือน'
    else if (props.gStatus == '03') gStatusTitle = 'โคอายุ 18 เดือน'
    else if (props.gStatus == '04') gStatusTitle = 'โคคลอดลูกตัวแรก'


    /*let gStatusTitle = null;

    if (props.gStatus == '01') gStatusTitle = 'โคอายุ 4 เดือน'
    else if (props.gStatus == '02') gStatusTitle = 'โคอายุ 12 เดือน'
    else if (props.gStatus == '03') gStatusTitle = 'โคอายุ 18 เดือน'
    else if (props.gStatus == '04') gStatusTitle = 'โคคลอดลูกตัวแรก'
    setgStatusName(gStatusTitle)*/

    //const [inputData, setInputData] = useState(true);
    const [cowId, setCowId] = useState(props.cowId);
    const [gStatus, setgStatus] = useState(props.gStatus);
    const [gStatusName, setgStatusName] = useState(gStatusTitle);
    const [gMeasureDate, setgMeasureDate] = useState('');
    const [gWeight, setgWeight] = useState('');
    const [gRemark, setgRemark] = useState('');
    const [gEvaluator, setgEvaluator] = useState('');
    const [gEvaluatorName, setgEvaluatorName] = useState('');


    const getTimestamp = () => (new Date().getTime())

    const numberWithoutMemo = getTimestamp()

    const { data: growth, isPending, error } = useFetch('https://localhost:5001/api/cow/farm/' + props.cowId);
    console.log(props);

    //const handleSetAgremment = () => setAgremment(!agreement);
    return (
        <>
            {isPending && <SuiBox textAlign="center">
                <SuiTypography variant="h5" fontWeight="medium">
                    Loading...
                </SuiTypography>
            </SuiBox>}
            {error && <SuiBox textAlign="center">
                <SuiTypography variant="h5" fontWeight="medium">
                    {error}
                </SuiTypography>
            </SuiBox>}
            {growth != '' && <Card>
                <SuiBox p={2} mb={0} display="flex" justifyContent="space-between">
                    <SuiBox textAlign="left">
                        <SuiTypography variant="h5" fontWeight="medium">
                            เพิ่มข้อมูล {numberWithoutMemo}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox display="flex" justifyContent="center" m={1} p={0}>
                        <Tooltip title="บันทึกข้อมูล">
                            <Button variant="contained" color="light" startIcon={<SaveIcon color="info" />}>
                                <SuiTypography variant="h6" fontWeight="medium">
                                    บันทึก
                                </SuiTypography>
                            </Button>
                        </Tooltip>
                        <SuiBox px={0.5}></SuiBox>
                        <Tooltip title="แก้ไขข้อมูล">
                            <Button variant="contained" color="light" startIcon={<EditIcon color="warning" />}>
                                <SuiTypography variant="h6" fontWeight="medium">
                                    แก้ไข
                                </SuiTypography>
                            </Button>
                        </Tooltip>
                        <SuiBox px={0.5}></SuiBox>
                        <Tooltip title="ลบข้อมูล">
                            <Button variant="contained" color="light" startIcon={<DeleteIcon color="error" />}>
                                <SuiTypography variant="h6" fontWeight="medium">
                                    ลบ
                                </SuiTypography>
                            </Button>
                        </Tooltip>
                        <SuiBox px={1}></SuiBox>
                        <Tooltip title="ปิดหน้าต่าง">

                            <SuiButton variant="outlined" color="light" onClick={props.closeInput} >
                                <CloseIcon color="error" size="medium" />
                            </SuiButton>

                        </Tooltip>
                    </SuiBox>

                </SuiBox>
                <SuiBox pt={2} pb={3} px={3}>
                    <SuiBox component="form" role="form">
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขประจำตัวโค
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขประจำตัวโค" disabled value={cowId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ชื่อโค
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ชื่อโค" disabled value={growth.ccowName} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        วัน/เดือน/ปีเกิด
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="วัน/เดือน/ปีเกิด" disabled value={growth.cBirthDate_th} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        อายุ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="อายุ" disabled value={growth.age_day} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขพ่อ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขพ่อ" disabled value={growth.cSireId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขแม่
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขแม่" disabled value={growth.cDamId} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        สถานะการวัดน้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="สถานะการวัดน้ำหนัก" disabled value={gStatusName} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        เพศ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="เพศ" disabled value={growth.cSex_title} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        วันที่วัดน้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="date" placeholder="วันที่วัดน้ำหนัก" value={gMeasureDate} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        น้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="number" placeholder="น้ำหนัก" value={gWeight} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox justifyContent="space-between">
                            <SuiBox mb={2}>
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเหตุ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเหตุ" value={gRemark} success />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        รหัสเจ้าหน้าที่
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="รหัสเจ้าหน้าที่" value={gEvaluator} icon={{
                                    component: "check",
                                    direction: "right",
                                }} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ชื่อเจ้าหน้าที่
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ชื่อเจ้าหน้าที่" value={gEvaluatorName} disabled />
                            </SuiBox>
                        </SuiBox>
                        <SeparatorIuput />
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ทะเบียนฟาร์ม
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ทะเบียนฟาร์ม" disabled value={growth.fFarmId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ชื่อฟาร์ม
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ชื่อฟาร์ม" disabled value={growth.fName} />
                            </SuiBox>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
            </Card>}
        </>
    );
}
