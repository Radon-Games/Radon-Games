export default interface Game {
  title: string;
  author: string;
  description: string;
  id: string;
  tags: never[];
  type: string;
  source: string;
  size: {
    width: string;
    height: string;
  };
}
