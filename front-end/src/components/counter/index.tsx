import {CounterWrapper, Title} from "./styles";
import {EventType} from "../../types";

export const Counter = ({type, count}: {type: EventType, count: number}) => {
    return (
        <CounterWrapper>
            <Title>{type}: {count}</Title>
        </CounterWrapper>
    )
}
export default Counter;