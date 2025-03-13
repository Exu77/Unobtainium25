export interface IBandMember {
    name: string
};
export interface IBandMemberClass {
    [index: string]: IBandMember;
}