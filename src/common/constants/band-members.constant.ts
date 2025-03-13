import { IBandMember } from './../types/member.type';
export const BAND_MEMBERS: IBandMember[] = [
    {name:"Christian"},
    {name:"Dieter"},
    {name:"Ritchie"},
    {name:"Simon"},
];
export function COMPARE_BAND_MEMBERS(o1: IBandMember, o2: IBandMember): boolean {
    // if possible compare by object's name property - and not by reference.
    return o1?.name === o2?.name;
  }