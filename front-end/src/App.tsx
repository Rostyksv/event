import React, {useEffect, useState} from 'react';
import './App.css';
import Table from "./components/table";
import {useDispatch, useSelector} from "react-redux";
import actions from "./redux/events/actions";
import Counter from "./components/counter";
import {TableWrapper, Wrapper} from "./styles";
import socket from "./websocket";
import {RootState} from "./redux/store";

const App = () => {
    const [ignoreCount, setIgnoreCount] = useState<number>(0);
    const [reportCount, setReportCount] = useState<number>(0);

    const dispatch = useDispatch();
    const {events, loading} = useSelector((state: RootState) => state.events);

    useEffect(() => {
        dispatch(actions.loadEvents());

        socket.addEventListener('message', (event) => {
            const {type, data} = JSON.parse(event.data) || {};
            if(type === 'ignore') {
                setIgnoreCount(data);
            } else if(type === 'report') {
                setReportCount(data);
            }
        });
    }, [])

    if(loading) {
        return <div>loading...</div>
    }

    return (
        <div className="App">
            <Wrapper>
                <Counter type='ignore' count={ignoreCount}/>
                <Counter type='report' count={reportCount}/>
                <TableWrapper>
                    <Table events={events}/>
                </TableWrapper>
            </Wrapper>
        </div>
    );
}

export default App;
