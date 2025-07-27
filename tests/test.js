import { DocNodeSchema } from "../dist/__generated__/schema.js";
import { adf } from "./adf.js";

const test = DocNodeSchema.parse(adf);

console.log(JSON.stringify(test, null, 2));
