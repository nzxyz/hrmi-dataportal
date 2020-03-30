/**
 *
 * SectionDataCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { intlShape, injectIntl } from 'react-intl';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { isMaxSize } from 'utils/responsive';

import SectionTitle from './SectionTitle';
import Slider from './Slider';
import CardData from './CardData';
import messages from './messages';

export function SectionDataCards({
  noCountries = 0,
  noRights = 0,
  noGroups = 0,
  navCountries,
  navRights,
  navGroups,
  intl,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer background="data">
          <ContentMaxWidth column>
            <SectionTitle
              title={intl.formatMessage(messages.dataCards.title)}
            />
            <Slider
              stretch
              cardMargin={isMaxSize(size, 'small') ? 'xsmall' : 'small'}
            >
              <CardData
                onCardClick={navCountries}
                no={noCountries}
                title={intl.formatMessage(messages.dataCards.countries)}
                teaser={intl.formatMessage(messages.dataCards.countriesTeaser)}
                subject="countries"
              />
              <CardData
                onCardClick={navRights}
                no={noRights}
                title={intl.formatMessage(messages.dataCards.metrics)}
                teaser={intl.formatMessage(messages.dataCards.metricsTeaser)}
                subject="metrics"
              />
              <CardData
                onCardClick={navGroups}
                no={noGroups}
                title={intl.formatMessage(messages.dataCards.people)}
                teaser={intl.formatMessage(messages.dataCards.peopleTeaser)}
                subject="people"
              />
            </Slider>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionDataCards.propTypes = {
  noCountries: PropTypes.number,
  noRights: PropTypes.number,
  noGroups: PropTypes.number,
  navCountries: PropTypes.func,
  navRights: PropTypes.func,
  navGroups: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(SectionDataCards);