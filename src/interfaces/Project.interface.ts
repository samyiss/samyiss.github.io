import {Author} from "./Author.interface";
import {Tag} from "./Tag.interface";
import {Picture} from "./Picture.interface";

export interface Project {
  project_id: number,
  name: string,
  abbreviation: string,
  date_project: string,
  short_description: string,
  detailed_description: string,
  authors: Author[],
  tags: Tag[],
  pictures: Picture[],
  giturl: string,
  apiurl: string,
  state: boolean
}
