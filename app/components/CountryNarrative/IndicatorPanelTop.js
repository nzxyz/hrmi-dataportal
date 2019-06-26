import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormNext } from 'grommet-icons';

import { COLUMNS } from 'containers/App/constants';

import rootMessages from 'messages';

import ButtonText from 'styled/ButtonText';
import Hidden from 'styled/Hidden';

import AccordionPanelHeading from './AccordionPanelHeading';
import TabLinks from './TabLinks';

const ButtonTextHeading = styled(ButtonText)`
  text-decoration: none;
`;

const getDimensionValue = (data, benchmark) => {
  if (data.score) {
    const col = (benchmark && benchmark.column) || COLUMNS.ESR.SCORE_ADJUSTED;
    return parseFloat(data.score[col]);
  }
  return false;
};

const getDimensionRefs = (score, benchmark) => {
  if (benchmark && benchmark.key === 'adjusted') {
    return [{ value: 100, style: 'dotted', key: 'adjusted' }];
  }
  if (benchmark && benchmark.key === 'best') {
    const col = benchmark.refIndicatorColumn;
    return [
      { value: 100, style: 'solid', key: 'best' },
      {
        value: score && parseFloat(score[col]),
        style: 'dotted',
        key: 'adjusted',
      },
    ];
  }
  return false;
};
function IndicatorPanelTop({
  indicator,
  benchmark,
  standard,
  onMetricClick,
  intl,
}) {
  const data = {
    ...indicator,
    color: 'esr',
    value: getDimensionValue(indicator, benchmark),
    refValues: getDimensionRefs(indicator.score, benchmark),
    maxValue: '100',
    stripes: standard === 'hi',
    unit: '%',
  };
  return (
    <Box
      direction="row"
      align="center"
      pad={{ vertical: 'none', horizontal: 'small' }}
    >
      <ButtonTextHeading onClick={() => onMetricClick(indicator.key)}>
        <AccordionPanelHeading level={6}>
          <FormattedMessage {...rootMessages.indicators[indicator.key]} />
          <Hidden min="medium">
            <FormNext size="large" />
          </Hidden>
        </AccordionPanelHeading>
      </ButtonTextHeading>
      <TabLinks
        level={3}
        onItemClick={onMetricClick}
        items={[
          {
            key: indicator.key,
            value: 0,
            label: intl.formatMessage(rootMessages.tabs.trend),
            skip: !data.value,
          },
          {
            key: indicator.key,
            value: 1,
            label: intl.formatMessage(rootMessages.tabs.about),
          },
        ]}
      />
    </Box>
  );
}
IndicatorPanelTop.propTypes = {
  indicator: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  benchmark: PropTypes.object,
  standard: PropTypes.string,
  onMetricClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(IndicatorPanelTop);
