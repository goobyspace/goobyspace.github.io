import { useEffect, useState } from "react";

function Screenshot({
  screenshot,
  onClick,
}: {
  screenshot: string;
  onClick: () => void;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl("");
    setUrl(screenshot);
  }, [screenshot]);

  return (
    <>
      <img
        className="screenshot"
        src={url}
        alt={"screenshot"}
        onClick={() => onClick()}
      />
    </>
  );
}

export default Screenshot;
