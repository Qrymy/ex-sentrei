import {NextPage} from "next";
import Router from "next-translate/Router";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import {analytics} from "@sentrei/common/utils/firebase";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiAppHeader from "@sentrei/web/components/SentreiAppHeader";

const RoomDelete = dynamic(() => import("@sentrei/ui/components/RoomDelete"), {
  ssr: false,
});

const Delete: NextPage = () => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    analytics().setCurrentScreen("roomDelete");
  }, []);

  React.useEffect(() => {
    async function setSpace(): Promise<void> {
      const namespace = await getNamespace(String(query.namespaceId));
      if (!namespace || namespace.type === "user") {
        return;
      }
      setSpaceId(namespace.uid);
    }
    setSpace();
  }, [query.namespaceId]);

  if (user === undefined || !profile || !spaceId) {
    return (
      <>
        <SentreiAppHeader skeleton tabRoomKey="settings" type="room" />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    Router.pushI18n("/");
  }

  return (
    <>
      {user && (
        <SentreiAppHeader
          notificationCount={Number(user.notificationCount)}
          profile={profile}
          namespaceId={String(query.namespaceId)}
          roomId={String(query.roomId)}
          userId={user.uid}
          tabRoomKey="settings"
          type="room"
        />
      )}
      {user && (
        <RoomDelete
          roomId={String(query.roomId)}
          namespaceId={String(query.namespaceId)}
          spaceId={spaceId}
          user={user}
        />
      )}
    </>
  );
};

export default Delete;
