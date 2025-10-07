"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";

interface DateRangePickerProps {
  start: string;
  end: string;
}

const DateRangePicker = ({ start, end }: DateRangePickerProps) => {

const searchParams = useSearchParams();
const router = useRouter();



  const startDate = searchParams.get("start") || start;
  const endDate = searchParams.get("end") || end;

  const handleDateChange = (type: "start" | "end", value:string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(type, value)
    router.push(`/admin?${newParams.toString()}`)
  };
  

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div>
          <Label>Start</Label>
          <Input
            type="date"
            defaultValue={startDate}
            max={endDate}
            onChange={(event) => handleDateChange("start", event.target.value)}
          />
        </div>
        <div>
          <Label>End</Label>
          <Input
            type="date"
            defaultValue={endDate}
            min={startDate}
            onChange={(event) => handleDateChange("end", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
