import path from "path"
import { Bridge } from "./interpretor/src/types";

enum IPermission {
    Read,
    Write,
    Execute
}

enum ITypes {
    Directory,
    Link,
    Binary,
    Text,
}

type TFile = IObject | IBinary | ILink | IText
type TObject = TFile | IDirectory

let id = 0;
//TODO: Impl nextID
abstract class IObject {
    name: string;
    parent: IDirectory | null;
    id: number
    constructor(name: string, parent: IDirectory | null) {
        this.id = id;
        id++;
        this.name = name
        this.parent = parent;
    }

    move(parent: IDirectory) {
        this.parent = parent;
    }

    toJSON() {
        return {
            name: this.name,
            type: this.type,
            id: this.id,
        }
    }

    setID(id: number) {
        this.id = id
    }

    toPath(): string {
        if (this.name == "/") {
            return "/"
        }
        return this._toPath()
    }

    _toPath(): string {
        if (this.name == "/") {
            return ""
        }
        return this.parent?._toPath() + `/${this.name}`;
    }

    find(paths: string): TObject | undefined {
        if (paths.endsWith("/") && paths.length !== 1) {
            paths = paths.slice(0, -1)
        }
        if (paths.startsWith(".")) {
            paths = path.resolve(this.toPath(), paths)
        }
        const findD = this.findDown(paths, this.toPath());
        if(findD) {
            return findD;
        }

        //const findU = this.findUp(paths, this.toPath());
        return undefined;
    }

    /*findUp(paths: string): TObject | undefined {
        if (paths === this.toPath()) return this;
        if (this.name !== "/") {
            return this.parent?.findUp(paths) ;
        }
        return undefined
    }*/

    findDown(paths: string, origin: string): TObject | undefined {
        if (paths === this.toPath()) return this;
        if (this.type === ITypes.Directory) {
            for(const dir of (this as unknown as IDirectory).childs.filter(a => a.toPath() != origin)) {
                const belike = dir.findDown(paths, this.toPath());
                if (belike) {
                    return belike;
                }
            }
        }
        if (this.name == "/") {
            return undefined
        }
        return this.parent?.toPath() != origin ? this.parent?.findDown(paths, this.toPath()) : undefined
    }

    abstract get type(): ITypes;
}

abstract class IBinary extends IObject {
    
    constructor(name: string, parent: IDirectory | null) {
        super(name, parent);
    }

    get type(): ITypes {
        return ITypes.Binary;
    }

    abstract execute(args: string[], envir: Helper): string;
}

class ILink extends IObject {
    linkTo: TObject | undefined;
    constructor(name: string, parent: IDirectory | null, linkTo: TObject | undefined) {
        super(name, parent);
        this.linkTo = linkTo
    }

    get type(): ITypes {
        return ITypes.Link;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            linkTo: this.linkTo?.id
        }
    }
}

class IText extends IObject {
    content: string;
    constructor(name: string, parent: IDirectory | null, content: string) {
        super(name, parent);
        this.content = content
    }

    get type(): ITypes {
        return ITypes.Text;
    }
}

class IDirectory extends IObject{
    childs: TObject[];

    constructor(name: string, parent: IDirectory | null, childs: TObject[]) {
        super(name, parent);
        this.childs = childs;
    }

    get type(): ITypes {
        return ITypes.Directory;
    }

    toJSON(): any {
        return {
            ...super.toJSON(),
            childs: this.childs.map(a => a.toJSON())
        }
    }
}
const findAfter: [ILink, string][] = []
function createFromJSON(json: any): TObject {
    let obj: IDirectory | IText | ILink | null = null;
    if (json.type == ITypes.Directory) {
        obj = new IDirectory(json.name, null, json.childs.map(createFromJSON)) as IDirectory
        if (json.name === "/") {
            obj.parent = obj;
        }
        obj.childs.forEach(a => a.parent = (obj as IDirectory));
        
    }
    if (json.type == ITypes.Text) {
        obj = new IText(json.name, null, json.content);
    }

    if(json.type == ITypes.Link) {
        obj = new ILink(json.name, null, undefined);
        findAfter.push([obj, json.linkTo]);
    }
    //obj?.setID(json.id)
    if (json.name == "/") {
        findAfter.forEach(a => {
            const b = a[0].find(a[1]);
            a[0].linkTo = b;
        })
    }
    return obj as TObject;
}

interface env {
    [name: string]: string;
}


interface Helper {
    bridge: Bridge;
    env: env,
    //bridge: bridge,
    root: IDirectory,
    wd: IDirectory,
}

export { IDirectory, ILink, IBinary, IText, IObject, ITypes, IPermission, createFromJSON,  };
export type { TFile, TObject, Helper };
