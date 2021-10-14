import { useState, useEffect } from 'react';
import { useDeepCompareCallback } from 'use-deep-compare';
import PropTypes from 'prop-types';

import { useQuery } from '..';
import { passageQuery, parsePassageResponse, parseReferenceString } from '../helpers/passage';

export default function usePassage ({
  proskomma,
  stateId,
  reference,
}) {
  const cleanState = {
    stateId: 0,
    query: '',
    errors: [],
    passages: [],
    data: {},
  };
  const [state, setState] = useState({ ...cleanState });

  const query = passageQuery({reference});

  const {
    stateId: queryStateId, data, errors: queryErrors,
  } = useQuery({
    proskomma, stateId, query,
  });

  const parse = useDeepCompareCallback(() => {
    let passages = [];
    let errors = queryErrors || [];

    if (errors.length < 1) {
      try {
        const { bookId } = parseReferenceString(reference);
        passages = parsePassageResponse({ bookId, data });
        console.log(passages);
      } catch (error) {
        errors = [...errors, error];
      };
    } else {
      debugger
    }

    setState({
      stateId: queryStateId,
      query,
      errors,
      data,
      passages,
    });
  }, [data, queryStateId]);

  useEffect(() => {
    if (state.stateId !== queryStateId) {
      console.log('usePassage.useEffect() stateId: ' + queryStateId);
      parse();
    };
  }, [state.stateId, queryStateId, parse]);

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
  stateId: 0,
  text: '',
};