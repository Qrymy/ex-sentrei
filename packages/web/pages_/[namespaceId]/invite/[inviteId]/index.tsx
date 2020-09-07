import {NextPage} from "next";

import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import * as React from "react";

import AuthContext from "@sentrei/common/context/AuthContext";
import {getNamespace} from "@sentrei/common/firebase/namespaces";
import HomeScreen from "@sentrei/ui/components/HomeScreen";

import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SentreiHeader from "@sentrei/web/components/SentreiHeader";

const InviteSignup = dynamic(
  () => {
    return import("@sentrei/ui/components/InviteSignup");
  },
  {ssr: false},
);

const InviteId: NextPage = () => {
  const {query} = useRouter();

  const {user} = React.useContext(AuthContext);

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

  if (user === undefined) {
    return (
      <>
        <SentreiHeader landingKey="invite" />
        <SkeletonForm />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <SentreiHeader landingKey="invite" />
        <HomeScreen />
      </>
    );
  }

  return (
    <>
      <SentreiHeader landingKey="invite" />
      <InviteSignup
        inviteId={String(query.inviteId)}
        namespaceId={String(query.namespaceId)}
        spaceId={spaceId}
      />
    </>
  );
};

export default InviteId;
