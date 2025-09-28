import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";
import { PageLoader } from "./PageLoader";

interface AuthenticationGuardProps {
  component: ComponentType<any>;
}

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};