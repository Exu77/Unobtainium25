import { IBandMember } from './member.type';
import { ObjectWithid } from './object-with-id.type';
import { SongFolder } from "./song.type";

export interface Todo extends ObjectWithid {
    description?: string | undefined | null;
    song?: SongFolder| undefined | null;
    responsibles?: IBandMember[] | undefined | null;
}