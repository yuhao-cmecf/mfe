import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const browserHistory = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: browserHistory.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        console.log("Container App notified of navigation (by Auth App) to:", nextPathname);
        const { pathname } = browserHistory.location;

        // To avoid infinite loop
        if (pathname !== nextPathname) {
          browserHistory.push(nextPathname);
        }
      },
      onSignIn,
    });

    browserHistory.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
