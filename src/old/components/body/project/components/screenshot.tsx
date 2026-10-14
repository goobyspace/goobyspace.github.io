import { useEffect, useState } from "react";

function Screenshot({ screenshot }: { screenshot: string }) {
  const [url, setUrl] = useState("");
  const [magnify, setMagnify] = useState(false);

  useEffect(() => {
    setUrl("");
    setUrl(screenshot);
  }, [screenshot]);

  return (
    <>
      <img
        className={`screenshot ${magnify ? "magnified" : ""}`}
        src={url}
        alt={"screenshot"}
        onMouseEnter={() => setMagnify(true)}
        onMouseLeave={() => setMagnify(false)}
      />
    </>
  );
}

export default Screenshot;
