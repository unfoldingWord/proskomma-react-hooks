import PropTypes from 'prop-types';

import { catalogQuery } from '../helpers/catalog';
import { useQuery } from '..';

export default function useCatalog({
  proskomma,
  stateId,
  verbose,
}) {
  const {
    stateId: queryStateId,
    data: catalog,
    errors,
  } = useQuery({
    proskomma,
    stateId,
    query: catalogQuery,
    verbose,
  });

  return {
    stateId: queryStateId, catalog, errors,
  };
};

useCatalog.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
};

useCatalog.defaultProps = {
  proskomma: undefined,
  stateId: '',
};