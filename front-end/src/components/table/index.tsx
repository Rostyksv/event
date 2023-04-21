import React, { useState } from 'react';
import Button from "../button";
import {useDispatch} from "react-redux";
import actions from "../../redux/events/actions";
import socket from "../../websocket";
import {EventKeys, EventsState, EventType, TheadEnum} from "./types";

const Table = ({ events }: EventsState) => {
    const [sortedField, setSortedField] = useState<EventKeys | null>(null);
    const [sortDirection, setSortDirection] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleSort = (field: EventKeys) => {
        if (field === sortedField) {
            // If the field is already sorted, toggle the sort direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If sorting a new field, set the sorted field and initial sort direction
            setSortedField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = sortedField ? [...events].sort((a, b) => {
        if (a[sortedField] < b[sortedField]) {
            return sortDirection === 'asc' ? -1 : 1;
        }
        if (a[sortedField] > b[sortedField]) {
            return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    }) : events;

    const handleIgnore = (id: number) => {
        dispatch(actions.deleteEvent({ type: EventType.ignore, id }));
        socket.send(JSON.stringify({ type: EventType.ignore }));
    }

    const handleReport = (id: number) => {
        dispatch(actions.deleteEvent({type: EventType.report, id}));
        socket.send(JSON.stringify({ type: EventType.report }));
    }

    return (
        <table>
            <thead>
            <tr>
                <th onClick={() => handleSort(TheadEnum.id)}>
                    ID {sortedField === TheadEnum.id && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort(TheadEnum.name)}>
                    Name {sortedField === TheadEnum.name && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort(TheadEnum.timestamp)}>
                    Timestamp {sortedField === TheadEnum.timestamp && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort(TheadEnum.severity)}>
                    Severity {sortedField === TheadEnum.severity && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
            </tr>
            </thead>
            <tbody>
            {sortedData.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.timestamp}</td>
                    <td>{item.severity}</td>
                    <td><Button text={EventType.ignore} handler={() => handleIgnore(item.id)} /></td>
                    <td><Button text={EventType.report} handler={() => handleReport(item.id)} /></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
export default Table;