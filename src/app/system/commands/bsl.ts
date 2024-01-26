import { IBinary, IDirectory, Helper } from "../base";
import { evaluate, lexer, parse, run, types } from "../interpretor/build/runner";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        run(args.slice(1).join(" "), env.bridge);
        return "";
    }
}

export default Command