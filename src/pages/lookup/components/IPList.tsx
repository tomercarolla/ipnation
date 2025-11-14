import type {Row} from "../types";
import type {Dispatch, SetStateAction} from "react";
import {useMutation} from "@tanstack/react-query";
import {fetchIpCountry, type IpApiResponse} from "@/api";
import {useTimeFormatter} from "@/utils/formatters";
import {Input} from "@/ui/Input";
import {Loader} from "@/ui/Loader";
import {isValidIp} from "@/utils";

type ListProps = {
    rows: Row[];
    setRows: Dispatch<SetStateAction<Row[]>>;
}

export function IPList({rows, setRows}: ListProps) {
    const timeFormatter = useTimeFormatter();
    const getCountryMutation = useMutation<IpApiResponse, Error, { id: string, ip: string }>({
        mutationFn: ({ip}) => fetchIpCountry(ip),
        onSuccess: (data, {id}) => {
            setRows(prev =>
                prev.map(row => row.id === id ? {
                        ...row, result: {
                            country: data.country,
                            flag: data.flag.img,
                            time: data.timezone.current_time
                        }
                    } : row
                )
            )
        },
        onError: (error, {id}) => {
            setRows(prev =>
                prev.map(row => row.id === id ? {...row, error: error.message} : row)
            )
        }
    });

    const handleBlur = (id: string, value: string) => {
        if (!value) {
            setRows(prev => prev.map(row => row.id === id ? {...row, result: undefined, error: undefined} : row));
            return;
        }

        if (!isValidIp(value)) {
            setRows(prev => prev.map(row => row.id === id ? {
                ...row,
                result: undefined,
                error: 'Invalid IP address'
            } : row));
        } else {
            setRows(prev => prev.map(row => row.id === id ? {...row, error: undefined} : row));
            getCountryMutation.mutate({id, ip: value});
        }
    }

    return (
        <div className="list-container">
            <ul className='list'>
                {rows.map(({id, value, error, result}, index) => (
                    <li className='list-item' key={id}>
                        <div className="counter">{index + 1}</div>

                        <div className='input-container'>
                            <label htmlFor={`ip-${id}`} className='sr-only'>IP Address #{index + 1}</label>

                            <Input id={`ip-${id}`}
                                   disabled={getCountryMutation.isPending && getCountryMutation.variables?.id === id}
                                   type="text" placeholder='Enter IP' defaultValue={value}
                                   onBlur={(e) => handleBlur(id, e.target.value)}/>
                        </div>

                        <div className="flag-container">
                            {error && (<span className='error-text'>{error}</span>)}
                            {getCountryMutation.isPending && getCountryMutation.variables?.id === id && (
                                <Loader/>
                            )}
                            {result?.flag && (
                                <div className='img-container'>
                                    <img src={result.flag} alt={`Flag of ${result.country}`}/>
                                </div>
                            )}
                            {result?.time && (
                                <span className='time'>{timeFormatter.format(result.time)}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}