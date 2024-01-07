import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from ".";
import { IScheduleState, Schedule, updateSchedule } from "../reducers/schedule";

interface Func {
  updateSchedule: (_schedule: Schedule | null) => void;
  clearSchedule: () => void;
}

type UseReducerSchedule = [IScheduleState, Func];

export function useReducerSchedule(): UseReducerSchedule {
  const scheduleState = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();

  const dispatchUpdateSchedule: Func["updateSchedule"] = useCallback(
    (schedule) => dispatch(updateSchedule(schedule)),
    [dispatch],
  );

  const clearSchedule: Func["clearSchedule"] = useCallback(
    () => dispatch(updateSchedule(null)),
    [dispatch],
  );

  return [scheduleState, {
    updateSchedule: dispatchUpdateSchedule,
    clearSchedule
  }];
}

