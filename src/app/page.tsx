"use client";
/* eslint-disable react/no-unescaped-entities */
import styles from "./page.module.css";
import { IText } from "./system/base";
import { PrimitivesJS } from "./system/interpretor/src/types";
import { run } from "./system/interpretor/build/runner";
import { root, prompts, ENVIRONNEMENT } from "./system/values";
import { useState } from "react";
export default function Home() {
  const [prompt, setPrompt] = useState(
    (root.find("/etc/bashrc") as IText).content
  );
  const [inout, setInputOutput] = useState({
    in: "",
    out: `${(root.find("/etc/motd") as IText).content}\n${prompt}`,
  });

  const clear = () => setInputOutput((_) => ({ in: "", out: "" }));
  ENVIRONNEMENT.bridge.global_functions["clear"] = clear;
  ENVIRONNEMENT.bridge.global_functions["eval"] = (a, b) => run();

  const handleKeyDown = async (event: { key: string }) => {
    if (event.key === "Enter") {
      let stack = "";
      const out = (...anything: PrimitivesJS[]): void => {
        stack += anything.map(String).join(" ");
      };
      await prompts(inout.in, out);
      setInputOutput((obj) => ({
        in: "",
        out: `${obj.out}${obj.in}\n${stack}${
          stack.endsWith("\n") || stack == "" ? "" : "\n"
        }${prompt}`,
      }));
    }
  };
  return (
    <main className={styles.main}>
      {generateCells(inout.out + inout.in)}
      <input
        type="text"
        name=""
        className={styles.input}
        id=""
        value={inout.in}
        onChange={(e) =>
          setInputOutput({ in: e.target?.value, out: inout.out })
        }
        onKeyDown={handleKeyDown}
      />
    </main>
  );
}

function generateCells(text: string) {
  const objs = text.split("\n");
  return objs.map((a, i) => (
    <div key={i} className="cellrow">
      {a.split("").map((b, j) => (
        <span className="cell" key={j}>
          {b}
        </span>
      ))}
    </div>
  ));
}
