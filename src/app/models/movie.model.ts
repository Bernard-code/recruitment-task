import { GenreType } from './genre-type.enum';

export interface Movie {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: GenreType[] | string[];
  rate: string;
  length: string;
  img: string;
}
