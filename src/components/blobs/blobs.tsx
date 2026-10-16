import { useState, type CSSProperties } from "react";
import Blob from "../blob/blob.tsx";
import Background from "../background/background.tsx";
import classes from "./blobs.module.scss";

const items = ["Addons", "Web", "Warcraft", "Games", "Physical"];

function Blobs({
    interactive,
    onOpenPage
}: {
    interactive: boolean;
    onOpenPage: (element: HTMLDivElement, tag?: string) => void;
}) {
    const [hoveredBlob, setHoveredBlob] = useState<number | null>(null);
    const [centerMoused, setCenterMoused] = useState(false);
    const [shapes] = useState(() => Array.from({ length: items.length + 1 }, () =>
        Object.fromEntries([
            [89, 22, 26, 66],
            [57, 50, 48, 47],
            [94, 77, 8, 50],
            [64, 39, 51, 60]
        ].map((shape, index) => {
            const [top, bottom, left, right] = shape.map(value =>
                Math.max(5, Math.min(95, value + Math.random() * 20 - 10))
            );

            return [
                `--blob-radius-${index}`,
                `${top}% ${100 - top}% ${bottom}% ${100 - bottom}% / ${left}% ${right}% ${100 - right}% ${100 - left}%`
            ];
        })) as CSSProperties
    ));

    const renderBlobs = (isInteractive: boolean) => (
        <>
            <Blob
                className={`${classes.center} ${classes.blob}`}
                style={shapes[0]}
                SetHovering={hovering => { setHoveredBlob(hovering ? 0 : null); setCenterMoused(hovering); }}
                onClick={isInteractive ? onOpenPage : undefined}
                ariaLabel="Open a random project"
            />
            {items.map((text, index) => (
                <div
                    key={text}
                    className={`${classes.orbit} ${hoveredBlob === index + 1 ? classes.hovered : ""}`}
                    style={{ "--index": index } as CSSProperties}
                >
                    <Blob
                        className={`${classes.flex} ${classes.blob}`}
                        style={shapes[index + 1]}
                        SetHovering={hovering => setHoveredBlob(hovering ? index + 1 : null)}
                        onClick={isInteractive ? element => onOpenPage(element, text.toLowerCase()) : undefined}
                        ariaLabel={`Browse ${text} projects`}
                    />
                </div>
            ))}
        </>
    );

    return (
        <div className={classes.menu} style={{ "--count": items.length } as CSSProperties}>
            <Background>{renderBlobs(false)}</Background>
            <svg className={classes.filters} aria-hidden="true">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                        />
                    </filter>
                </defs>
            </svg>
            <div className={classes.blobWrapper}>
                {renderBlobs(interactive)}
            </div>
            <div className={classes.textWrapper}>
                <p className={`${classes.center} ${classes.title}`}>
                    {centerMoused ? "Random?" : "The Gooby Space"}
                </p>
                {items.map((text, index) => (
                    <p
                        key={text}
                        className={classes.orbit}
                        style={{ "--index": index } as CSSProperties}
                    >
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Blobs;
