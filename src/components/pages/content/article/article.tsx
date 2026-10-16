import { useLayoutEffect, useRef } from "react";
import Blob from "../../../blob/blob.tsx";
import type { Project } from "../../projects.ts";
import classes from "./article.module.scss";

function Article({ project, assetUrl, className }: {
    project: Project | undefined;
    assetUrl: (filename: string) => string;
    className: string;
}) {
    const title = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const element = title.current;
        const heading = element?.querySelector("h1");
        if (!element || !heading) return;

        function fitTitle() {
            if (!heading) return;
            heading.style.removeProperty("font-size");
            const size = parseFloat(getComputedStyle(heading).fontSize);
            if (heading.scrollWidth > heading.clientWidth) {
                heading.style.fontSize = `${size * heading.clientWidth / heading.scrollWidth}px`;
            }
        }

        const observer = new ResizeObserver(fitTitle);
        observer.observe(element);
        document.fonts.addEventListener("loadingdone", fitTitle);
        void document.fonts.ready.then(() => {
            if (element.isConnected) fitTitle();
        });
        fitTitle();
        return () => {
            observer.disconnect();
            document.fonts.removeEventListener("loadingdone", fitTitle);
        };
    }, [project?.id]);

    return (
        <Blob className={`${classes.article} ${className}`}>
            {project ? (
                <article aria-live="polite">
                    <div ref={title} className={classes.title}>
                        {project.icon && <img className={classes.icon} src={assetUrl(project.icon)} alt="" />}
                        <h1>{project.name}</h1>
                        {project.github && (
                            <a className={classes.github} href={project.github} target="_blank" rel="noopener noreferrer">
                                <img src={assetUrl("github-mark.svg")} alt="" />
                            </a>
                        )}
                    </div>
                    {project.link && (
                        <h2 className={classes.link}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
                        </h2>
                    )}
                    <p className={classes.description}>{project.description}</p>
                </article>
            ) : (
                <div role="status">
                    <h1>How'd you get here, friend? There is nothing here for you.</h1>
                </div>
            )}
        </Blob>
    );
}

export default Article;
