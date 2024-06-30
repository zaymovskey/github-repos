import '@/app/styles/index.scss';
import AppRouter from '@/app/providers/AppRouter/ui/AppRouter.tsx';

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
