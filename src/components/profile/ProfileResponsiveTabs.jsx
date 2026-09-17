import React from 'react';
import ProfileTabs from './ProfileTabs';
import ProfileMobileTabs from './ProfileMobileTabs';

export default function ProfileResponsiveTabs({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="hidden lg:block">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="lg:hidden w-full overflow-x-auto scrollbar-hide">
        <ProfileMobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
