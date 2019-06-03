/**
 *
 * CountryPeople
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Paragraph, Box } from 'grommet';

import rootMessages from 'messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import WordCloud from 'components/WordCloud';
import MainColumn from 'styled/MainColumn';

import { needsArticle, isPlural } from 'utils/narrative';

import messages from './messages';

const DimensionHeading = props => (
  <Heading level={3} margin={{ top: 'small', bottom: 'none' }} {...props} />
);
const RightHeading = props => (
  <Heading level={4} margin={{ top: 'small', bottom: 'none' }} {...props} />
);

function CountryPeople({ data, countryTitle, countryCode, intl, hasAside }) {
  return (
    <MainColumn hasAside={hasAside}>
      <Heading level={2}>
        <FormattedMessage
          {...messages.title}
          values={{
            country: countryTitle,
            isPlural: isPlural(intl.locale, countryCode),
            needsArticle: needsArticle(intl.locale, countryCode),
          }}
        />
      </Heading>
      <div>
        <Paragraph>
          <FormattedMessage {...messages.intro} />
        </Paragraph>
      </div>
      {data &&
        data.map(dim => (
          <Box key={dim.key} border="top" margin={{ top: 'large' }}>
            <DimensionHeading>
              <FormattedMessage {...rootMessages.dimensions[dim.key]} />
            </DimensionHeading>
            {dim.rights &&
              Object.values(dim.rights).map((right, index) => (
                <div key={right.key}>
                  {Object.values(right.atRiskData).length > 1 && (
                    <Box border="top">
                      <RightHeading margin={{ bottom: 'none' }}>
                        <FormattedMessage {...rootMessages.rights[right.key]} />
                      </RightHeading>
                    </Box>
                  )}
                  {Object.values(right.atRiskData).map(
                    (d, indexInner, array) => (
                      <WordCloud
                        key={d.code}
                        data={d}
                        dimension={right.dimension}
                        subright={array.length > 1}
                        border={
                          (array.length === 1 && index > 0) ||
                          (array.length > 1 && indexInner > 0)
                        }
                      />
                    ),
                  )}
                </div>
              ))}
          </Box>
        ))}
    </MainColumn>
  );
}

CountryPeople.propTypes = {
  countryCode: PropTypes.string,
  countryTitle: PropTypes.string,
  hasAside: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
};

export default injectIntl(CountryPeople);
