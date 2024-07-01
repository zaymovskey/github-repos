import { type FC } from 'react';
import { useGetReposListQuery } from '@/entity/repo/api/getReposList/getReposList.gen.ts';

const ReposListPage: FC = () => {
    const { data, loading, error } = useGetReposListQuery({
        variables: { first: 10 },
    });

    console.log(data);
    return <div>Список</div>;
};

export default ReposListPage;
