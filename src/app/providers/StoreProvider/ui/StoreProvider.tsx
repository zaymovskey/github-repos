import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps): ReactNode => {
    const { children } = props;

    const store = createReduxStore();

    return <Provider store={store}>{children}</Provider>;
};
