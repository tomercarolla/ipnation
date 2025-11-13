import {useState} from "react";
import {FiPlus} from "react-icons/fi";
import {v4 as uuid} from "uuid";
import './Lookup.css';
import {Button} from "@/ui";
import type {Row} from "./types";
import {List} from "./components/List";


export function Lookup() {
    const [rows, setRows] = useState<Row[]>([{id: uuid(), value: ''}]);

    const addRow = () => {
        setRows(prev => [...prev, {id: uuid(), value: ''}]);
    }

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

                <List rows={rows} setRows={setRows}/>
            </div>
        </section>
    );
}