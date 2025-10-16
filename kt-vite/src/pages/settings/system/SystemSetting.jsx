import React from "react";
import SchedulerSetting from "./SchedulerSetting";
import ResourceThresholdSetting from "./ResourceThresholdSetting";

export default function SystemSetting() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        <SchedulerSetting />
      </div>
      <div className="flex-1">
        <ResourceThresholdSetting />
      </div>
    </div>
  );
}
