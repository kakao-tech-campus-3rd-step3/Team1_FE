export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 2;

export const A4 = {
  WIDTH: 580,
  HEIGHT: 580 * 1.414,
};

export interface Position {
  x: number;
  y: number;
}

export interface Marker {
  id: string;
  page: number;
  x: number;
  y: number;
}

export interface PageSize {
  width: number;
  height: number;
}
