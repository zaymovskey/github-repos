import { CURRENT_PAGE } from '@/shared/const/localStorage.ts';
import { IStateScheme } from '@/app/providers/StoreProvider';

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object | undefined
          ? RecursivePartial<T[P]>
          : T[P];
};

export const reHydrateStore = (): RecursivePartial<IStateScheme> | void => {
    if (localStorage.getItem(CURRENT_PAGE) !== null) {
        return {
            reposList: {
                data: {
                    currentPage: Number(localStorage.getItem(CURRENT_PAGE)),
                    list: [],
                    totalReposCount: 0,
                },
            },
        };
    }
};
