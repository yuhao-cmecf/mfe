import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MarketingApp() {
  const ref = useRef(null);
  const browserHistory = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        console.log("Container App notified of navigation (by Marketing App) to:", nextPathname);
        const { pathname } = browserHistory.location;

        // To avoid infinite loop
        if (pathname !== nextPathname) {
          browserHistory.push(nextPathname);
        }
      },
    });

    browserHistory.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
}
