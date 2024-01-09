import { IBinary, IDirectory, Helper } from "../base";
import path from "path";

class Command extends IBinary{

    execute(args: string[], env: Helper): string {
        const paths = path.join(env.wd.toPath(), args[1]);
        console.log(paths, env);
        env.wd = env.wd.find(paths) as IDirectory;
        return ""
    }
}

export default Command