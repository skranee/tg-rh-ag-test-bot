import './App.css';
import {useEffect} from "react";
const tg = window.Telegram.WebApp;

function App() {


    useEffect(() => {
        tg.ready();
    }, []);


    return (
        <div className="App">

        </div>
    );
}

export default App;
