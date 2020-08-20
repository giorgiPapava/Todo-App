import React from 'react';
import { Link } from '@reach/router';

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isPartiallyCurrent, isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        style: {
          color:
            // at active nested todo
            isPartiallyCurrent && props.to === 'todo'
              ? '#ECC927'
              : // active
              isCurrent
              ? '#ECC927'
              : // not active
                'white',
        },
      };
    }}
  />
);

export default NavLink;
