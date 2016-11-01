export interface IInstance extends IInstanceUpdate {
    id?: number;
}

export interface IInstanceUpdate {
    name?: string;
}

export interface IInstanceCreate extends IInstanceUpdate {
    name: string;
}
