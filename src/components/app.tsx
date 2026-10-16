import { useEffect, useRef, useState } from "react";
import Blobs from "./blobs/blobs.tsx";
import Pages, { type PageOrigin } from "./pages/pages.tsx";
import classes from "./app.module.scss";
import projects from "./pages/projects.ts";

type PageSelection = { tag?: string; project?: string };

function readSelection(): PageSelection | null {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const tag = params.get("tag") || undefined;
    const project = params.get("project") || undefined;
    return tag || project ? { tag, project } : null;
}

function App() {
    const [selection, setSelection] = useState(readSelection);
    const [pageOrigin, setPageOrigin] = useState<PageOrigin | null>(null);
    const mainView = useRef<HTMLDivElement>(null);
    const preloadedImages = useRef<HTMLImageElement[] | null>(null);

    useEffect(() => {
        if (!selection || preloadedImages.current) return;

        const filenames = new Set(projects.flatMap(project => [project.icon, ...project.screenshots]));
        preloadedImages.current = Array.from(filenames, filename => {
            const image = new Image();
            image.fetchPriority = "low";
            image.src = `${import.meta.env.BASE_URL}${filename}`;
            return image;
        });
    }, [selection]);

    useEffect(() => {
        function syncLocation() {
            const next = readSelection();
            setSelection(next);
            setPageOrigin(null);
        }
        window.addEventListener("hashchange", syncLocation);
        return () => window.removeEventListener("hashchange", syncLocation);
    }, []);

    function navigate(next: PageSelection | null) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams();
        if (next?.tag) params.set("tag", next.tag);
        if (next?.project) params.set("project", next.project);
        url.hash = params.toString();
        window.history.pushState(null, "", url);
        setSelection(next);
        if (!next) setPageOrigin(null);
    }

    function openPage(element: HTMLDivElement, tag?: string) {
        if (selection) return;

        const { top, left, width, height } = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        setPageOrigin({
            top, left, width, height,
            borderRadius: style.borderRadius,
            color: style.backgroundColor
        });
        navigate(tag ? { tag } : { project: projects[Math.floor(Math.random() * projects.length)].id });
    }

    return (
        <div className={classes.blobContainer}>
            <div
                ref={mainView}
                className={`${classes.scene} ${selection ? classes.inactive : ""}`}
                aria-hidden={selection ? true : undefined}
            >
                <Blobs interactive={!selection} onOpenPage={openPage} />
            </div>
            {selection && (
                <Pages
                    origin={pageOrigin}
                    mainView={mainView}
                    tag={selection.tag}
                    project={selection.project}
                    onSelect={project => navigate({ tag: selection.tag, project })}
                    onClose={() => navigate(null)}
                />
            )}
        </div>
    );
}

export default App;