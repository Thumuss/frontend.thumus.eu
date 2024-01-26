import { IBinary, IDirectory, Helper } from "../base";
import path from "path";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        env.bridge.out()
        return ""
    }
}

export default Command