import { useEffect, useRef } from "react";
import classes from "./blob.module.scss";

function Blob(
    {
        text,
        className
    }: {
        text: string,
        className: string;
    }) {
    const hoverAnimation = useRef<Animation | null>(null);

    useEffect(() => () => hoverAnimation.current?.cancel(), []);

    function transitionShape(element: HTMLDivElement, hovering: boolean) {
        element.style.animationPlayState = "paused";
        const currentRadius = getComputedStyle(element).borderRadius;
        hoverAnimation.current?.cancel();

        const style = getComputedStyle(element);
        const targetRadius = hovering
            ? style.getPropertyValue("--blob-hover-radius").trim()
            : style.borderRadius;

        const animation = element.animate(
            [{ borderRadius: currentRadius }, { borderRadius: targetRadius }],
            { duration: 600, easing: "ease", fill: "forwards" }
        );
        hoverAnimation.current = animation;

        if (!hovering) {
            animation.onfinish = () => {
                animation.cancel();
                element.style.animationPlayState = "running";
                hoverAnimation.current = null;
            };
        }
    }

    return (
        <div
            id={classes.container}
            className={className}
            onMouseEnter={event => transitionShape(event.currentTarget, true)}
            onMouseLeave={event => transitionShape(event.currentTarget, false)}
        >
            {text}
        </div>
    );
}

export default Blob;
