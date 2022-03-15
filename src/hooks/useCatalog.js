import PropTypes from 'prop-types';
import { useDeepCompareMemo } from 'use-deep-compare';

import { catalogQuery, parseChapterVerseMapInDocSets } from '../helpers/catalog';
import { useQuery } from '..';

export default function useCatalog({
  proskomma,
  stateId,
  cv = true,
  verbose,
}) {
  const {
    stateId: queryStateId,
    data,
    errors,
  } = useQuery({
    proskomma,
    stateId,
    query: catalogQuery({ cv }),
    verbose,
  });

  const catalog = useDeepCompareMemo(() => {
    const docSets = parseChapterVerseMapInDocSets({ docSets: data?.docSets });
    const _catalog = { ...data, docSets };
    return _catalog;
  }, [data]);

  return {
    stateId: queryStateId, data, catalog, errors,
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
  cv: true,
};