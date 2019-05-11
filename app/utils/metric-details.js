import { DIMENSIONS, RIGHTS, INDICATORS } from 'containers/App/constants';

export default function(code) {
  const dimension = DIMENSIONS.find(m => m.key === code);
  if (dimension) {
    return {
      metricType: 'dimensions',
      ...dimension,
    };
  }
  const right = RIGHTS.find(m => m.key === code);
  if (right) {
    return {
      metricType: 'rights',
      ...right,
    };
  }
  const indicator = INDICATORS.find(m => m.key === code);
  if (indicator) {
    return {
      metricType: 'indicators',
      ...indicator,
    };
  }
  return false;
}
