export interface IBusinessarea extends IBusinessareaUpdate {
    id?: number;
}

export interface IBusinessareaUpdate {
    name?: string;
}

export interface IBusinessareaCreate extends IBusinessareaUpdate {
    name: string;
}
