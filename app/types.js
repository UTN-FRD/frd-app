// @flow

export type ScheduleTimeRange = {
  start: Date,
  end: Date,
};

export type ScheduleTalk = {
  id: string,
  summary: string,
  title: string,
  speaker: {
    name: string,
    summary: string,
  },
  time: ScheduleTimeRange,
};

export type ScheduleBreak = {
  break: true,
  time: ScheduleTimeRange,
  title: string,
};

export type Schedule = {
  [string]: ScheduleTalk | ScheduleBreak,
};
