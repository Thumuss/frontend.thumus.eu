import type { IBinary, IDirectory } from "./base";
import * as commands from "./commands";

const keys: (keyof typeof commands)[] = Object.keys(
  commands
) as (keyof typeof commands)[];

const val = (root: IDirectory) => {
  const bin = root.find("/bin/") as IDirectory;
  keys.forEach((name) => {
    const command = new commands[name](name, bin);
    bin.childs.push(command);
  });
};

export default val;
