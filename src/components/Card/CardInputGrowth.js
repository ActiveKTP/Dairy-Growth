//import React from "react";
import { useState, useEffect } from "react";
import dayjs from 'dayjs'
import { WatDatePicker } from 'thaidatepicker-react'
import { useForm } from "react-hook-form";

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
import SuiAlert from "components/SuiAlert";

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
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import useFetch from "controller/useFetch";
import CheckStaff from "controller/checkStaff";
import GetMeasure from "controller/GetMeasure";
import CreateMeasure from "controller/CreateMeasure";
import UpdateMeasure from "controller/UpdateMeasure";
import DeleteMeasure from "controller/DeleteMeasure";

// Custom styles for DashboardNavbar
import {
    navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";


export default function CardSettings(props) {
    let gStatusTitle = null;

    if (props.gStatus == '01') gStatusTitle = 'โคอายุ 4 เดือน'
    else if (props.gStatus == '02') gStatusTitle = 'โคอายุ 12 เดือน'
    else if (props.gStatus == '03') gStatusTitle = 'โคอายุ 18 เดือน'
    else if (props.gStatus == '04') gStatusTitle = 'โคคลอดลูกตัวแรก'
    //const current = dayjs().date() + '/' + dayjs().month() + '/' + (dayjs().year() + 543)
    //const minDate = dayjs().date() + '/' + dayjs().month() + '/' + (dayjs().year() + 542)
    const current = dayjs().format('YYYY-MM-DD')
    const minDate = dayjs().add(-1, 'year').format('YYYY-MM-DD')
    //const numberWithoutMemo = getTimestamp()
    //const { data: cow, isPending, error } = useFetch('https://localhost:5001/api/growth/cow/' + props.gStatus + '/' + props.cowId);
    const [cowId, setCowId] = useState(props.cowId);
    const [gStatus, setgStatus] = useState(props.gStatus);
    const [gStatusName, setgStatusName] = useState(gStatusTitle);

    const [gTranId, setgTranId] = useState('');
    const [ccowNo, setccowNo] = useState('');
    const [ccowName, setccowName] = useState('');
    const [cBirthDate_th, setcBirthDate] = useState('');
    const [age_day, setage_day] = useState('');
    const [cSireId, setcSireId] = useState('');
    const [cDamId, setcDamId] = useState('');
    const [cSex_title, setcSex_title] = useState('');
    const [fFarmId, setfFarmId] = useState('');
    const [fName, setfName] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [gMeasureDate, setgMeasureDate] = useState('');
    const [gWeight, setgWeight] = useState('');
    const [gRemark, setgRemark] = useState('');
    const [gEvaluator, setgEvaluator] = useState('');
    const [gEvaluatorName, setgEvaluatorName] = useState('');
    const [checkStaffStatus, setcheckStaffStatus] = useState(false)
    const [saveStatus, setSaveStatus] = useState(false)
    const [addStatus, setaddStatus] = useState('')
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const cow = await GetMeasure({ cowId: props.cowId, gStatus: props.gStatus });
            setgTranId(cow.gTranId)
            setccowNo(cow.ccowNo)
            setccowName(cow.ccowName)
            setcBirthDate(cow.cBirthDate_th)
            setage_day(cow.age_day)
            setcSireId(cow.cSireId === null ? '' : cow.cSireId)
            setcDamId(cow.cDamId === null ? '' : cow.cDamId)
            setcSex_title(cow.cSex_title)
            setfFarmId(cow.fFarmId)
            setfName(cow.fName)
            setSelectedDate(cow.gMeasureDate === null ? current : cow.gMeasureDate)
            setgMeasureDate(cow.gMeasureDate_th === null ? dayjs().format('DD') + '/' + dayjs().format('MM') + '/' + (dayjs().year() + 543) : cow.gMeasureDate_th)
            setgWeight(cow.gWeight === null ? '' : cow.gWeight)
            setgRemark(cow.gRemark === null ? '' : cow.gRemark)
            setgEvaluator(cow.gEvaluator === null ? '' : cow.gEvaluator)
            setIsPending(false);
            setData(true)
            setaddStatus(cow.gTranId === null ? 'add' : 'edit')
            setcheckStaffStatus(cow.gTranId === null ? false : true)
            setError(cow.error);
            const staff = await CheckStaff(cow.gEvaluator);
            if (staff) {
                setgEvaluatorName(staff.StaffFullName)
            }
        }
        fetchData();
    }, [cowId]);

    const handleDatePickerChange = (christDate, buddhistDate) => {
        setSelectedDate(christDate)
        setgMeasureDate(dayjs(buddhistDate).format('DD/MM/YYYY'))
        const myContainer = register("gMeasureDate")
    }

    /*async function handleCheckStaff() {
        const staff = await CheckStaff(gEvaluator);
        setgEvaluatorName(staff.StaffFullName)
        setcheckStaffStatus(true)
        //console.log(staff.StaffFullName)
    }*/

    const handleCheckStaff = async () => {
        const staff = await CheckStaff(gEvaluator);
        //alert(staff.StaffFullName)
        if (staff) {
            setgEvaluatorName(staff.StaffFullName)
            setcheckStaffStatus(true)
            //console.log(staff.StaffFullName)
        }
    }

    function cancleCheckStaff() {
        setgEvaluatorName('')
        setcheckStaffStatus(false)
    }

    const handleEditButton = () => {
        setaddStatus('add')
        setcheckStaffStatus(false)
    }

    const confirmDeleteButton = () => {
        setDeleteStatus(!deleteStatus)
    }

    const handleDeleteButton = async () => {
        const measure = await DeleteMeasure(gTranId);
        setSaveStatus(true)
        setDeleteStatus(!deleteStatus)
        if (measure) {
            setSaveStatus(false)
            props.closeInput();
        }
    }

    const { register, handleSubmit, errors, watch, setFocus } = useForm();
    const [result, setResult] = useState('');
    const onSubmit = async (data) => {
        //console.log(data)
        if (!checkStaffStatus) {
            setFocus('gEvaluator');
            return false;
        }
        data.gCowNo = ccowNo
        data.gCowStatus = gStatus
        data.gMeasureDate = selectedDate
        data.user_updated = 'Activex'
        //const measureData = JSON.stringify(data.gMeasureDate = selectedDate)
        //console.log(data)
        //measureData.gMeasureDate = selectedDate;
        setSaveStatus(true)
        //console.log(data)
        if (gTranId === null) {
            const measure = await CreateMeasure(data);
            //console.log(measure)
            if (measure) {
                setSaveStatus(false)
                setaddStatus('edit')
                setgTranId(measure.gTranId)
            }
        }
        else {
            data.gTranId = gTranId
            const measure = await UpdateMeasure(data);
            //console.log(measure)
            if (measure) {
                setSaveStatus(false)
                setaddStatus('edit')
            }
        }
        setResult(JSON.stringify(data));
    }

    const ConfirmDelete = () => {
        return (
            <SuiBox>
                <SuiAlert display="flex" color="error">ยืนยันการลบข้อมูล!
                    <SuiBox px={1}></SuiBox>
                    <SuiBox display="flex" justifyContent="center">
                        <Button onClick={handleDeleteButton} variant="contained" color="light" startIcon={<DeleteIcon color="error" />}>
                            <SuiTypography variant="h6" fontWeight="medium">
                                ยืนยัน
                            </SuiTypography>
                        </Button>
                        <SuiBox px={1}></SuiBox>
                        <Button onClick={confirmDeleteButton} variant="contained" color="light">
                            <SuiTypography variant="h6" fontWeight="medium">
                                ยกเลิก
                            </SuiTypography>
                        </Button>
                    </SuiBox>
                </SuiAlert>
            </SuiBox>
        )
    }
    return (
        <>
            <p>{result}</p>
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
            {data != '' && <Card>
                <SuiBox p={2} mb={0} display="flex" justifyContent="space-between">
                    <SuiBox textAlign="left">
                        {gTranId === null ? <SuiTypography variant="h5" fontWeight="medium">
                            เพิ่มข้อมูล
                        </SuiTypography> : <SuiTypography variant="h5" fontWeight="medium">
                            แก้ไขข้อมูล
                        </SuiTypography>}
                    </SuiBox>
                    <SuiBox display="flex" justifyContent="center" m={1} p={0}>
                        {saveStatus ? <SuiBox textAlign="center">
                            <SuiTypography variant="h5" fontWeight="medium">
                                กำลังบันทึกข้อมูล...
                            </SuiTypography>
                        </SuiBox> :
                            <SuiBox display="flex" justifyContent="center">
                                {gTranId === null || addStatus == 'add' ?
                                    <SuiBox display="flex" justifyContent="center">
                                        <Tooltip title="บันทึกข้อมูล">
                                            <Button onClick={handleSubmit(onSubmit)} variant="contained" color="light" startIcon={<SaveIcon color="info" />}>
                                                <SuiTypography variant="h6" fontWeight="medium">
                                                    บันทึก
                                                </SuiTypography>
                                            </Button>
                                        </Tooltip>
                                        <SuiBox px={0.5}></SuiBox>
                                    </SuiBox>
                                    :
                                    <SuiBox display="flex" justifyContent="center">
                                        <Tooltip title="แก้ไขข้อมูล">
                                            <Button onClick={handleEditButton} variant="contained" color="light" startIcon={<EditIcon color="warning" />}>
                                                <SuiTypography variant="h6" fontWeight="medium">
                                                    แก้ไข
                                                </SuiTypography>
                                            </Button>
                                        </Tooltip>
                                        <SuiBox px={0.5}></SuiBox>
                                        <Tooltip title="ลบข้อมูล">
                                            <Button onClick={confirmDeleteButton} variant="contained" color="light" startIcon={<DeleteIcon color="error" />}>
                                                <SuiTypography variant="h6" fontWeight="medium">
                                                    ลบ
                                                </SuiTypography>
                                            </Button>
                                        </Tooltip>
                                    </SuiBox>
                                }
                            </SuiBox>
                        }
                        <SuiBox px={1}></SuiBox>
                        <Tooltip title="ปิดหน้าต่าง">

                            <SuiButton variant="outlined" color="light" onClick={props.closeInput} >
                                <CloseIcon color="error" size="medium" />
                            </SuiButton>

                        </Tooltip>
                    </SuiBox>

                </SuiBox>
                <SuiBox pt={2} pb={3} px={3}>
                    <p>{gTranId} {addStatus} {checkStaffStatus}</p>
                    {deleteStatus && <ConfirmDelete />}
                    <SuiBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขประจำตัวโค
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput {...register("ccowId", { required: true })} type="text" placeholder="หมายเลขประจำตัวโค" disabled value={cowId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ชื่อโค
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ชื่อโค" disabled value={ccowName} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        วัน/เดือน/ปีเกิด
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="วัน/เดือน/ปีเกิด" disabled value={cBirthDate_th} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        อายุ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="อายุ" disabled value={age_day} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขพ่อ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขพ่อ" disabled value={cSireId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขแม่
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขแม่" disabled value={cDamId} />
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
                                <SuiInput type="text" placeholder="เพศ" disabled value={cSex_title} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        วันที่วัดน้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiBox display="flex" justifyContent="space-between">
                                    <SuiInput type="text" placeholder="วันที่วัดน้ำหนัก" value={gMeasureDate} {...register("gMeasureDate", { required: true, maxLength: 10 })}
                                        disabled={gTranId === null || addStatus == 'add' ? false : true}
                                    />
                                    <SuiBox mt={1} ml={0.5}>
                                        <WatDatePicker
                                            value={current} // Can be replace with string or dayjs object (e.g. "2020-12-31" or `dayjs()`)
                                            onChange={handleDatePickerChange}
                                            dateFormat={'yyyy-MM-dd'} // for set data purpose [using date-fns format](https://date-fns.org/v2.12.0/docs/format)
                                            displayFormat={'dd/MM/yyyy'} // for display purpose (using dayjs format)[https://day.js.org/docs/en/display/format]
                                            inputStyle={{ color: '#202020' }} // styles for input
                                            clearable={false} // true | false
                                            minDate={minDate} // supported date as string
                                            maxDate={current} // also supported dayjs or moment
                                            disabled={false} // true | false
                                            readOnly={false} // true | false
                                            yearBoundary={99} // number of boundary ±X Year
                                        />
                                    </SuiBox>
                                </SuiBox>
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        น้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput {...register("gWeight", { required: true, min: 10, max: 100 })} type="number" placeholder="น้ำหนัก" value={gWeight} onChange={e => setgWeight(e.target.value)}
                                    disabled={gTranId === null || addStatus == 'add' ? false : true}
                                />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox justifyContent="space-between">
                            <SuiBox mb={2}>
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเหตุ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput {...register("gRemark", { pattern: /^[ก-๏\sA-Za-z]+$/i, maxLength: 50 })} type="text" placeholder="หมายเหตุ" value={gRemark} onChange={e => setgRemark(e.target.value)}
                                    disabled={gTranId === null || addStatus == 'add' ? false : true}
                                />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        รหัสเจ้าหน้าที่
                                    </SuiTypography>
                                </SuiBox>
                                <SuiBox display="flex" justifyContent="space-between">
                                    <SuiInput {...register("gEvaluator", { required: true, maxLength: 10 })} type="text" placeholder="รหัสเจ้าหน้าที่" value={gEvaluator} onChange={e => setgEvaluator(e.target.value)}
                                        disabled={checkStaffStatus ? true : false} success={checkStaffStatus} />
                                    <SuiBox mt={1} ml={0.5}>
                                        {!checkStaffStatus && <CheckBoxIcon color="dark" size="medium" onClick={handleCheckStaff} />}
                                        {checkStaffStatus && <ClearIcon color="dark" size="medium" onClick={cancleCheckStaff} />}
                                    </SuiBox>
                                </SuiBox>
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
                                <SuiInput type="text" placeholder="ทะเบียนฟาร์ม" disabled value={fFarmId} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ชื่อฟาร์ม
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="ชื่อฟาร์ม" disabled value={fName} />
                            </SuiBox>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
            </Card>}
        </>
    );
}
