import { useLayoutEffect, type RefObject } from "react";
import type { Project } from "../projects.ts";
import Article from "./article/article.tsx";
import Screenshot from "./screenshot/screenshot.tsx";
import classes from "./content.module.scss";

function Content({ selected, pageRef, contentRef }: {
    selected: Project | undefined;
    pageRef: RefObject<HTMLDivElement>;
    contentRef: RefObject<HTMLElement>;
}) {
    const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

    useLayoutEffect(() => {
        const element = contentRef.current;
        const article = element?.querySelector<HTMLElement>(`.${classes.article}`);
        const screenshots = Array.from(element?.querySelectorAll<HTMLElement>(`.${classes.screenshots} > *`) ?? []);
        if (!element || !article || screenshots.length < 2) return;

        function clearLayout() {
            if (!element) return;
            element.classList.remove(classes.scattered);
            screenshots.forEach(screenshot => {
                screenshot.style.removeProperty("left");
                screenshot.style.removeProperty("top");
            });
        }

        function scatter() {
            if (!element || !article) return;
            clearLayout();
            if (!window.matchMedia("(min-width: 900px) and (min-height: 600px)").matches) return;

            element.classList.add(classes.scattered);
            const bounds = element.getBoundingClientRect();
            const articleBounds = article.getBoundingClientRect();
            const homeBounds = pageRef.current?.querySelector<HTMLElement>("[data-return-button]")?.getBoundingClientRect();
            const obstacles = [articleBounds, ...(homeBounds ? [homeBounds] : [])];
            const gap = 20;
            const sizes = screenshots.map(screenshot => screenshot.getBoundingClientRect());
            if (articleBounds.top < bounds.top + gap || articleBounds.bottom > bounds.bottom - gap) {
                clearLayout();
                return;
            }

            for (let attempt = 0; attempt < 20; attempt++) {
                const occupied: Pick<DOMRect, "left" | "top" | "right" | "bottom">[] = [...obstacles];
                const positions: { left: number; top: number }[] = [];

                for (const [index, size] of sizes.entries()) {
                    const width = bounds.width - size.width - gap * 2;
                    const height = bounds.height - size.height - gap * 2;
                    if (width < 0 || height < 0) break;

                    for (let candidate = 0; candidate < 200; candidate++) {
                        const left = bounds.left + gap + Math.random() * width;
                        const top = bounds.top + gap + Math.random() * height;
                        const right = left + size.width;
                        const bottom = top + size.height;
                        if (occupied.some(rect =>
                            left < rect.right + gap && right > rect.left - gap &&
                            top < rect.bottom + gap && bottom > rect.top - gap
                        )) continue;

                        occupied.push({ left, top, right, bottom });
                        positions.push({ left: left - bounds.left, top: top - bounds.top });
                        break;
                    }
                    if (positions.length !== index + 1) break;
                }

                if (positions.length !== screenshots.length) continue;
                screenshots.forEach((screenshot, index) => {
                    const size = sizes[index];
                    screenshot.style.left = `${positions[index].left + (size.width - screenshot.offsetWidth) / 2}px`;
                    screenshot.style.top = `${positions[index].top + (size.height - screenshot.offsetHeight) / 2}px`;
                });
                return;
            }

            clearLayout();
        }

        const observer = new ResizeObserver(scatter);
        observer.observe(element);
        element.addEventListener("load", scatter, true);
        document.fonts.addEventListener("loadingdone", scatter);
        scatter();
        return () => {
            observer.disconnect();
            element.removeEventListener("load", scatter, true);
            document.fonts.removeEventListener("loadingdone", scatter);
            clearLayout();
        };
    }, [selected?.id, pageRef, contentRef]);

    return (
        <main ref={contentRef} className={classes.content}>
            {selected ? (
                <>
                    <Article
                        project={selected}
                        assetUrl={assetUrl}
                        className={classes.article}
                    />
                    {selected.screenshots.length > 0 && (
                        <aside className={classes.screenshots}>
                            {selected.screenshots.map((screenshot, index) => (
                                <Screenshot
                                    key={screenshot}
                                    src={assetUrl(screenshot)}
                                    alt={`${selected.name} screenshot ${index + 1}`}
                                />
                            ))}
                        </aside>
                    )}
                </>
            ) : (
                <Article project={undefined} assetUrl={assetUrl} className={classes.article} />
            )}
        </main>
    );
}

export default Content;
