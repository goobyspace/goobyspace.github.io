import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Blob from "../../../blob/blob.tsx";
import classes from "./screenshot.module.scss";

function Screenshot({ src, alt }: { src: string; alt: string }) {
    const dialog = useRef<HTMLDialogElement>(null);
    const backdrop = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLDivElement | null>(null);
    const animations = useRef<Animation[]>([]);
    const closing = useRef(false);

    useEffect(() => () => {
        animations.current.forEach(animation => animation.cancel());
    }, []);

    function open(element: HTMLDivElement) {
        const overlay = dialog.current;
        const blob = overlay?.querySelector<HTMLElement>(`.${classes.fullscreen}`);
        const image = blob?.querySelector("img");
        const thumbnailImage = element.querySelector("img");
        if (!overlay || !blob || !image || !thumbnailImage || !backdrop.current || overlay.open) return;

        trigger.current = element;
        closing.current = false;
        const thumbnail = element.getBoundingClientRect();
        const thumbnailStyle = getComputedStyle(element);
        const transform = new DOMMatrixReadOnly(thumbnailStyle.transform);
        const rotation = Math.atan2(transform.b, transform.a) * 180 / Math.PI;
        const thumbnailRadius = thumbnailStyle.borderRadius;
        overlay.showModal();
        const expanded = blob.getBoundingClientRect();
        const imageScale = Math.min(
            image.clientWidth / thumbnailImage.offsetWidth,
            image.clientHeight / thumbnailImage.offsetHeight
        );
        const options: KeyframeAnimationOptions = {
            duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 600,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            fill: "both"
        };

        animations.current.forEach(animation => animation.cancel());
        const expansion = blob.animate([
            {
                position: "fixed",
                left: `${thumbnail.left + (thumbnail.width - element.offsetWidth) / 2}px`,
                top: `${thumbnail.top + (thumbnail.height - element.offsetHeight) / 2}px`,
                width: `${element.offsetWidth}px`,
                height: `${element.offsetHeight}px`,
                transform: `rotate(${rotation}deg)`,
                borderRadius: thumbnailRadius
            },
            {
                position: "fixed",
                left: `${expanded.left}px`,
                top: `${expanded.top}px`,
                width: `${expanded.width}px`,
                height: `${expanded.height}px`,
                transform: "rotate(0deg)",
                borderRadius: getComputedStyle(blob).borderRadius
            }
        ], options);
        animations.current = [
            expansion,
            image.animate([
                { width: `${thumbnailImage.offsetWidth}px`, height: `${thumbnailImage.offsetHeight}px` },
                {
                    width: `${thumbnailImage.offsetWidth * imageScale}px`,
                    height: `${thumbnailImage.offsetHeight * imageScale}px`
                }
            ], options),
            backdrop.current.animate([{ opacity: 0 }, { opacity: 1 }], options)
        ];
        element.style.visibility = "hidden";
        expansion.onfinish = () => {
            if (!closing.current) return;
            element.style.removeProperty("visibility");
            overlay.close();
            element.focus({ preventScroll: true });
            animations.current.forEach(animation => animation.cancel());
            animations.current = [];
        };
    }

    function close() {
        if (closing.current || !dialog.current?.open) return;
        closing.current = true;
        animations.current.forEach(animation => animation.reverse());
    }

    return (
        <>
            <Blob
                className={classes.screenshot}
                onClick={open}
                ariaLabel={`Enlarge ${alt}`}
            >
                <img src={src} alt={alt} />
            </Blob>
            {createPortal(
                <dialog
                    ref={dialog}
                    className={classes.overlay}
                    aria-label={alt}
                    tabIndex={-1}
                    onCancel={event => {
                        event.preventDefault();
                        close();
                    }}
                    onClose={() => {
                        trigger.current?.style.removeProperty("visibility");
                    }}
                    onClick={event => {
                        if (event.target === event.currentTarget) close();
                    }}
                >
                    <div ref={backdrop} className={classes.backdrop} aria-hidden="true" />
                    <Blob className={classes.fullscreen}>
                        <img src={src} alt={alt} />
                    </Blob>
                </dialog>,
                document.body
            )}
        </>
    );
}

export default Screenshot;
