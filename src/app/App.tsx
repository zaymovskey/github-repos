import './styles/index.scss';
import { AppRouter } from './providers/AppRouter';

function App() {
    return (
        <div className="app">
            <div className="content-page">
                <AppRouter />
            </div>
        </div>
    );
}

export default App;
