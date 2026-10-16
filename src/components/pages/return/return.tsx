import Blob from "../../blob/blob.tsx";
import classes from "./return.module.scss";

function ReturnButton({ onClick }: { onClick: (element: HTMLDivElement) => void }) {
    return (
        <div className={classes.container} data-return-button>
            <Blob
                className={classes.button}
                onClick={onClick}
                ariaLabel="Return to The Gooby Space"
            >
                <span>The Gooby Space</span>
            </Blob>
        </div>
    );
}

export default ReturnButton;
