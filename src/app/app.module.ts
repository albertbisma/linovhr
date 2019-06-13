import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { 
OverlayPanelModule,
AccordionModule,
PanelModule,
FieldsetModule,
CalendarModule,
CarouselModule,
DataGridModule,
InputMaskModule,
CheckboxModule,
InputTextModule,
DataTableModule,
SharedModule,
ProgressSpinnerModule,
GrowlModule,
ConfirmDialogModule,
ConfirmationService,
ScheduleModule,
SidebarModule 
} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { ListcompanyComponent } from './listcompany/listcompany.component';
import { InputuserComponent } from './inputuser/inputuser.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { UserindexComponent } from './userindex/userindex.component';
import { ManagementindexComponent } from './managementindex/managementindex.component';
import { ManagementformComponent } from './managementform/managementform.component';
import { PayrollspecialistindexComponent } from './payrollspecialistindex/payrollspecialistindex.component';
import { PayrollspecialistformComponent } from './payrollspecialistform/payrollspecialistform.component';
import { ClientindexComponent } from './clientindex/clientindex.component';
import { ClientformComponent } from './clientform/clientform.component';
import { ScheduleindexComponent } from './scheduleindex/scheduleindex.component';
import { ReportcompanyComponent } from './reportcompany/reportcompany.component';
import { ReportmonthComponent } from './reportmonth/reportmonth.component';
import { MappingclientindexComponent } from './mappingclientindex/mappingclientindex.component';
import { MappingclientformComponent } from './mappingclientform/mappingclientform.component';
import { TaskindexComponent } from './taskindex/taskindex.component';
import { TaskformComponent } from './taskform/taskform.component';
import { TestingComponent } from './testing/testing.component';
import { NewtaskComponent } from './newtask/newtask.component';
import { NewtaskformComponent } from './newtaskform/newtaskform.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [    
    AppComponent,    
    TopnavComponent,
    ListcompanyComponent,
    InputuserComponent,
    IndexComponent,
    FooterComponent,
    UserindexComponent,
    ManagementindexComponent,
    ManagementformComponent,
    PayrollspecialistindexComponent,
    PayrollspecialistformComponent,
    ClientindexComponent,
    ClientformComponent,
    ScheduleindexComponent,
    ReportcompanyComponent,
    ReportmonthComponent,
    MappingclientindexComponent,
    MappingclientformComponent,
    TaskindexComponent,
    TaskformComponent,
    TestingComponent,
    NewtaskComponent,  
    NewtaskformComponent, LoginComponent    
  ],
  imports: [
    ProgressSpinnerModule,
    OverlayPanelModule,
    AccordionModule,
    PanelModule,
    FieldsetModule,
    CalendarModule,
    CarouselModule,
     BrowserModule,
     HttpModule,
     ScheduleModule,
     ReactiveFormsModule,         
     FormsModule,  
     SidebarModule,   
     ProgressSpinnerModule,    
     ConfirmDialogModule,
     GrowlModule,
     InputTextModule,
     BrowserAnimationsModule,   
     DataTableModule,
     CheckboxModule,
     InputMaskModule,
     DataGridModule,
     PanelModule,
     SharedModule,
     RouterModule.forRoot([      
       {
        path : '',
        component: LoginComponent//IndexComponent
       },     
       {
        path : 'index',
        component: IndexComponent
       },   
       {
        path : 'testing',
        component: TestingComponent,
       },
       {
        path : 'client',
        component: ClientindexComponent,
       },
       {
        path : 'client/form',
        component: ClientformComponent
       },
       {
        path : 'client/form/:id',
        component: ClientformComponent
       },
       {
        path : 'payroll',
        component: PayrollspecialistindexComponent
       },
       {
        path : 'payroll/form',
        component: PayrollspecialistformComponent
       },
       {
        path : 'payroll/form/:id',
        component: PayrollspecialistformComponent
       },
       {
        path : 'management/form',
        component: ManagementformComponent
       },
       {
        path : 'management/form/:id',
        component: ManagementformComponent
       },
       {
        path : 'management',
        component: ManagementindexComponent
       },
       {
        path : 'user',
        component: UserindexComponent
       },
       {
        path : 'user/form',
        component: InputuserComponent
       },
       {
        path : 'user/form/:id',
        component: InputuserComponent
       },
       {
        path : 'schedule',
        component: ListcompanyComponent
       },
       {
        path : 'scheduleindex',
        component: ScheduleindexComponent
       },
       {
        path : 'task',
        component: NewtaskComponent,
       },
       {
        path : 'task/form',
        component: NewtaskformComponent,
       },
       {
        path : 'tasktype',
        component: TaskindexComponent,
       },
       {
         path : 'tasktype/form',
         component: TaskformComponent,
       },
       {
        path : 'tasktype/form/:id',
        component: TaskformComponent,
      },
       {
        path : 'mappingindex',
        component: MappingclientindexComponent,
       },
       {
        path : 'mappingform',
        component: MappingclientformComponent,
       },
       {
        path : 'rptcompany',
        component: ReportcompanyComponent,
       },
       {
        path : 'rptpayroll',
        component: ReportmonthComponent,
       },
   ])
  ],
  
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
