import { useQuery, searchQuery } from '..';

export default function useSearch ({
  proskomma,
  stateId,
  text,
}) {
  const query = searchQuery({text});
  const {
    stateId: queryStateId,
    data, 
    errors, 
  } = useQuery({
    proskomma,
    stateId,
    query,
  });

  const state = {
    stateId: queryStateId,
    data,
    errors,
  };

  return state;
};