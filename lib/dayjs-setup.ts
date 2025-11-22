import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// 🔥 Set default timezone to IST
dayjs.tz.setDefault("Asia/Kolkata");

export default dayjs;
