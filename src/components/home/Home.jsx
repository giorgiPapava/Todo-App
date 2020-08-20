import React, { useState } from 'react';
import { Redirect } from '@reach/router';

function Home() {
  // user dashboard not yet implemented so it will always redirect to sign up
  const [user, setUser] = useState(null);
  if (!user) {
    return <Redirect noThrow to="signup" />;
  }
  return <div className="Home">Welcome</div>;
}

export default Home;
