import * as React from "react";

import {getMembersLive} from "@sentrei/common/firebase/members";
import {getRoomsLive} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import {recordGroup} from "@sentrei/common/utils/segment";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import ErrorScreen from "@sentrei/ui/components/ErrorScreen";
import SkeletonScreen from "@sentrei/ui/components/SkeletonScreen";
import SpaceHome from "@sentrei/ui/components/SpaceHome";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  memberData: Member.Get;
  membersData: Member.Get[];
  roomsData: Room.Get[] | null;
  spaceData: Space.Get;
  spaceId: string;
}

export default function SpaceScreen({
  user,
  profile,
  memberData,
  membersData,
  roomsData,
  spaceData,
  spaceId,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>(
    spaceData,
  );
  const [member, setMember] = React.useState<Member.Get | null | undefined>(
    memberData,
  );
  const [members, setMembers] = React.useState<Member.Get[] | null | undefined>(
    membersData,
  );
  const [rooms, setRooms] = React.useState<Room.Get[] | null | undefined>(
    roomsData,
  );

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getMembersLive(spaceId, snap => {
      setMember(snap.filter(doc => doc.uid === profile.uid)[0]);
      setMembers(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId, profile]);

  React.useEffect(() => {
    const unsubscribe = getRoomsLive(spaceId, snap => {
      setRooms(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  React.useEffect(() => {
    if (space) {
      recordGroup(space.id, {
        namespaceId: space.namespaceId,
        tier: space.tier,
        spaceId: space.id,
        stripeId: space.stripeId,
      });
    }
  }, [space]);

  if (space === undefined || members === undefined || rooms === undefined) {
    return <SkeletonScreen />;
  }

  if (!space || !members) {
    return <ErrorScreen />;
  }

  return (
    <>
      {space && members && member && (
        <SpaceHome
          member={member}
          members={members}
          profile={profile}
          rooms={rooms}
          space={space}
          user={user}
        />
      )}
    </>
  );
}
