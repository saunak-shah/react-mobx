import moment from "moment";
import React from "react";
import { message } from "antd";
import countryList from "./countries";
import Video from "assets/images/video.svg";
import PDF from "assets/images/pdf.svg";
import DOC from "assets/images/doc.svg";
import TXT from "assets/images/txt.svg";
import CSV from "assets/images/csv.svg";
import EXCEL from "assets/images/excel.svg";
import IMG from "assets/images/img.svg";

export const capitalizeFirstLetter = (string) => {
  return string && typeof string === "string"
    ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    : string;
};

export const dateFormatter = (DDMMYYYY, format = "DD-MM-YYYY hh:mm A") => {
  return moment(new Date(DDMMYYYY)).format(format);
};

export const showDurationStatus = (activity, Duration) => {
  try {
    if (activity || activity === 0) {
      return (
        <span
          style={{
            color: Duration[activity].color,
          }}
          title={Duration[activity].key}
        >
          {Duration[activity].key}
        </span>
      );
    }
  } catch (err) {
    message.error("color not found");
  }
};

export const dateTimeFormatter = (
  DDMMYYYY,
  format = {
    sameDay: "[Today] hh:mm A",
    lastDay: `[Yesterday] hh:mm A`,
    lastWeek: "DD-MM-YYYY hh:mm A",
    sameElse: "DD-MM-YYYY hh:mm A",
  }
) => {
  return moment(DDMMYYYY).calendar(null, format);
};
export const dateTimeFormatter2 = (
  DDMMYYYY,
  format = {
    sameDay: "[Today]",
    lastDay: `[Yesterday]`,
    lastWeek: "DD-MM-YYYY",
    sameElse: "DD-MM-YYYY",
  }
) => {
  return moment(DDMMYYYY).calendar(null, format);
};

export const downloadURL = (uri, name) => {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const objToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => object[key] && formData.append(key, object[key]));
  return formData;
};

export const formatCurrency = (n, currency) => {
  return `${currency} ${n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}`;
};

export const hideMoreText = (text, isText = false, substring = 25) => {
  return typeof text === "string" && text.length > substring ? (
    isText ? (
      `${text.substring(0, substring)}...`
    ) : (
      <span title={text}>{text.substring(0, substring)}...</span>
    )
  ) : (
    text
  );
};

export const daysInMonth = (date) => {
  let month = moment(date).format("MM");
  let year = moment(date).format("YYYY");
  console.log("month", month, "year", year);

  return new Date(year, month, 0).getDate();
};

export const disableFutureDate = (current) => {
  return current && current > moment().endOf("day");
};
export const urltoFile = (url, filename, mimeType) => {
  return fetch(url)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((buf) => {
      let blob = new Blob([buf], { type: mimeType });
      blob.name = filename;
      return blob;
    })
    .catch((err) => {
      console.error("urltoFile", err);
    });
};

export const getQueryByAccessControl = (accessCode, isObj = false) => {
  const obj = {
    allAccess: false,
    createWorkOrderTeam: false,
    approveWorkOrderTeam: false,
    assignmentWorkOrderTeam: false,
    quoteApprovalTeam: false,
    technicianTeam: false,
    financeTeam: false,
    viewOnly: false,
  };
  for (const x in accessCode) {
    switch (accessCode[x].group_id) {
      case 0:
        obj.allAccess = true;
        break;
      case 1:
        obj.createWorkOrderTeam = true;
        break;
      case 2:
        obj.approveWorkOrderTeam = true;
        break;
      case 3:
        obj.assignmentWorkOrderTeam = true;
        break;
      case 4:
        obj.quoteApprovalTeam = true;
        break;
      case 5:
        obj.technicianTeam = true;
        break;
      case 6:
        obj.financeTeam = true;
        break;
      case 7:
        obj.viewOnly = true;
        break;
      default:
    }
  }
  if (isObj) {
    return obj;
  }
  const statusArr = getcomplainStatus(obj);
  return statusArr;
};

