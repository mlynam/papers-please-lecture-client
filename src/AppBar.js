import React, { useEffect, useState } from "react";
import { server } from "./util/server";

export default function AppBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handle = setInterval(async () => {
      const response = await fetch(server.baseUrl() + "/time");
      if (response.ok) {
        const dto = await response.json();
        setTime(new Date(Date.parse(dto.iso)));
      }
    }, 1000);

    return () => clearInterval(handle);
  }, [setTime]);

  return <div>{time.toString()}</div>;
}
