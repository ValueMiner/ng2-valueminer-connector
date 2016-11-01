export interface IModel extends IModelUpdate {
    id: number;
}

export interface IModelUpdate {
    name?: string;
    color?: string;
}

export interface IModelCreate extends IModelUpdate {
    name: string;
}
