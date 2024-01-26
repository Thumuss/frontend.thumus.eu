import { IBinary, IDirectory, Helper } from "../base";
import path from "path";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        const paths = path.join(env.wd.toPath(), args[1]);
        const newWd = env.wd.find(paths);
        if (!newWd) return "cd: path doesn't exist"; 
        if (!(newWd instanceof IDirectory)) return "cd: path isn't a directory"; 
        env.wd = env.wd.find(paths) as IDirectory || env.wd;
        return ""
    }
}

export default Command