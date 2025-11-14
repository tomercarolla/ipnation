import {useMemo} from "react";

export function useTimeFormatter() {
    return useMemo(() => {
        return {
            format: (value: string) => {
                if (!value) return "";

                const timePart = value.split("T")[1];

                if (!timePart) return "";

                return timePart.replace(/([+-]\d{2}:\d{2}|Z)$/i, "");
            },
        };
    }, []);
}