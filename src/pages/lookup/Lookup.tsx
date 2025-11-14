import {useState} from "react";
import {FiPlus} from "react-icons/fi";
import {v4 as uuid} from "uuid";
import './Lookup.css';
import {Button} from "@/ui";
import type {Row} from "./types";
import { IPList } from "./components/IPList";

export function Lookup() {
    const createRow = () => ({ id: uuid(), value: '' });

    const [rows, setRows] = useState<Row[]>([createRow()]);

    const addRow = () => setRows(prev => [...prev, createRow()]);

    return (
        <section className='container'>
            <div className="box">
                <div className="title-container">
                    <h1>IP Lookup</h1>
                </div>

                <div className="description">
                    <p className='text'>Enter one or more IP addresses and get their country</p>

                    <Button onClick={addRow}>
                        <FiPlus/>
                        <span>Add</span>
                    </Button>
                </div>

                <IPList rows={rows} setRows={setRows}/>
            </div>
        </section>
    );
}