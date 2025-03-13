import { ObjectWithid } from './object-with-id.type';
import { SongFolder } from "./song.type";

export interface SongLink extends ObjectWithid {
    name?: string | null;
    link?: string | null;
    song?: SongFolder | null; 
}