/**
 *
 * Settings
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, ResponsiveContext, Button, Layer } from 'grommet';
import Icon from 'components/Icon';
import {
  getRouterRoute,
  getRouterMatch,
  getStandardSearch,
  getBenchmarkSearch,
  getTabSearch,
  getIndicatorInfo,
  getCountry,
} from 'containers/App/selectors';

import { setStandard, setBenchmark } from 'containers/App/actions';

import getMetricDetails from 'utils/metric-details';
import { isMinSize, isMaxSize } from 'utils/responsive';

import ScaleToggle from './ScaleToggle';
import SettingsInner from './SettingsInner';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.sizes.settings.heightCollapsed}px;
  background-color: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.15);
  @media (min-width: ${props => props.theme.breakpoints.large}) {
    height: ${({ theme }) => theme.sizes.settings.height}px;
  }
`;

const SettingsIconWrapInner = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const SettingsIconWrap = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  display: table;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.global.colors['light-1']};
  @media (min-width: ${props => props.theme.breakpoints.large}) {
    width: 120px;
    left: auto;
  }
`;

const SetScaleWrap = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 130%;
  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    text-align: left;
    left: ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${props => props.theme.breakpoints.large}) {
    transform: translateY(20%);
    bottom: 100%;
  }
  z-index: 1;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.global.colors['light-1']};
  width: 100%;
  height: ${({ theme }) => theme.sizes.settings.heightCollapsed}px;
  text-align: center;
`;

export const showSettings = ({ route, match, tabIndex }) => {
  if (route === 'page') return false;
  if (route === 'metric') {
    const metricDetails = getMetricDetails(match);
    if (metricDetails && metricDetails.type === 'cpr') return false;
  }
  if (route === 'country') {
    return tabIndex === 0;
  }
  return true;
};

const showScale = ({ route }) => {
  if (route === 'metric') return false;
  if (route === 'country') return false;
  return true;
};

export function Settings({
  route,
  match,
  standard,
  benchmark,
  tabIndex,
  onSetStandard,
  onSetBenchmark,
  metricInfo,
  country,
}) {
  const [open, setOpen] = useState(false);
  if (!showSettings({ route, match, tabIndex })) return null;
  return (
    <Styled>
      {showScale({ route }) && (
        <SetScaleWrap>
          <ScaleToggle />
        </SetScaleWrap>
      )}
      <ResponsiveContext.Consumer>
        {size => (
          <>
            {isMaxSize(size, 'medium') && (
              <StyledButton onClick={() => setOpen(true)}>
                <Icon name="SETTINGS" />
                <span>More settings</span>
              </StyledButton>
            )}
            {isMinSize(size, 'large') && (
              <SettingsIconWrap>
                <SettingsIconWrapInner>
                  <Icon name="SETTINGS" />
                </SettingsIconWrapInner>
              </SettingsIconWrap>
            )}
            {isMinSize(size, 'large') && (
              <Box
                direction="row"
                height="90px"
                width="full"
                pad={{ left: size === 'xlarge' ? 'medium' : 'small' }}
                align="start"
                style={{ position: 'relative' }}
              >
                <SettingsInner
                  route={route}
                  match={match}
                  benchmark={benchmark}
                  onSetBenchmark={onSetBenchmark}
                  standard={standard}
                  onSetStandard={onSetStandard}
                  metricInfo={metricInfo}
                  country={country}
                  size={size}
                />
              </Box>
            )}
            {isMaxSize(size, 'medium') && open && (
              <Layer full animate={false}>
                <Box fill>
                  <Box pad="large" flex overflow="auto">
                    <SettingsInner
                      route={route}
                      match={match}
                      benchmark={benchmark}
                      onSetBenchmark={onSetBenchmark}
                      standard={standard}
                      onSetStandard={onSetStandard}
                      metricInfo={metricInfo}
                      country={country}
                      size={size}
                      fullSize
                    />
                  </Box>
                  <Box as="footer" justify="end" direction="row" align="center">
                    <StyledButton onClick={() => setOpen(false)}>
                      <Icon name="SETTINGS" />
                      <span>Close settings</span>
                    </StyledButton>
                  </Box>
                </Box>
              </Layer>
            )}
          </>
        )}
      </ResponsiveContext.Consumer>
    </Styled>
  );
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  standard: PropTypes.string,
  benchmark: PropTypes.string,
  tabIndex: PropTypes.number,
  onSetStandard: PropTypes.func,
  onSetBenchmark: PropTypes.func,
  metricInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  route: state => getRouterRoute(state),
  match: state => getRouterMatch(state),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  tabIndex: state => getTabSearch(state),
  metricInfo: state => {
    const route = getRouterRoute(state);
    if (route === 'metric') {
      const match = getRouterMatch(state);
      const metric = getMetricDetails(match);
      if (metric.metricType === 'indicators') {
        return getIndicatorInfo(state, metric.code);
      }
      return false;
    }
    return false;
  },
  country: state => {
    const route = getRouterRoute(state);
    if (route === 'country') {
      const match = getRouterMatch(state);
      return getCountry(state, match);
    }
    return false;
  },
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
    onSetBenchmark: value => dispatch(setBenchmark(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Settings);
