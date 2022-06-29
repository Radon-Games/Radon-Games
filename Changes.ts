import * as data from "./changes.json";

const versions = JSON.parse(JSON.stringify(data)).default;

export { versions };
