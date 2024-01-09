import path from "path";
import { IBinary, IDirectory, Helper } from "../base";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        if (args.length > 1) {
            const dir = env.wd.find(path.join(env.wd.toPath(), args[1]));
            if (dir) {
                return (dir as IDirectory).childs.map(a => a.name).join(", ")
            }
            return "Path isn't correct!"
        }
        return env.wd.childs.map(a => a.name).join(", ") + "\n"
    }
}

export default Command