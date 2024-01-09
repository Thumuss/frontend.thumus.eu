import path from "path";
import { IBinary, IDirectory, Helper, IText } from "../base";

class Command extends IBinary{

    execute(args: string[], env: Helper): string {
        if (args.length < 2) {
            return "Usage: cat <FILE>.."
        }

        let content = "";
        for(const arg of args.slice(1)) {
            const textObj = env.wd.find(path.join(env.wd.toPath(), arg))
            if (textObj) {
                content += (textObj as IText).content;
            }
        }
        return content
    }
}

export default Command