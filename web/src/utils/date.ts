
const todayYesterdayOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
};

const lastWeekOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit"
};
const farAwayOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: "2-digit",
    minute: "2-digit"
};

export const toDateStr = (datestr: string): string => {
    // todo translate
    let date = new Date(datestr);
    if (isToday(date)) {
        return "Dnes v " + date.toLocaleTimeString("cs-CS", todayYesterdayOptions);
    }
    if (isYesterday(date)) {
        return "Včera v " + date.toLocaleTimeString("cs-CS", todayYesterdayOptions);
    }
    if (wasDuringLastWeek(date)) {
        return date.toLocaleDateString("cs-CS", lastWeekOptions);
    }
    return date.toLocaleDateString("cs-CS", farAwayOptions)
};

export const wasDuringLastWeek = (someDate: Date) => {
    const todayTime = new Date().getTime();
    const someTime = someDate.getTime();
    const tenDays = 60*60*24*10;
    return Math.abs(todayTime-someTime) < tenDays;
}

export const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
}

export const isYesterday = (someDate: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.getDate() === someDate.getDate() &&
        yesterday.getMonth() === someDate.getMonth() &&
        yesterday.getFullYear() === someDate.getFullYear()
}