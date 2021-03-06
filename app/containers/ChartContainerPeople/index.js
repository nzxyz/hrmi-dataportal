/**
 *
 * ChartContainerPeople
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withTheme } from 'styled-components';
import { Paragraph } from 'grommet';

import ChartCountryMetricPeople from 'components/ChartCountryMetricPeople';

import { RIGHTS } from 'containers/App/constants';

import getMetricDetails from 'utils/metric-details';
import { getMessageGrammar } from 'utils/narrative';

import {
  getPeopleAtRisk,
  getContentByKey,
  getCountryGrammar,
  getDependenciesReady,
} from 'containers/App/selectors';

import { loadContentIfNeeded, loadDataIfNeeded } from 'containers/App/actions';

import rootMessages from 'messages';

const getSubrights = metric => RIGHTS.filter(r => r.aggregate === metric.key);

const hasSubrights = metric => {
  const subrights = getSubrights(metric);
  return subrights.length > 0;
};

const hasAnalysis = metric =>
  metric.metricType === 'rights' ||
  (metric.metricType === 'dimensions' && metric.key === 'esr');

const generateKey = (metricCode, countryCode) => {
  const metric = getMetricDetails(metricCode);
  if (hasAnalysis(metric)) {
    if (metric.metricType === 'rights') {
      if (hasSubrights(metric)) {
        return getSubrights(metric).map(sr => `${sr.key}/${countryCode}`);
      }
      return `${metricCode}/${countryCode}`;
    }
    if (metric.metricType === 'dimensions' && metric.key === 'esr') {
      return `esr/${countryCode}`;
    }
  }
  return null;
};

const DEPENDENCIES = ['countries', 'atRisk'];

export function ChartContainerPeople({
  atRisk,
  metricCode,
  countryCode,
  countryGrammar,
  onLoadData,
  onLoadContent,
  atRiskAnalysis,
  atRiskAnalysisSubrights,
  intl,
  metricSelector,
  dataReady,
}) {
  useEffect(() => {
    onLoadData();
  }, []);
  useEffect(() => {
    const key = generateKey(metricCode, countryCode);
    if (key && atRisk) onLoadContent(key);
    onLoadData();
  }, [metricCode, countryCode, dataReady]);

  const metric = getMetricDetails(metricCode);

  // prettier-ignore
  return atRisk ? (
    <div>
      {metricSelector}
      <ChartCountryMetricPeople
        data={atRisk}
        metric={metric}
        atRiskAnalysis={atRiskAnalysis}
        atRiskAnalysisSubrights={atRiskAnalysisSubrights}
        locale={intl.locale}
        hasAnalysis={!!atRiskAnalysis}
        hasSubrightAnalysis={!!atRiskAnalysisSubrights}
        showIntro={!metricSelector}
      />
    </div>
  ) : (
    <Paragraph>
      <FormattedMessage
        {...rootMessages.hints.noAtRiskData}
        values={getMessageGrammar(intl, countryCode, null, countryGrammar)}
      />
    </Paragraph>
  );
}

ChartContainerPeople.propTypes = {
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func,
  onLoadContent: PropTypes.func,
  metricCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  atRisk: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysis: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  atRiskAnalysisSubrights: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  metricSelector: PropTypes.node,
  dataReady: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  atRisk: (state, { countryCode, metricCode }) =>
    getPeopleAtRisk(state, {
      country: countryCode,
      metric: metricCode,
    }),
  atRiskAnalysis: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    return (
      !hasSubrights(metric) &&
      getContentByKey(state, generateKey(metricCode, countryCode))
    );
  },
  atRiskAnalysisSubrights: (state, { countryCode, metricCode }) => {
    const metric = getMetricDetails(metricCode);
    if (hasSubrights(metric)) {
      const subrights = getSubrights(metric);
      // console.log(subrights)
      return subrights.map(sr => {
        const content = getContentByKey(
          state,
          generateKey(sr.key, countryCode),
        );
        return {
          ...content,
          key: sr.key,
        };
      });
    }
    return false;
  },
  countryGrammar: (state, { countryCode }) =>
    getCountryGrammar(state, countryCode),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
    onLoadContent: path => {
      if (Array.isArray(path)) {
        path.forEach(p => dispatch(loadContentIfNeeded(p, 'atrisk')));
      } else {
        dispatch(loadContentIfNeeded(path, 'atrisk'));
      }
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(
  injectIntl(withTheme(ChartContainerPeople)),
);
