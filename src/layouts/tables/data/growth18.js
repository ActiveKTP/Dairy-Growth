//import axios from "axios"
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiBadge from "components/SuiBadge";

import useFetch from "controller/useFetch";

// Images
import cowpic from "assets/images/cow-18.png";
//import logoSlack from "assets/images/small-logos/logo-slack.svg";
//import Icon from "@mui/material/Icon";
//import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

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

function Siredam({ sire, dam }) {
    return (
        <SuiBox display="flex" flexDirection="column">
            <SuiTypography variant="caption" fontWeight="medium" color="info">
                {sire}
            </SuiTypography>
            <SuiTypography variant="caption" color="primary">
                {dam}
            </SuiTypography>
        </SuiBox>
    );
}

function Row(growths, setValueCowId) {
    const setValue = (ccowId, gTranId) => {
        setValueCowId.setCowId(ccowId);
        setValueCowId.setGstatus('03');
        setValueCowId.closeInput();
    }
    const row = growths.map((growth) => ({
        ข้อมูลโค: <Author image={cowpic} name={growth.ccowName} cowId={growth.ccowId} />,
        พ่อแม่: <Siredam sire={null === growth.cSireId ? "" : growth.cSireId} dam={null === growth.cDamId ? "" : growth.cDamId} />,
        วันเกิด: <Function first={growth.cBirthDate_th} second={growth.age_day} />,
        ฟาร์ม: <Function first={growth.fFarmId} second={growth.fName} />,
        อำเภอ: <Function first={growth.fAmphurName} second={growth.fProvinceName} />,
        น้ำหนัก: <SuiTypography variant="button" color="text" fontWeight="medium">{null === growth.gWeight ? "" : growth.gWeight}</SuiTypography>,
        action: (<MonitorWeightIcon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" color={null === growth.gTranId ? "disabled" : "success"}
            onClick={event => setValue(growth.ccowId, growth.gTranId)}
        />),
    }))
    return row;
}

export default function Growth18(props) {

    const { data: growths, isPending, error } = useFetch('https://localhost:5001/api/growth/farm/cow/03/05/2019/10', props.inputData);
    const growthsList = Row(growths, props);

    return {
        columns: [
            { name: "ข้อมูลโค", align: "left" },
            { name: "พ่อแม่", align: "left" },
            { name: "วันเกิด", align: "left" },
            { name: "ฟาร์ม", align: "left" },
            { name: "อำเภอ", align: "left" },
            { name: "น้ำหนัก", align: "center" },
            { name: "action", align: "center" },
        ],

        rows: growthsList
    }
}
