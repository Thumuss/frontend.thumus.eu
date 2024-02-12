import { IBinary, IDirectory, Helper, ITypes, createFromJSON } from "./base"
import commander from "./commander"
import { run } from "./interpretor/build/runner";
import type { PrimitivesJS } from "./interpretor/src/types";
const root = createFromJSON({
    name: "/",
    type: ITypes.Directory,
    childs: [
        {
            name: "bin",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "etc",
            type: ITypes.Directory,
            childs: [{
                name: "bashrc",
                type: ITypes.Text,
                content: "yash >> "
            },
            {
                name: "crontab",
                type: ITypes.Text,
                content: ""
            },{
                name: "exports",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "fstab",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "group",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "grub.conf",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "init.d",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "hosts",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "hosts.allow",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "host.deny",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "inittab",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "issue",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "modules.conf",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "motd",
                type: ITypes.Text,
                content: `Welcome to my website!
Here you will see a part of my work.
It uses yash (https://github.com/Thumuss/yash.thumus.eu),
a bashlike written in typescript!

Please have a look and try \`help\` for more info!

To edit this message, change the file at \`/etc/motd\``
            },
            {
                name: "mtab",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "passwd",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "printcap",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "profile",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "profile.d",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "rc.d",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "resolv.conf",
                type: ITypes.Text,
                content: ""
            },

            {
                name: "security",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "skel",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "termcap",
                type: ITypes.Text,
                content: ""
            },
            {
                name: "X11",
                type: ITypes.Text,
                content: ""
            },]
        },
        {
            name: "home",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "opt",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "tmp",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "usr",
            type: ITypes.Directory,
            childs: [{
                name: "bin",
                type: ITypes.Directory,
                childs: []
            },
            {
                name: "include",
                type: ITypes.Directory,
                childs: []
            },
            {
                name: "share",
                type: ITypes.Directory,
                childs: []
            },
            {
                name: "lib",
                type: ITypes.Directory,
                childs: []
            },
            {
                name: "sbin",
                type: ITypes.Directory,
                childs: []
            },]
        },
        {
            name: "var",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "boot",
            type: ITypes.Directory,
            childs: [{
                name: "vmlinux",
                type: ITypes.Text,
                content: ""
            }]
        },
        {
            name: "dev",
            type: ITypes.Directory,
            childs: [{
                name: "hda",
                type: ITypes.Text,
                content: ""
            }]
        },
        {
            name: "lib",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "lost+found",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "media",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "mnt",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "proc",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "run",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "sbin",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "srv",
            type: ITypes.Directory,
            childs: []
        },
        {
            name: "sys",
            type: ITypes.Directory,
            childs: []
        },
    ]
}) as IDirectory

commander(root);

const wd = root;
const ENVIRONNEMENT: Helper = {
    env: {
        PATH: "/bin"
    },
    root,
    wd,
    bridge: {
        global_functions: {},
        global_variables: {},
        err: console.log,
        exec,
        out: console.log
    },
};

function findFromPath(name: string): IBinary | undefined {
    const chemins = ENVIRONNEMENT.env.PATH.split(";");
    for(const chemin of chemins) {
        const app = ENVIRONNEMENT.wd.find(`${chemin}/${name}`);
        if (app) {
            return app as IBinary
        }
    }
    return undefined
}

function exec(vals: string[] | string){
    if (typeof vals === "string") vals = vals.split(" ");
    const name = vals[0]
    if (!name) return "";
    const app = findFromPath(name);
    if (!app) return `command '${name}' not found`
    return app.execute(vals, ENVIRONNEMENT);
}

async function prompts(val: string, out: (...args: PrimitivesJS[]) => void | Promise<void>) {
    ENVIRONNEMENT.bridge.out = out;
    ENVIRONNEMENT.bridge.err = out;   
    await run(val, ENVIRONNEMENT.bridge);
}
export { root, prompts, ENVIRONNEMENT };