/**
 *
 * AnnotateBenchmark
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';
import { injectIntl, intlShape } from 'react-intl';
import { lowerCase } from 'utils/string';
import rootMessages from 'messages';

import Tooltip from 'components/Tooltip';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';

import AnnotateRefInner from './styled/AnnotateRefInner';
import AnnotateRefLine from './styled/AnnotateRefLine';
import AnnotateRef from './styled/AnnotateRef';

function AnnotateBenchmark({
  intl,
  rotate,
  benchmarkKey,
  margin,
  above = false,
  relative = false,
  left,
  align,
}) {
  // prettier-ignore
  return (
    <AnnotateRef
      rotate={rotate}
      margin={margin}
      above={above}
      relative={relative}
      left={left}
      align={align}
    >
      <AnnotateRefLine above={above || relative} relative={relative} align={align} />
      <AnnotateRefInner above={above || relative} relative={relative}>
        <Text size="xsmall" color="dark-3">
          {`${intl.formatMessage(
            rootMessages.settings.benchmark[benchmarkKey]
          )} ${relative ? '' : lowerCase(intl.formatMessage(
            rootMessages.settings.benchmark.nameShort
          ))}`}
        </Text>
        {!relative &&
          <Tooltip
            insideButton
            margin={above ? { left: 'xsmall' } : { top: 'xsmall' }}
            iconSize="medium"
            maxWidth="300px"
            component={<BenchmarkOverlay size="xsmall" />}
          />
        }
      </AnnotateRefInner>
    </AnnotateRef>
  );
}

AnnotateBenchmark.propTypes = {
  margin: PropTypes.string,
  benchmarkKey: PropTypes.string,
  align: PropTypes.string,
  above: PropTypes.bool,
  relative: PropTypes.bool,
  left: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  intl: intlShape.isRequired,
};

export default injectIntl(AnnotateBenchmark);