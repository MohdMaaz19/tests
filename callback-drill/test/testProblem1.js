import { createAndDeleteFile} from "../problem1.js";
import path from "path"

const dirPath = path.join("./output/","randomDirectory");

createAndDeleteFile(dirPath);

