import { useQuery, searchQuery } from '..';

export default function useSearch ({
  proskomma,
  changeIndex,
  text,
}) {
  const query = searchQuery({text});
  const {
    changeIndex: queryChangeIndex,
    data, 
    errors, 
  } = useQuery({
    proskomma,
    changeIndex,
    query,
  });

  const state = {
    changeIndex: queryChangeIndex,
    data,
    errors,
  };

  return state;
};