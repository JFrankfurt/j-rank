"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import { useDebounce } from "@uidotdev/usehooks";
import Athletes from "./components/Athletes";

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 300);

  return (
    <main className={styles.root}>
      <label htmlFor="search">
        <pre>search</pre>
        <input
          id="search"
          placeholder="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <Athletes search={debouncedSearchTerm} />
    </main>
  );
}
