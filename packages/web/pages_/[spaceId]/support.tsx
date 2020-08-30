import {NextPage} from "next";
import Router from "next-translate/Router";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SupportScreen from "@sentrei/ui/components/SupportScreen";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SupportPage: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);

  React.useEffect(() => {
    analytics().setCurrentScreen("support");
  }, []);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader skeleton />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && profile && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          userId={user.uid}
          spaceId={String(query.spaceId)}
        />
      )}
      {user && profile && (
        <SupportScreen
          email={user.email}
          name={profile.name}
          userId={user.uid}
        />
      )}
    </>
  );
};

export default SupportPage;
