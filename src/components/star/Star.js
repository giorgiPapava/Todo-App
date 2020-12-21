import React from 'react';
import Loading from 'components/layout/Loading';
import swallFailure from 'utils/swalFailure';

function Star() {
  swallFailure('This option is not yet implemented');
  return <Loading />;
}

export default Star;