export const getcomplainStatus = (obj) => {
  let arr = [];
  // let allStatus;
  if (obj.allAccess) {
    const status = [1, 24, 8, 9, 13, 2, 3, 4, 5, 21, 22, 23];
    arr = [...new Set([...arr, ...status])];
    return arr;
  } else if (obj.viewOnly) {
    let status = [1, 24, 9, 8, 13, 2, 3, 4, 5, 21, 22, 23];
    arr = [...new Set([...arr, ...status])];
    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }
    return arr;
  } else if (obj.createWorkOrderTeam) {
    let status = [1, 24, 8, 9, 13, 2, 3, 4, 5, 21, 22, 23];
    arr = [...new Set([...arr, ...status])];

    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }

    return arr;
  } else if (obj.approveWorkOrderTeam) {
    let status = [1, 24, 8, 9, 13, 2, 3, 4, 5, 21, 22, 23];
    arr = [...new Set([...arr, ...status])];

    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }
    return arr;
  } else if (obj.assignmentWorkOrderTeam) {
    let status = [24, 8, 9, 13, 2, 3, 4, 5, 21, 22, 23];
    arr = [...new Set([...arr, ...status])];
    if (obj.approveWorkOrderTeam) {
      status = [1];
      arr = [...new Set([...arr, ...status])];
    }

    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }
    return arr;
  } else if (obj.quoteApprovalTeam) {
    let status = [21, 23];
    arr = [...new Set([...arr, ...status])];

    if (obj.technicianTeam) {
      status = [24, 2, 8, 9, 3, 4, 5];
      arr = [...new Set([...arr, ...status])];
    }

    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }
    return arr;
  } else if (obj.technicianTeam) {
    let status = [24, 2, 8, 9, 3, 4, 5];
    arr = [...new Set([...arr, ...status])];
    if (obj.financeTeam) {
      status = [9];
      arr = [...new Set([...arr, ...status])];
    }
    if (obj.createWorkOrderTeam) {
      status = [1, 24, 13, 2, 21, 22, 23];
      arr = [...new Set([...arr, ...status])];
    }
    return arr;
  } else if (obj.financeTeam) {
    const status = [9];
    arr = [...new Set([...arr, ...status])];
    return arr;
  } else {
    return arr;
  }
};

export const getDialCodeFromCountryCode = (CODE) => {
  let DialCode = "";
  if (Boolean(CODE)) {
    if (typeof CODE === "string") {
      const index = countryList.findIndex((item) => item.code.toUpperCase() === CODE.toUpperCase());
      if (index > -1) {
        DialCode = countryList[index].dial_code;
      }
    }
  }
  return DialCode;
};

export const calendarRanges = (props) => {
  const {
    intl: { formatMessage },
  } = props;
  const range = {};
  range[formatMessage({ id: "today" })] = [moment().startOf("day"), moment().endOf("day")];
  range[formatMessage({ id: "yesterday" })] = [
    moment().subtract(1, "days").startOf("day"),
    moment().subtract(1, "days").endOf("day"),
  ];
  range[formatMessage({ id: "last7Days" })] = [
    moment().subtract(7, "days").startOf("day"),
    moment().subtract(1, "days").endOf("day"),
  ];
  range[formatMessage({ id: "last30Days" })] = [
    moment().subtract(30, "days").startOf("day"),
    moment().subtract(1, "days").endOf("day"),
  ];
  range[formatMessage({ id: "currentMonth" })] = [
    moment().startOf("month"),
    moment().subtract(1, "days").endOf("day"),
  ];
  range[formatMessage({ id: "lastMonth" })] = [
    moment().subtract(1, "month").startOf("month"),
    moment().subtract(1, "month").endOf("month"),
  ];
  range[formatMessage({ id: "last3Months" })] = [
    moment().subtract(3, "month").startOf("month"),
    moment().subtract(1, "month").endOf("month"),
  ];
  return range;
};

export const getRandomPassword = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const string_length = 6;
  let randomstring = "";
  for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};

export const removeDuplicateData = (arrayList = [], keys = []) => {
  return arrayList.filter(
    ((s) => (o) => ((k) => !s.has(k) && s.add(k))(keys.map((k) => o[k]).join("|")))(new Set())
  );
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};
export const fileFormatFunc = (fileType, record) => {
  console.log("=======filetype", fileType);
  if (fileType === "svg") {
    return <img src={IMG} alt={fileType} height={30} />;
  } else if (
    fileType === "Image" ||
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg"
  ) {
    return <img src={record.url} alt="fileType" height={30} />;
  } else if (fileType === "Pdf" || fileType === "pdf") {
    return <img src={PDF} alt="pdf" height={30} />;
  } else if (fileType === "Txt" || fileType === "txt") {
    return <img src={TXT} alt="txt" height={30} />;
  } else if (fileType === "Csv" || fileType === "csv") {
    return <img src={CSV} alt="csv" height={30} />;
  } else if (
    fileType === "Doc" ||
    fileType === "Docx" ||
    fileType === "docx" ||
    fileType === "doc"
  ) {
    return <img src={DOC} alt="doc" height={30} />;
  } else if (
    fileType === "Xls" ||
    fileType === "xls" ||
    fileType === "Xlsx" ||
    fileType === "xlsx"
  ) {
    return <img src={EXCEL} alt="excel" height={30} />;
  } else if (fileType === "Video" || fileType === "mp4") {
    return <img src={Video} alt="video" height={30} />;
  } else {
    return "";
  }
};
