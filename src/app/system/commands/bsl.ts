import { IBinary, IDirectory, Helper } from "../base";
import { evaluate, lexer, parse, types } from "../interpretor/build/runner";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        //const lex = lexer(args.slice(1).join(" "));
        //const parser = parse(lex);
        return "";
        //return evaluate(parser.parsed[0], env.bridge)?.toString() || "null";
    }
}

export default Command