import {Input} from "@/ui/Input";
import type {Row} from "../types";
import {isValidIp} from "@/utils";
import type {Dispatch, SetStateAction} from "react";

type ListProps = {
    rows: Row[];
    setRows: Dispatch<SetStateAction<Row[]>>;
}

export function List({rows, setRows}: ListProps) {

    const handleBlur = (id: string, value: string) => {
        console.log('value ', value);
        if (!value) {
            setRows(prev => prev.map(row => row.id === id ? {...row, error: undefined} : row));
            return;
        }

        if (!isValidIp(value)) {
            setRows(prev => prev.map(row => row.id === id ? {...row, error: 'Invalid IP address'} : row));
        } else {
            setRows(prev => prev.map(row => row.id === id ? {...row, error: undefined} : row));
        }
    }

    return (
        <div className="list-container">
            <ul className='list'>
                {rows.map((row, index) => (
                    <li className='list-item' key={row.id}>
                        <div className="counter">{index + 1}</div>

                        <div className='input-container'>
                            <label htmlFor={`ip-${row.id}`} className='sr-only'>IP Address #{index + 1}</label>

                            <Input id={`ip-${row.id}`}
                                   type="text" placeholder='Enter IP' defaultValue={row.value}
                                   onBlur={(e) => handleBlur(row.id, e.target.value)}/>
                        </div>

                        <div className="flag-container">
                            {row.error && (<span className='error-text'>{row.error}</span>)}
                            {/*{mutation.isPending && mutation.variables?.id === row.id && (*/}
                            {/*    <span>Loading...</span>*/}
                            {/*)}*/}
                            {/*{row.result?.flag && <img src={row.result.flag} alt="flag" />}*/}
                            {/*{row.result?.hour && <span>{row.result.hour}</span>}*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}