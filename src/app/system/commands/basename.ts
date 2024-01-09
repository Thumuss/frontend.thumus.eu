import { IBinary, IDirectory, Helper } from "../base";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        return env.wd.parent?.toPath() as string;
    }
}

export default Command