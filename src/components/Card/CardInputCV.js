//import React from "react";
import { useState, useEffect } from "react";
import dayjs from 'dayjs'
import { WatDatePicker } from "thaidatepicker-react";
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
//
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//

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

//import useFetch from "controller/useFetch";
import CheckStaff from "controller/checkStaff";
import GetCalvingByCowId from "controller/GetCalvingByCowId";
import CreateMeasure from "controller/CreateMeasure";
import UpdateMeasure from "controller/UpdateMeasure";
import DeleteMeasure from "controller/DeleteMeasure";

import GetCalvingBymaTranId from "controller/GetCalvingBymaTranId";

// Custom styles for DashboardNavbar
import {
    navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";


export default function CardInputCV(props) {
    const current = dayjs().format('YYYY-MM-DD')
    const minDate = dayjs().add(-1, 'year').format('YYYY-MM-DD')
    const title = " : คลอด";
    const [cowId, setCowId] = useState(props.cowId);

    const [cvgTranId, setcvgTranId] = useState(null);
    const [ccowNo, setccowNo] = useState('');
    const [ccowName, setccowName] = useState('');
    const [cBirthDate_th, setcBirthDate] = useState('');
    const [age_day, setage_day] = useState('');
    const [cSireId, setcSireId] = useState('');
    const [cDamId, setcDamId] = useState('');
    //const [cSex_title, setcSex_title] = useState('');
    const [fFarmId, setfFarmId] = useState('');
    const [fName, setfName] = useState('')
    const [maDate, setmaDate] = useState('');
    const [maSemenId, setmaSemenId] = useState('');
    const [selectedDate, setSelectedDate] = useState(current);
    const [cvgDate, setcvgDate] = useState(dayjs().format('DD') + '/' + dayjs().format('MM') + '/' + (dayjs().year() + 543));
    //const [gWeight, setgWeight] = useState('');
    //const [gRemark, setgRemark] = useState('');
    const [firstChild, setfirstChild] = useState("0");
    const [secondChild, setSecondChild] = useState("0");
    const [gEvaluator, setgEvaluator] = useState('');
    const [gEvaluatorName, setgEvaluatorName] = useState('');
    const [checkStaffStatus, setcheckStaffStatus] = useState(false)
    const [saveStatus, setSaveStatus] = useState(false)
    const [addStatus, setaddStatus] = useState('add')
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [reTurnData, setreTurnData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const cow = await GetCalvingByCowId({ cowId: props.cowId, gStatus: props.gStatus });
            setccowNo(cow.ccowNo)
            setccowName(cow.ccowName)
            setcBirthDate(cow.cBirthDate_th)
            setage_day(cow.age_day)
            setcSireId(cow.cSireId === null ? '' : cow.cSireId)
            setcDamId(cow.cDamId === null ? '' : cow.cDamId)
            //setcSex_title(cow.cSex_title)
            setfFarmId(cow.fFarmId)
            setfName(cow.fName)
            setmaDate(cow.maDate_th)
            setmaSemenId(cow.maSemenId)
            //setgWeight(cow.gWeight === null ? '' : cow.gWeight)
            //setgRemark(cow.gRemark === null ? '' : cow.gRemark)
            setIsPending(false);
            setError(cow.error);
            setreTurnData(true)

            const calving = await GetCalvingBymaTranId(props.maTranId);
            if (calving) {
                setcvgTranId(calving.cvgTranId)
                setSelectedDate(calving.cvgDate === null ? current : calving.cvgDate)
                setcvgDate(calving.cvgDate === null ? dayjs().format('DD') + '/' + dayjs().format('MM') + '/' + (dayjs().year() + 543) : calving.cvgDate)
                setfirstChild(calving.firstChild)
                setSecondChild(calving.secondChild)
                setgEvaluator(calving.cvgStaffId === null ? '' : calving.cvgStaffId)
                setaddStatus(calving.cvgTranId === null ? 'add' : 'edit')
                setcheckStaffStatus(calving.cvgTranId === null ? false : true)
            }
            const staff = await CheckStaff(gEvaluator);
            if (staff) {
                setgEvaluatorName(staff.StaffFullName)
            }
        }
        fetchData();
    }, [cowId]);

    const handleDatePickerChange = (christDate, buddhistDate) => {
        setSelectedDate(christDate)
        setcvgDate(dayjs(buddhistDate).format('DD/MM/YYYY'))
        const myContainer = register("cvgDate")
    }

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
        setSaveStatus(true)
        setDeleteStatus(!deleteStatus)
        const measure = await DeleteMeasure(cvgTranId);
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
        data.cvgDate = selectedDate
        data.user_updated = 'Activex'
        setSaveStatus(true)
        //console.log(data)
        if (cvgTranId === null) {
            const measure = await CreateMeasure(data);
            //console.log(measure)
            if (measure) {
                setSaveStatus(false)
                setaddStatus('edit')
                setcvgTranId(measure.cvgTranId)
            }
        }
        else {
            data.cvgTranId = cvgTranId
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
            {reTurnData != '' && <Card>
                <SuiBox p={2} mb={0} display="flex" justifyContent="space-between">
                    <SuiBox textAlign="left">
                        {cvgTranId === null ? <SuiTypography variant="h5" fontWeight="medium">
                            เพิ่มข้อมูล{title}
                        </SuiTypography> : <SuiTypography variant="h5" fontWeight="medium">
                            แก้ไขข้อมูล{title}
                        </SuiTypography>}
                    </SuiBox>
                    <SuiBox display="flex" justifyContent="center" m={1} p={0}>
                        {saveStatus ? <SuiBox textAlign="center">
                            <SuiTypography variant="h5" fontWeight="medium">
                                กำลังบันทึกข้อมูล...
                            </SuiTypography>
                        </SuiBox> :
                            <SuiBox display="flex" justifyContent="center">
                                {cvgTranId === null || addStatus == 'add' ?
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
                    <p>{cvgTranId} {addStatus} {checkStaffStatus}</p>
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
                                        วันที่ผสม
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="วันที่ผสม" disabled value={maDate} />
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเลขน้ำเชื้อ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput type="text" placeholder="หมายเลขน้ำเชื้อ" disabled value={maSemenId} />
                            </SuiBox>
                        </SuiBox>
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        วันที่คลอด
                                    </SuiTypography>
                                </SuiBox>
                                <SuiBox display="flex" justifyContent="space-between">
                                    <SuiInput type="text" placeholder="วันที่คลอด" value={cvgDate} {...register("cvgDate", { required: true, maxLength: 10 })}
                                        disabled={cvgTranId === null || addStatus == 'add' ? false : true}
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
                            {/*<SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        น้ำหนัก
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput {...register("gWeight", { required: true, min: 10, max: 100 })} type="number" placeholder="น้ำหนัก" value={gWeight} onChange={e => setgWeight(e.target.value)}
                                    disabled={cvgTranId === null || addStatus == 'add' ? false : true}
                                />
                    </SuiBox>*/}
                        </SuiBox>
                        {/*<SuiBox justifyContent="space-between">
                            <SuiBox mb={2}>
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        หมายเหตุ
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput {...register("gRemark", { pattern: /^[ก-๏\sA-Za-z]+$/i, maxLength: 50 })} type="text" placeholder="หมายเหตุ" value={gRemark} onChange={e => setgRemark(e.target.value)}
                                    disabled={cvcvgTranId === null || addStatus == 'add' ? false : true}
                                />
                            </SuiBox>
                </SuiBox>*/}
                        <SuiBox display="flex" justifyContent="space-between">
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ลูกตัวที่1
                                    </SuiTypography>
                                </SuiBox>
                                <Select
                                    value={firstChild}
                                    disabled={cvgTranId === null || addStatus == 'add' ? false : true}
                                    onChange={e => setfirstChild(e.target.value)}
                                >
                                    <MenuItem value={"0"}><em>None</em></MenuItem>
                                    <MenuItem value={"M"}>ตัวผู้</MenuItem>
                                    <MenuItem value={"F"}>ตัวเมีย</MenuItem>
                                </Select>
                            </SuiBox>
                            <SuiBox mb={2} width="48%">
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography component="label" variant="caption" fontWeight="bold">
                                        ลูกตัวที่2
                                    </SuiTypography>
                                </SuiBox>
                                <Select
                                    value={secondChild}
                                    disabled={cvgTranId === null || addStatus == 'add' ? false : true}
                                    onChange={e => setSecondChild(e.target.value)}
                                >
                                    <MenuItem value={"0"}><em>None</em></MenuItem>
                                    <MenuItem value={"M"}>ตัวผู้</MenuItem>
                                    <MenuItem value={"F"}>ตัวเมีย</MenuItem>
                                </Select>
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
