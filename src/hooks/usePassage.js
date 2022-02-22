import { useState, useMemo } from 'react';
import { useDeepCompareCallback, useDeepCompareEffect } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { useQuery } from '..';
import {
  passageQuery, parsePassageResponse, parseReferenceString,
} from '../helpers/passage';

export default function usePassage({
  proskomma,
  stateId,
  reference,
  verbose,
}) {
  const cleanState = {
    stateId: '',
    query: '',
    errors: [],
    passages: [],
    data: {},
    reference,
  };
  const [state, setState] = useState({ ...cleanState });

  const query = useMemo(() => {
    if (verbose) {
      console.log('usePassage.query reference:', reference);
    };
    return passageQuery({ reference });
  }, [reference, verbose]);

  const {
    stateId: queryStateId, data, errors: queryErrors,
  } = useQuery({
    proskomma, stateId, query, verbose,
  });

  const parse = useDeepCompareCallback(() => {
    let passages = [];
    let errors = queryErrors || [];

    if (
      reference.length &&
      data.documents.length &&
      errors.length < 1
    ) {
      try {
        const { bookCode } = parseReferenceString(reference);
        passages = parsePassageResponse({ bookCode, data });

        if (verbose) {
          console.log('usePassage.parse() query:', query);
        };
      } catch (error) {
        errors = [...errors, error];
      };
    }

    setState({
      stateId: queryStateId,
      query,
      errors,
      data,
      passages,
      reference,
    });
  }, [data, queryStateId, query, reference]);

  useDeepCompareEffect(() => {
    const changed = (
      queryStateId !== state.stateId ||
      query !== state.query ||
      data?.documents?.length !== state.data?.documents?.length
    );

    if (changed) {
      if (verbose) {
        console.log('usePassage.useEffect() stateId: ' + queryStateId);
      };
      parse();
    };
  }, [state.stateId, data, state.data, queryStateId, parse, query, state.query, verbose]);

  return state;
};

usePassage.propTypes = {
  /** Proskomma instance to query */
  proskomma: PropTypes.object,
  /** Change Index to synchronize Proskomma updates/imports */
  stateId: PropTypes.string,
  /** GraphQL Query to run */
  text: PropTypes.string,
};

usePassage.defaultProps = {
  proskomma: undefined,
  stateId: '',
  text: '',
};