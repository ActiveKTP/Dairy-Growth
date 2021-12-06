//import axios from "axios"
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
//import SuiBadge from "components/SuiBadge";

import useFetch from "controller/useFetch";

// Images
import cowpic from "assets/images/cow-fcv.png";
//import logoSlack from "assets/images/small-logos/logo-slack.svg";
import ScaleIcon from '@mui/icons-material/Scale';
import AddBoxIcon from '@mui/icons-material/AddBox';


function Author({ image, name, cowId }) {
    return (
        <SuiBox display="flex" alignItems="center" px={1} py={0.5}>
            <SuiBox mr={2}>
                <SuiAvatar src={image} alt={name} size="sm" variant="rounded" />
            </SuiBox>
            <SuiBox display="flex" flexDirection="column">
                <SuiTypography variant="button" fontWeight="medium">
                    {name}
                </SuiTypography>
                <SuiTypography variant="caption" color="secondary">
                    {cowId}
                </SuiTypography>
            </SuiBox>
        </SuiBox>
    );
}

function Function({ first, second }) {
    return (
        <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="caption" fontWeight="medium" color="text">
                {first}
            </SuiTypography>
            <SuiTypography variant="caption" color="secondary">
                {second}
            </SuiTypography>
        </SuiBox>
    );
}

function Mating({ maDate, semen }) {
    return (
        <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="caption" fontWeight="medium" color="text">
                {maDate}
            </SuiTypography>
            <SuiTypography variant="caption" color="info">
                {semen}
            </SuiTypography>
        </SuiBox>
    );
}

function Row(growths, setValueCowId) {
    const setValue = (ccowId, gTranId) => {
        setValueCowId.setCowId(ccowId);
        setValueCowId.setGstatus('04');
        setValueCowId.closeInput();
    }
    const setValue_cv = (ccowId, maTranId) => {
        setValueCowId.setCowId(ccowId);
        setValueCowId.setmaTranId(maTranId);
        setValueCowId.setGstatus('04');
        setValueCowId.closeInput_cv();
    }
    const row = growths.map((growth) => ({
        ข้อมูลโค: <Author image={cowpic} name={growth.ccowName} cowId={growth.ccowId} />,
        ข้อมูการผสม: <Mating maDate={growth.maDate_th === null ? "" : growth.maDate_th} semen={growth.maSemenId === null ? "" : growth.maSemenId} />,
        กำหนดคลอด: <Function first={growth.predicCalvingDate_th} second={growth.maPregResult} />,
        ฟาร์ม: <Function first={growth.fFarmId} second={growth.fName} />,
        อำเภอ: <Function first={growth.fAmphurName} second={growth.fProvinceName} />,
        วันคลอด: <SuiTypography variant="button" color="text" fontWeight="medium">{null === growth.cvgDate_th ? "" : growth.cvgDate_th}</SuiTypography>,
        action_cv: (<AddBoxIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" color={null === growth.cvgTranId ? "disabled" : "success"}
            onClick={event => setValue_cv(growth.ccowId, growth.maTranId)}
        />),
        น้ำหนัก: <SuiTypography variant="button" color="text" fontWeight="medium">{null === growth.gWeight ? "" : growth.gWeight}</SuiTypography>,
        action: (<ScaleIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" color={null === growth.gTranId ? "disabled" : "success"}
            onClick={event => setValue(growth.ccowId, growth.gTranId)}
        />),
    }))
    return row;
}

export default function Growth_cv(props, inputData_cv) {
    //console.log(props)
    //console.log(inputData_cv)
    const { data: growths, isPending, error } = useFetch('https://localhost:5001/api/growth/farm/cow/cv/05/2019/10?_start=0&_limit=5', props.refreshData);
    const growthsList = Row(growths, props);

    return {
        columns: [
            { name: "ข้อมูลโค", align: "left" },
            { name: "ข้อมูการผสม", align: "left" },
            { name: "กำหนดคลอด", align: "left" },
            { name: "ฟาร์ม", align: "left" },
            { name: "อำเภอ", align: "left" },
            { name: "วันคลอด", align: "center" },
            { name: "action_cv", align: "center" },
            { name: "น้ำหนัก", align: "center" },
            { name: "action", align: "center" },
        ],

        rows: growthsList
    }
}
