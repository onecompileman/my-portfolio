export interface Project {
    name: string;
    role: string;
    techs: string;
    description: string;
    images: { height: number, width: number, url: string }[];
}