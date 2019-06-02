/**
 *
 * Close
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';
import { FormattedMessage } from 'react-intl';

import { navigate } from 'containers/App/actions';

import Button from 'styled/Button';
import ButtonIcon from 'styled/ButtonIcon';

import messages from './messages';

const StyledTextButton = styled(Button)`
  color: ${({ theme }) => theme.global.colors.dark};
  &:hover {
    color: ${({ theme }) => theme.global.colors['dark-1']};
    background-color: transparent;
  }
`;

const Styled = styled(Box)`
  ${props =>
    props.topRight &&
    css`
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
    `}
  ${props =>
    props.float &&
    css`
      position: fixed;
      top: 115px;
      right: 10px;
      z-index: 10;
    `}
`;

const StyledButtonIcon = styled(ButtonIcon)`
  background: ${({ theme }) => theme.global.colors.highlight};
  &:hover {
    background: ${({ theme }) => theme.global.colors.highlight2};
  }
`;
// <FormattedMessage {...messages.label} />
function Close({
  onClose,
  closeTarget,
  keepTab = false,
  onClick,
  topRight,
  float = true,
}) {
  return (
    <Styled
      direction="row"
      pad={{ right: 'large', top: 'medium' }}
      align="center"
      topRight={topRight}
      float={float}
    >
      <StyledTextButton
        hoverColor="dark"
        onClick={() =>
          // prettier-ignore
          onClick
            ? onClick()
            : onClose(closeTarget || '', {
              keepTab,
              needsLocale: !closeTarget,
            })
        }
      >
        <Text size="small">
          <FormattedMessage {...messages.label} />
        </Text>
      </StyledTextButton>
      <StyledButtonIcon
        float={float}
        onClick={() =>
          // prettier-ignore
          onClick
            ? onClick()
            : onClose(closeTarget || '', {
              keepTab,
              needsLocale: !closeTarget,
            })
        }
      >
        <CloseIcon size="xlarge" color="dark" />
      </StyledButtonIcon>
    </Styled>
  );
}

Close.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  closeTarget: PropTypes.object,
  keepTab: PropTypes.bool,
  topRight: PropTypes.bool,
  float: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClose: (location, args) => dispatch(navigate(location, args)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Close);
