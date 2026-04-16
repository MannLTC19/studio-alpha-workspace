import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';
import BottomNavBar from './BottomNavBar';
import WorkspaceModals from '../modals/WorkspaceModals';

import Dashboard from '../../pages/Dashboard';
import Forums from '../../pages/Forums';
import Messaging from '../../pages/Messaging';
import Workspace from '../../pages/Workspace';
import Settings from '../../pages/Settings';
import Help from '../../pages/Help';

export default function Layout() {
  const { path } = useNavigation();

  let CurrentPage = Dashboard;
  if (path.startsWith('/forums')) CurrentPage = Forums;
  if (path.startsWith('/messaging')) CurrentPage = Messaging;
  if (path.startsWith('/workspace')) CurrentPage = Workspace;
  if (path.startsWith('/settings')) CurrentPage = Settings;
  if (path.startsWith('/help')) CurrentPage = Help;

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-white text-slate-900 font-sans antialiased">
      <SideNavBar />
      <main className="flex-1 flex flex-col relative md:ml-64 bg-slate-50 overflow-hidden pb-16 md:pb-0">
        <TopNavBar />
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <CurrentPage />
        </div>
      </main>
      <BottomNavBar />
      <WorkspaceModals />
    </div>
  );
}
