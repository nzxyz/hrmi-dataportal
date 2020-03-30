/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';

import { ResponsiveContext, Paragraph } from 'grommet';

// containers
import { RIGHTS, DIMENSIONS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';

// components
import SectionRights from 'components/Sections/SectionRights';
import Aside from 'components/Aside';

// styles
import MainColumn from 'styled/MainColumn';
import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ButtonTextIcon from 'styled/ButtonTextIcon';
import { isMinSize } from 'utils/responsive';

import graphic from 'images/graphics/rights_overview.svg';

import rootMessages from 'messages';
import messages from './messages';

const Image = styled.img`
  width: 100%;
  max-width: 200px;
`;

export function PathMetricOverview({ onSelectMetric, intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <ContentContainer direction="column" header>
            <ContentMaxWidth
              header
              height="280px"
              hasAside={isMinSize(size, 'large')}
            >
              <MainColumn hasAside={isMinSize(size, 'large')} header>
                <PageTitle>
                  <FormattedMessage
                    {...messages.title}
                    values={{ no: RIGHTS.length }}
                  />
                </PageTitle>
                <Paragraph size="large">
                  <FormattedMessage
                    {...messages.header}
                    values={{
                      no: RIGHTS.length,
                      esrLink: (
                        <ButtonTextIcon
                          color="esrDark"
                          label={intl.formatMessage(
                            rootMessages.dimensions.esr,
                          )}
                          onClick={() => onSelectMetric('esr')}
                        />
                      ),
                      physintLink: (
                        <ButtonTextIcon
                          color="physintDark"
                          label={intl.formatMessage(
                            rootMessages.dimensions.physint,
                          )}
                          onClick={() => onSelectMetric('physint')}
                        />
                      ),
                      empowerLink: (
                        <ButtonTextIcon
                          color="empowermentDark"
                          label={intl.formatMessage(
                            rootMessages.dimensions.empowerment,
                          )}
                          onClick={() => onSelectMetric('empowerment')}
                        />
                      ),
                    }}
                  />
                </Paragraph>
              </MainColumn>
              {isMinSize(size, 'large') && (
                <Aside align="start" justify="center">
                  <Image src={graphic} />
                </Aside>
              )}
            </ContentMaxWidth>
          </ContentContainer>
          {DIMENSIONS.map((d, index) => {
            const rights = RIGHTS.filter(r => r.dimension === d.key);
            return (
              <SectionRights
                key={d.key}
                rights={rights}
                onSelectRight={onSelectMetric}
                navAllRights={() => onSelectMetric(d.key)}
                allLink={`${intl.formatMessage(messages.categoryLink)}`}
                title={`${intl.formatMessage(messages.sectionTitle, {
                  no: rights.length,
                  category: intl.formatMessage(rootMessages.dimensions[d.key]),
                })}`}
                background={index % 2 === 0 ? `${d.key}Light` : 'white'}
                description={intl.formatMessage(messages.description[d.key])}
              />
            );
          })}
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathMetricOverview.propTypes = {
  onSelectMetric: PropTypes.func,
  intl: intlShape.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathMetricOverview));