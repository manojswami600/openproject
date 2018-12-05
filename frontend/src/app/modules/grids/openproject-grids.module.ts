// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {NgModule, APP_INITIALIZER, Injector} from '@angular/core';
import {DynamicModule} from 'ng-dynamic-component';
import {HookService} from "core-app/modules/plugins/hook-service";
import {MyPageComponent} from "core-components/routing/my-page/my-page.component";
import {OpenprojectCommonModule} from "core-app/modules/common/openproject-common.module";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OpenprojectWorkPackagesModule} from "core-app/modules/work_packages/openproject-work-packages.module";
import {WidgetWpAssignedComponent} from "core-app/modules/grids/widgets/wp-assigned/wp-assigned.component.ts";
import {WidgetWpCreatedComponent} from "core-app/modules/grids/widgets/wp-created/wp-created.component.ts";
import {WidgetWpWatchedComponent} from "core-app/modules/grids/widgets/wp-watched/wp-watched.component.ts";
import {WidgetWpCalendarComponent} from "core-app/modules/grids/widgets/wp-calendar/wp-calendar.component.ts";
import {WidgetTimeEntriesCurrentUserComponent} from "core-app/modules/grids/widgets/time-entries-current-user/time-entries-current-user.component";
import {GridWidgetsService} from "core-app/modules/grids/widgets/widgets.service";
import {AddGridWidgetService} from "core-app/modules/grids/widgets/add/add.service";
import {GridComponent} from "core-app/modules/grids/grid.component";
import {AddGridWidgetModal} from "core-app/modules/grids/widgets/add/add.modal";
import {GridColumnContextMenu} from "core-app/modules/grids/context_menus/column.directive";
import {GridRowContextMenu} from "core-app/modules/grids/context_menus/row.directive";
import {GridAreaColumnHeadersComponent} from "core-app/modules/grids/areas/column-headers.component";
import {GridAreaRowHeadersComponent} from "core-app/modules/grids/areas/row-headers.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,

    OpenprojectCommonModule,
    OpenprojectWorkPackagesModule,

    DynamicModule.withComponents([WidgetWpAssignedComponent,
                                  WidgetWpCreatedComponent,
                                  WidgetWpWatchedComponent,
                                  WidgetWpCalendarComponent,
                                  WidgetTimeEntriesCurrentUserComponent]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: registerWidgets,
      deps: [Injector],
      multi: true
    },
    GridWidgetsService,
    AddGridWidgetService
  ],
  declarations: [
    GridComponent,
    WidgetWpAssignedComponent,
    WidgetWpCreatedComponent,
    WidgetWpWatchedComponent,
    WidgetWpCalendarComponent,
    WidgetTimeEntriesCurrentUserComponent,
    AddGridWidgetModal,

    GridColumnContextMenu,
    GridRowContextMenu,

    GridAreaColumnHeadersComponent,
    GridAreaRowHeadersComponent,

    // MyPage
    MyPageComponent,
  ],
  entryComponents: [
    WidgetWpAssignedComponent,
    WidgetWpCreatedComponent,
    WidgetWpWatchedComponent,
    AddGridWidgetModal,

    // MyPage
    MyPageComponent,
  ],
  exports: [
  ]
})
export class OpenprojectGridsModule {
}

export function registerWidgets(injector:Injector) {
  return () => {
    const hookService = injector.get(HookService);
    hookService.register('gridWidgets', () => {
      return [
        {
          identifier: 'work_packages_assigned',
          component: WidgetWpAssignedComponent
        },
        {
          identifier: 'work_packages_created',
          component: WidgetWpCreatedComponent
        },
        {
          identifier: 'work_packages_watched',
          component: WidgetWpWatchedComponent
        },
        {
          identifier: 'work_packages_calendar',
          component: WidgetWpCalendarComponent
        },
        {
          identifier: 'time_entries_current_user',
          component: WidgetTimeEntriesCurrentUserComponent
        }
      ];
    });
  };
}
