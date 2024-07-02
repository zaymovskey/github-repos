import { AxiosInstance } from 'axios';
import { IRepoDetailsScheme, IReposListScheme } from '@/entity/repo';

export interface IStateScheme {
    repoDetails: IRepoDetailsScheme;
    reposList: IReposListScheme;
}

export interface IThunkExtraArg {
    api: AxiosInstance;
}

export interface IThunkConfig<T> {
    rejectValue: T;
    extra: IThunkExtraArg;
    state: IStateScheme;
}
