import { type IStateScheme, type IThunkConfig } from './config/StateScheme';
import { useAppDispatch, useAppSelector } from './lib/hooks.ts';
import { StoreProvider } from './ui/StoreProvider.tsx';

export {
    type IStateScheme,
    useAppDispatch,
    useAppSelector,
    StoreProvider,
    IThunkConfig,
};
