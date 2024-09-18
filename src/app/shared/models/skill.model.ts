export interface SkillGroup {
    skills: Skill[];
    groupName: string;
}

export interface Skill {
    name: string;
    years: number;
    projects: number;
    rate: number;
}