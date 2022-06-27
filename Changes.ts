import * as data from "./changes.json";

interface Data {
  default: Array<Version>
}

interface Version {
  date: string;
  description: string;
  added: Array<string>;
  updated: Array<string>;
  removed: Array<string>;
}

const versions: Array<Version> = (JSON.parse(JSON.stringify(data)) as Data).default;

export { versions };
