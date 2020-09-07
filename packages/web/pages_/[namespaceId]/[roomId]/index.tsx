import dynamic from "next/dynamic";

import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import Loader from "@sentrei/ui/components/Loader";

const RoomScreen = dynamic(
  () => {
    return import("@sentrei/ui/components/RoomScreen");
  },
  {ssr: false},
);

const RoomId = (): JSX.Element => {
  const {query} = useRouter();

  const {user, profile} = React.useContext(AuthContext);
  const [spaceId, setSpaceId] = React.useState<string | null | undefined>();

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
    return <Loader />;
  }

  if (!user) {
    return <HomeScreen />;
  }

  return (
    <>
      <RoomScreen
        user={user}
        profile={profile}
        spaceId={spaceId}
        roomId={String(query.roomId)}
      />
    </>
  );
};

export default RoomId;
