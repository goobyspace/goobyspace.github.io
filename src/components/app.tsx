import type { CSSProperties } from "react";
import Blob from "./blob/blob.tsx";
import classes from "./app.module.scss";

const items = ["Projects", "About", "GitHub", "Contact"];

function App() {
    return (
        <div
            className={classes.blobContainer}
            style={{ "--count": items.length } as CSSProperties}
        >
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
                <Blob
                    text="Welcome to the Gooby Space"
                    className={classes.center}
                />

                {items.map((text, index) => (
                    <div
                        key={text}
                        className={classes.orbit}
                        style={{ "--index": index } as CSSProperties}
                    >
                        <Blob text={text} className={classes.flex} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;