export type TagRequest = {
  name: string;
};

export type TagResponse = {
  tagId: string;
  name: string;
};

export type Tag = TagResponse;
export type TagList = Tag[];
