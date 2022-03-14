import PropTypes from 'prop-types';

import { catalogQuery } from '../helpers/catalog';
import { useQuery } from '..';

export default function useCatalog({
  proskomma,
  stateId,
  cv,
  verbose,
}) {
  const {
    stateId: queryStateId,
    data: catalog,
    errors,
  } = useQuery({
    proskomma,
    stateId,
    query: catalogQuery({ cv }),
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
  /** Include chapter and verse details */
  cv: PropTypes.bool,
};

useCatalog.defaultProps = {
  proskomma: undefined,
  stateId: '',
  cv: false,
};