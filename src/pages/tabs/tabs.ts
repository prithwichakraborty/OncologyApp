import { Component } from '@angular/core';

import { SSPedi } from '../sspedi/sspedi';
import { CallPage } from '../call/call';
import { GoalPage } from '../goal/goal';
import { ProvidersPage } from '../providers/proviers';
import { Setting } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CallPage;
  tab2Root = SSPedi;
  tab3Root = GoalPage;
  tab4Root = ProvidersPage;
  tab5Root = Setting;

  constructor() {

  }
}
