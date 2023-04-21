export interface EventInterface {
    id: number;
    name: string;
    timestamp: string;
    severity: string;
}
export interface EventsState {
    events: EventInterface[];
}
export type EventKeys = keyof EventInterface;
export enum TheadEnum {
    id = 'id',
    name = 'name',
    timestamp = 'timestamp',
    severity = 'severity'
}

export enum EventType {
    report = 'report',
    ignore = 'ignore'
}