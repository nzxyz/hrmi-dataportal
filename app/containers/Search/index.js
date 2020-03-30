/**
 *
 * Search
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';

import styled, { withTheme } from 'styled-components';
import { Box, Button, Drop, TextInput } from 'grommet';
import { Close, Search as SearchIcon } from 'grommet-icons';

import { navigate, trackEvent } from 'containers/App/actions';
// import { isMinSize, isMaxSize } from 'utils/responsive';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/App/saga';

import messages from './messages';
import SearchResults from './SearchResults';

const StyledTextInput = styled(TextInput)`
  &::placeholder {
    color: ${({ dark }) => (dark ? 'white' : 'black')};
  }
`;

export function Search({
  intl,
  searched,
  margin,
  dark,
  stretch,
  expand,
  size = 'medium',
  onToggle,
  float,
  theme,
  placeholder,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    if (expand && textInputRef) {
      textInputRef.current.focus();
    }
  });

  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const textInputRef = useRef(null);
  let width;
  if (onToggle && !expand) {
    width = `${theme.sizes.search[size]}px`;
  }

  return (
    <Box
      margin={margin ? { horizontal: 'medium' } : null}
      width={(onToggle && expand) || stretch ? '100%' : null}
      style={{ minWidth: expand ? '400px' : 0 }}
    >
      <Box
        elevation={float && 'medium'}
        background={dark ? 'dark' : 'white'}
        direction="row"
        align="center"
        round="xlarge"
        ref={searchRef}
        style={stretch ? null : { maxWidth: '500px' }}
        height={`${theme.sizes.search[size]}px`}
        width={width}
        pad={{
          left: !onToggle || expand ? 'ms' : '0',
          right: !onToggle || expand ? 'xsmall' : '0',
        }}
        margin={{ left: onToggle ? 'ms' : '0' }}
      >
        {onToggle && !expand && (
          <Button
            plain
            onClick={() => {
              onToggle();
            }}
            fill
            icon={<SearchIcon size={size} />}
            style={{ textAlign: 'center' }}
          />
        )}
        {((onToggle && expand) || stretch) && (
          <>
            <StyledTextInput
              plain
              value={search}
              onChange={evt => {
                if (evt && evt.target) {
                  searched(evt.target.value);
                  setSearch(evt.target.value);
                }
              }}
              placeholder={
                placeholder || intl.formatMessage(messages.allSearch)
              }
              dark={dark}
              ref={textInputRef}
            />
            {!onToggle && search.length <= 1 && (
              <Box
                width={`${theme.sizes.search[size]}px`}
                margin={{ right: size === 'medium' ? 0 : 'xsmall' }}
              >
                <SearchIcon size={size} />
              </Box>
            )}
            {(onToggle || search.length > 1) && (
              <Button
                plain
                fill="vertical"
                onClick={() => {
                  setSearch('');
                  onToggle();
                }}
                icon={<Close size={size} />}
                style={{
                  textAlign: 'center',
                  height: `${theme.sizes.search[size]}px`,
                  width: `${theme.sizes.search[size]}px`,
                  paddingRight: '5px',
                }}
              />
            )}
          </>
        )}
      </Box>
      {search.length > 1 && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={searchRef.current}
          onClickOutside={() => setSearch('')}
        >
          <SearchResults onClose={() => setSearch('')} search={search} />
        </Drop>
      )}
    </Box>
  );
}

Search.propTypes = {
  searched: PropTypes.func.isRequired,
  onToggle: PropTypes.func,
  intl: intlShape.isRequired,
  margin: PropTypes.bool,
  dark: PropTypes.bool,
  stretch: PropTypes.bool,
  expand: PropTypes.bool,
  float: PropTypes.bool,
  size: PropTypes.string,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  searched: value => {
    dispatch(
      trackEvent({
        category: 'Search',
        action: value,
      }),
    );
  },
  // navigate to location
  nav: location => {
    dispatch(
      navigate(location, {
        keepTab: true,
        trackEvent: {
          category: 'Content',
          action: 'Search: navigate',
          value: typeof location === 'object' ? location.pathname : location,
        },
      }),
    );
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(Search)));