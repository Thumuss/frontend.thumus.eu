import path from "path";
import { IBinary, IDirectory, Helper } from "../base";

class Command extends IBinary {
  execute(args: string[], env: Helper): string {
    console.log(args);
    if (args.length < 2) {
      return "Usage: mv <file|dir> <file|dir>";
    }

    const files = args.slice(1, -1).map((a) => env.wd.find(a));
    const thing = args.at(-1) as string;
    const isDir = thing.endsWith("/");
    if (!isDir) {
      files[0]?.move(
        env.wd.find(path.join(env.wd.toPath(), thing))?.parent as IDirectory
      );
    }

    return "";
  }
}

export default Command;
