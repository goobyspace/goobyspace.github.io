import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import classes from "./blob.module.scss";

function Blob(
    {
        className,
        style,
        children,
        SetHovering,
        onClick,
        ariaLabel,
    }: {
        className?: string;
        style?: CSSProperties;
        children?: ReactNode;
        SetHovering?: (hovering: boolean) => void;
        onClick?: (element: HTMLDivElement) => void;
        ariaLabel?: string;
    }) {
    const [hovering, setHovering] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const hoverAnimation = useRef<Animation | null>(null);
    const wasHovering = useRef(hovering);

    useEffect(() => {
        return () => hoverAnimation.current?.cancel();
    }, []);

    useLayoutEffect(() => {
        const element = container.current;
        if (!element || wasHovering.current === hovering) return;
        wasHovering.current = hovering;

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
    }, [hovering]);

    return (
        <div
            ref={container}
            className={`${classes.container} ${classes.shape} ${className ?? ""}`}
            style={style}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={ariaLabel}
            onKeyDown={event => {
                if (onClick && event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    onClick(event.currentTarget);
                }
            }}
            onPointerEnter={() => {
                setHovering(true);
                SetHovering?.(true);
            }}
            onPointerLeave={() => {
                setHovering(false);
                SetHovering?.(false);
            }}
            onClick={event => onClick?.(event.currentTarget)}
        >
            {children}
        </div>
    );
}

export default Blob;
