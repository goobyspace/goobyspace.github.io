import { useEffect, useState } from "react";

export default function ScreenshotGallery({
  index,
  screenshots,
}: {
  index: number;
  screenshots: string[];
}) {
  const [shownIndex, setShownIndex] = useState(0);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (screenshots.length > 0) {
      setHidden(false);
      setShownIndex(index);
    }
  }, [screenshots, index]);

  return hidden ? null : (
    <div className="screenshotGallery" onClick={() => setHidden(true)}>
      <button
        className="galleryArrowButton"
        disabled={screenshots.length > 0}
        onClick={() =>
          setShownIndex(
            shownIndex <= 0 ? screenshots.length - 1 : shownIndex - 1
          )
        }
      >
        <img src="back.svg" alt="back button" />
      </button>
      <img
        className="galleryScreenshot"
        src={screenshots[index]}
        alt={"screenshot"}
      />
      <button
        className="galleryArrowButton"
        disabled={screenshots.length > 0}
        onClick={() => {
          console.log("wazaaa");
          setShownIndex(
            shownIndex + 1 >= screenshots.length ? 0 : shownIndex + 1
          );
        }}
      >
        <img src="forward.svg" alt="forward button" />
      </button>
    </div>
  );
}
