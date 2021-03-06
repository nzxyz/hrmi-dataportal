import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';
import { Close } from 'grommet-icons';

import { isMaxSize } from 'utils/responsive';
import { truncateText } from 'utils/string';
import ButtonPrimary from 'styled/ButtonPrimary';

const StyledButton = styled(ButtonPrimary)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.xxsmall};
  margin-right: ${({ theme }) => theme.global.edgeSize.xxsmall};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  }
`;
const StyledText = styled.span``;

const ActiveFilterButton = ({ label, onRemove }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <StyledButton onClick={() => onRemove()} title={label}>
        <Box direction="row" align="center" gap="xsmall">
          <StyledText>
            {truncateText(label, isMaxSize(size, 'sm') ? 6 : 10)}
          </StyledText>
          <Close
            color="white"
            size={isMaxSize(size, 'sm') ? 'small' : 'medium'}
          />
        </Box>
      </StyledButton>
    )}
  </ResponsiveContext.Consumer>
);

ActiveFilterButton.propTypes = {
  label: PropTypes.string,
  onRemove: PropTypes.func,
};

export default ActiveFilterButton;
