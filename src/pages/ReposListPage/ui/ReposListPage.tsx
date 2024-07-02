import { type FC, useEffect } from 'react';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { getReposListThunk } from '@/entity/repo/model/services/getReposList/getReposListThunk.ts';

const ReposListPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getReposListThunk({ first: 1 }));
    }, []);

    return <div>Список</div>;
};

export default ReposListPage;
