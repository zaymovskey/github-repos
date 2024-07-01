import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { type IStateScheme } from '../config/StateScheme.ts';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: Partial<IStateScheme>;
}

export const StoreProvider = (props: StoreProviderProps): ReactNode => {
    const { children, initialState } = props;

    const store = createReduxStore(initialState as IStateScheme);

    return <Provider store={store}>{children}</Provider>;
};
