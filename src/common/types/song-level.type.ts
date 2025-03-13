import { ObjectWithid } from './object-with-id.type';
import { SongFolder } from "./song.type";

export interface SongLevel extends ObjectWithid {
    playedLast?: string;
    proficiency?: number;
    song?: SongFolder;
}