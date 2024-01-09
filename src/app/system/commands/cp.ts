import { IBinary, IDirectory, Helper } from "../base";

class Command extends IBinary{

    execute(args: string[], env: Helper): string {
        return env.wd.toPath();
    }
}

export default Command