"use client";
import React, { useState, useEffect } from "react";
import styles from "./Athletes.module.scss";

interface AthletesProps {
  search: string;
}

export default function Athletes({ search }: AthletesProps) {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    fetch(`/search${search ? `?search=${search}` : ""}`)
      .then((response) => response.json())
      .then((data) => setData(data.response));
  }, [search]);

  return (
    <div className={styles.root}>
      {data.map((athlete: any) => (
        <div key={athlete.guid}>
          {athlete.firstName} {athlete.lastName}
        </div>
      ))}
    </div>
  );
}
