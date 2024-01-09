"use client";
/* eslint-disable react/no-unescaped-entities */
import styles from "./page.module.css";
import { IText, ITypes, TObject } from "./system/base";
import { PrimitivesJS } from "./system/interpretor/src/types";
import { root, prompts } from "./system/values";
import { useState } from "react";
export default function Home() {
  const [prompt, setPrompt] = useState((root.find("/etc/bashrc") as IText).content)
  const [inout, setInputOutput] = useState({
    in: "",
    out: prompt,
  });
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      let stack = "";
      const out = (...anything: PrimitivesJS[]): void => {
        stack += anything.map(String).join(" ");
      };
      prompts(inout.in, out).then(() => {
        setInputOutput({
          in: "",
          out: `${inout.out}${inout.in}\n${stack}${stack.endsWith("\n") || stack == "" ? "" : "\n"}${prompt}`,
        });
      });
    }
  };
  return (
    <main className={styles.main}>
      <text id="text" className={styles.text}>
        {inout.out}
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
      </text>
    </main>
  );
}
