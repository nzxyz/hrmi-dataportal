/**
 *
 * ChartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading, ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';
import { injectIntl, intlShape } from 'react-intl';

import ChartTools from 'containers/ChartTools';

import ChartSettingFilters from 'components/ChartSettingFilters';
import ChartSettingSort from 'components/ChartSettingSort';

import { isMinSize } from 'utils/responsive';

import messages from './messages';

const Styled = styled.div`
  margin-top: ${({ top }) => (top ? 20 : 60)}px;
  margin-bottom: 20px;
`;
const Top = styled.div`
  position: relative;
`;

const ChartToolWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 0px;
  text-align: right;
`;
// @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
//   /* position: absolute;
//   right: ${({ theme }) => theme.global.edgeSize.medium};
//   top: 0; */
// }

export function ChartHeader({
  title,
  chartId,
  filter,
  sort,
  messageValues,
  tools,
  intl,
  includeChartName,
  hasWhiteBG,
  top,
}) {
  const chartName =
    title || intl.formatMessage(messages[chartId], messageValues);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled top={top}>
          <Top>
            <Heading level={2} margin={{ bottom: 'xsmall', top: '0' }}>
              {chartName}
            </Heading>
            {tools && (
              <ChartToolWrapper>
                <ChartTools
                  hasWhiteBG={hasWhiteBG}
                  howToReadConfig={
                    tools.howToReadConfig && {
                      chartName: includeChartName && chartName,
                      ...tools.howToReadConfig,
                    }
                  }
                  settingsConfig={
                    tools.settingsConfig && {
                      chartName: includeChartName && chartName,
                      ...tools.settingsConfig,
                    }
                  }
                />
              </ChartToolWrapper>
            )}
          </Top>
          {(filter || sort) && (
            <Box
              direction="row"
              justify="between"
              align={isMinSize(size, 'medium') ? 'center' : 'start'}
              margin={{
                bottom: isMinSize(size, 'medium') ? '0' : 'small',
                top: isMinSize(size, 'medium') ? 'medium' : '0',
              }}
            >
              {filter && (
                <ChartSettingFilters
                  regionFilterValue={filter.regionFilterValue}
                  subregionFilterValue={filter.subregionFilterValue}
                  assessedFilterValue={filter.assessedFilterValue}
                  onRemoveFilter={filter.onRemoveFilter}
                  onAddFilter={filter.onAddFilter}
                  incomeFilterValue={filter.incomeFilterValue}
                  countryGroupFilterValue={filter.countryGroupFilterValue}
                  treatyFilterValue={filter.treatyFilterValue}
                  filterValues={filter.filterValues}
                  hasWhiteBG={hasWhiteBG}
                />
              )}
              {sort && (
                <ChartSettingSort
                  sort={sort.sort}
                  options={sort.options}
                  order={sort.order}
                  onSortSelect={sort.onSortSelect}
                  onOrderToggle={sort.onOrderToggle}
                  hasWhiteBG={hasWhiteBG}
                />
              )}
            </Box>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}
// metric={metric}
// currentBenchmark={currentBenchmark}
// standard={standard}

ChartHeader.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  chartId: PropTypes.string,
  title: PropTypes.string,
  filter: PropTypes.object,
  sort: PropTypes.object,
  messageValues: PropTypes.object,
  tools: PropTypes.object,
  includeChartName: PropTypes.bool,
  hasWhiteBG: PropTypes.bool,
  top: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartHeader);
