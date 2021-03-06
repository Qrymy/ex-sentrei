import {NextPage} from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";

import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const SpaceCreate = dynamic(
  () => import("@sentrei/ui/components/SpaceCreate"),
  {
    ssr: false,
  },
);

const Create: NextPage = () => {
  const {user, profile} = React.useContext(AuthContext);

  if (user === undefined) {
    return (
      <>
        <SentreiAppHeader
          skeleton
          profile={profile ?? undefined}
          tabUserKey="create"
          model="user"
        />
        <SkeletonForm />
      </>
    );
  }

  if (!user || !profile) {
    return (
      <>
        <SentreiAppHeader skeleton tabUserKey="create" model="user" />
        <ErrorScreen />
      </>
    );
  }

  return (
    <>
      <SentreiAppHeader
        notificationCount={Number(user.notificationCount)}
        profile={profile}
        userId={user.uid}
        tabUserKey="create"
        model="user"
      />
      <SpaceCreate profile={profile} user={user} />
    </>
  );
};

export default Create;
