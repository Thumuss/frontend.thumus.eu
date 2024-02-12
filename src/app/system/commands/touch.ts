import { IBinary, IDirectory, Helper, IText } from "../base";
import path from "path"
class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        for(const arg of args.slice(1)) {
            const str = path.join(env.wd.toPath(), arg);
            const parent = path.dirname(str);
            const obj = env.wd.find(parent);
            if (!obj || !(obj instanceof IDirectory)) {
                return "";
            }
            obj.add(new IText(path.basename(str), obj, ""));
        }
        return ""
    }
}

export default Command