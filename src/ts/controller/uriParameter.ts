interface IUriParameter {
  part: string;
  maxResults: number;
  type: string;
}

export const uriParameter: IUriParameter = {
  part: "snippet",
  maxResults: 10,
  type: "video"
};
