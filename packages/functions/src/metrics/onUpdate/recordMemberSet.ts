import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import calculateRecord from "@sentrei/functions/helpers/metrics/calculateRecord";

const db = admin.firestore();

/**
 * Set record for member
 */
const recordMemberSet = functions.firestore
  .document("spaces/{spaceId}/members/{memberId}/analytics/latest")
  .onUpdate(async (change, context) => {
    const {spaceId, memberId} = context.params;

    const metricsData = calculateRecord(change, true);

    if (!metricsData) {
      return false;
    }

    return db
      .doc(`spaces/${spaceId}/members/${memberId}/admin/metrics`)
      .set(metricsData, {merge: true});
  });

export default recordMemberSet;
