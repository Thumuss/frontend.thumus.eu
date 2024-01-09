import { IBinary, IDirectory, Helper } from "../base";

class Command extends IBinary{
    execute(args: string[], env: Helper): string {
        let str = ""
        for(const paths of env.env.PATH.split(";")) {
            str += env.bridge.exec(`ls ${paths}`.split(" "))
        }
        return str;
    }
}

export default Command