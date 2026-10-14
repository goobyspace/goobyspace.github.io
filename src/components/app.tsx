import Blob from "./blob/blob.tsx";
import classes from './app.module.scss';

function App() {
    return (
        <div id="container">
            <Blob text="Welcome to the Gooby Space" className={classes.center} />
        </div>
    );
}

export default App;
