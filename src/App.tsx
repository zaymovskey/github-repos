import '@/app/styles/index.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

function App() {
    console.log(classNames('huy', {}, []));
    return (
        <div className="app">
            <div className="content-page">fdsff</div>
        </div>
    );
}

export default App;
