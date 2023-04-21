import {ButtonWrapper} from './styles';
import {EventType} from "../../types";

export type ButtonType = {
    text: EventType,
    handler: any;
}
const Button = ({text, handler}: ButtonType) => {
    return (
        <ButtonWrapper onClick={handler}>{text}</ButtonWrapper>
    )
}
export default Button;