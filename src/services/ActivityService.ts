import { IActivity } from "../models/Activity";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const activitiesCollection = collection(db, "activities");

export const addActivity = async (activityData: Omit<IActivity, "id">) => {

  await addDoc(activitiesCollection, activityData);
};

export const getActivities = async () => {
  const querySnapshot = await getDocs(activitiesCollection);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    start: doc.data().start ? new Date(doc.data().start.seconds*1000) : undefined,
    end: doc.data()?.end ? new Date(doc.data()?.end.seconds*1000) : undefined,
    id: doc.id,
  })) as IActivity[];
};

export const updateActivity = async (id: string, updatedData: any) => {
  const activityDoc = doc(activitiesCollection, id);
  await updateDoc(activityDoc, updatedData);
};

export const deleteActivity = async (id: string) => {
  const activityDoc = doc(activitiesCollection, id);
  await deleteDoc(activityDoc);
};
