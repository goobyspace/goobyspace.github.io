import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import classes from "./pages.module.scss";
import Content from "./content/content.tsx";
import Footer from "./footer/footer.tsx";
import ReturnButton from "./return/return.tsx";
import projects from "./projects.ts";

export type PageOrigin = {
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
    color: string;
};

function expand(element: HTMLElement, origin: PageOrigin, layer: number) {
    const { top, left, width, height, borderRadius } = origin;
    const right = window.innerWidth - left - width;
    const bottom = window.innerHeight - top - height;

    return element.animate([
        {
            clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${borderRadius})`,
            zIndex: layer
        },
        { clipPath: "inset(-100vmax round 50%)", zIndex: layer }
    ], {
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        fill: "both"
    });
}

function Pages({ origin, mainView, tag, project, onSelect, onClose }: {
    origin: PageOrigin | null;
    mainView: RefObject<HTMLDivElement>;
    tag?: string;
    project?: string;
    onSelect: (project: string) => void;
    onClose: () => void;
}) {
    const page = useRef<HTMLDivElement>(null);
    const homeExpansion = useRef<Animation | null>(null);
    const [ready, setReady] = useState(!origin);
    const content = useRef<HTMLElement>(null);
    const filteredProjects = projects.filter(item => !tag || item.tags.includes(tag));
    const selected = project
        ? filteredProjects.find(item => item.id === project)
        : filteredProjects[0];

    useLayoutEffect(() => {
        const element = page.current;
        if (!element) return;

        const animation = origin ? expand(element, origin, 2) : null;

        const finish = () => {
            setReady(true);
            element.focus({ preventScroll: true });
        };
        if (animation) {
            animation.onfinish = finish;
        } else {
            finish();
        }

        return () => {
            animation?.cancel();
            homeExpansion.current?.cancel();
            homeExpansion.current = null;
        };
    }, [origin]);

    function returnHome(blob: HTMLDivElement) {
        const element = mainView.current;
        if (!element || !ready) return;

        const { top, left, width, height } = blob.getBoundingClientRect();
        const style = getComputedStyle(blob);
        setReady(false);
        const animation = expand(element, {
            top, left, width, height,
            borderRadius: style.borderRadius,
            color: style.backgroundColor
        }, 3);
        homeExpansion.current = animation;
        animation.onfinish = () => {
            onClose();
            requestAnimationFrame(() => {
                mainView.current?.querySelector<HTMLElement>('[role="button"]')?.focus({ preventScroll: true });
            });
        };
    }

    return (
        <div ref={page} className={classes.page} style={{ backgroundColor: origin?.color ?? "var(--blob-color)" }} tabIndex={-1}>
            <ReturnButton onClick={returnHome} />
            <Content
                contentRef={content}
                selected={selected}
                pageRef={page}
            />
            <Footer
                projects={filteredProjects}
                selected={selected}
                tag={tag}
                onSelect={projectId => {
                    onSelect(projectId);
                    content.current?.scrollIntoView({ block: "start" });
                }}
            />
        </div>
    );
}

export default Pages;
