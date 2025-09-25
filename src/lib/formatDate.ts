import dayjs from "@/lib/dayjs";

const formatData = (date:Date | null | undefined) => {
    if(!date) {
        return '-'
    }
    return dayjs(date).format('DD/MM/YYYY HH:mm:ss');
    
}

export default formatData;


