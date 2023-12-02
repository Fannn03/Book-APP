export interface QueryBookInterface {
  title?: string,
  minYear?: number,
  maxYear?: number,
  minPage?: number,
  maxPage?: number,
  sortByTitle?: sortByTitle
}

export enum sortByTitle {
  desc,
  asc
}