import type { CSSProperties } from "react";
import blobClasses from "../../blob/blob.module.scss";
import classes from "./background.module.scss";

function Background() {
    return (
        <div className={classes.background} aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
                <div
                    key={index}
                    className={`${classes.ring} ${blobClasses.shape}`}
                    style={{ "--ring-size": 16 - index } as CSSProperties}
                />
            ))}
        </div>
    );
}

export default Background;
