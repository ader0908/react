import React from "react";
import EncryptionSetting from "./EncryptionSetting";
import MiscellaneousSetting from "./MiscellaneousSetting";

export default function SecuritySetting() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">
        <EncryptionSetting />
      </div>
      <div className="flex-1">
        <MiscellaneousSetting />
      </div>
    </div>
  );
}
