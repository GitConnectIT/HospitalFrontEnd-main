
export default interface IMenuResponse{

    children?: IMenuResponse[];
    id: number;
    title: string;
    route: string;
    icon: string;
    collapisble?: boolean;
    caption?: string;
}