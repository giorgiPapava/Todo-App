import React from 'react';
import { Link } from '@reach/router';

const CategoryLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color: isCurrent ? 'rgb(0, 125, 255)' : 'black',
        },
      };
    }}
  />
);

export default CategoryLink;
