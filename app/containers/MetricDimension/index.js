/**
 *
 * MetricDimension
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import {
  getESRDimensionScores,
  getCPRDimensionScores,
  getBenchmarkSearch,
} from 'containers/App/selectors';

import { loadDataIfNeeded } from 'containers/App/actions';
import { BENCHMARKS, COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';
// import messages from './messages';
import roundScore from 'utils/round-score';

const DEPENDENCIES = ['countries', 'cprScores', 'esrScores'];

export function MetricDimension({ onLoadData, metric, scores, benchmark }) {
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const currentBenchmark =
    metric.type === 'esr' && BENCHMARKS.find(s => s.key === benchmark);
  const column =
    metric.type === 'esr' ? currentBenchmark.column : COLUMNS.CPR.MEAN;

  const sortedScores =
    scores &&
    scores.sort((a, b) =>
      parseFloat(a[column], 10) < parseFloat(b[column], 10) ? 1 : -1,
    );
  return (
    <div>
      {sortedScores &&
        sortedScores.map(s => (
          <div key={s.country_code}>
            <FormattedMessage {...rootMessages.countries[s.country_code]} />
            <span>{`: ${roundScore(s[column])}`}</span>
          </div>
        ))}
    </div>
  );
}

MetricDimension.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  metric: PropTypes.object.isRequired,
  benchmark: PropTypes.string,
  scores: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  scores: (state, { metric }) =>
    metric.type === 'esr'
      ? getESRDimensionScores(state, metric.key)
      : getCPRDimensionScores(state, metric.key),
  benchmark: state => getBenchmarkSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MetricDimension);
