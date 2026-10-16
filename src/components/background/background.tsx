import type { CSSProperties, ReactNode } from "react";
import classes from "./background.module.scss";

function Background({ children }: { children: ReactNode }) {
    return (
        <div className={classes.background} aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
                <div
                    key={index}
                    className={classes.ring}
                    style={{ "--ring-size": 16 - index } as CSSProperties}
                >
                    <div className={classes.contour}>{children}</div>
                </div>
            ))}
        </div>
    );
}

export default Background;
