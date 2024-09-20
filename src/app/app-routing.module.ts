import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FarmersNavBarComponent } from './components/farmers-nav-bar/farmers-nav-bar.component';
import { VetNavBarComponent } from './components/vet-nav-bar/vet-nav-bar.component';
import { AuthGuardService } from './services/auth-guard.service'; 
const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path:'',
    component:VetNavBarComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'vet-dashboard',
        pathMatch: 'full'
      },

      {
        path: 'vet-dashboard',
        loadChildren: () => import('./pages/vet/vet-dashboard/vet-dashboard.module').then( m => m.VetDashboardPageModule)
      },
      {
        path: 'vet-events',
        loadChildren: () => import('./pages/vet/vet-events/vet-events.module').then( m => m.VetEventsPageModule)
      },
      {
        path: 'view-consulatation-schedule',
        loadChildren: () => import('./pages/vet/view-consulatation-schedule/view-consulatation-schedule.module').then( m => m.ViewConsulatationSchedulePageModule)
      },
      {
        path: 'vet-profile',
        loadChildren: () => import('./pages/vet/vet-profile/vet-profile.module').then( m => m.VetProfilePageModule)
      },
    ]
  },
  {
    path:'',
    component:FarmersNavBarComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'farmers-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'farmers-dashboard',
        loadChildren: () => import('./pages/farmers/farmers-dashboard/farmers-dashboard.module').then( m => m.FarmersDashboardPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./pages/farmers/events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'schedule-consultations',
        loadChildren: () => import('./pages/farmers/schedule-consultations/schedule-consultations.module').then( m => m.ScheduleConsultationsPageModule)
      },
      {
        path: 'farmers-profile',
        loadChildren: () => import('./pages/farmers/farmers-profile/farmers-profile.module').then( m => m.FarmersProfilePageModule)
      },
      

    ]
  },
  {
    path: 'add-animal',
    loadChildren: () => import('./pages/farmers/add-animal/add-animal.module').then( m => m.AddAnimalPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/farmers/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'chat/:userId',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'videos',
    loadChildren: () => import('./pages/farmers/videos/videos.module').then( m => m.VideosPageModule)
  },
  {
    path: 'basic-knowladge',
    loadChildren: () => import('./pages/farmers/basic-knowladge/basic-knowladge.module').then( m => m.BasicKnowladgePageModule)
  },
  {
    path: 'post-videos',
    loadChildren: () => import('./pages/vet/post-videos/post-videos.module').then( m => m.PostVideosPageModule)
  },
  {
    path: 'post-basic-knowledge',
    loadChildren: () => import('./pages/vet/post-basic-knowledge/post-basic-knowledge.module').then( m => m.PostBasicKnowladgePageModule)
  },
  {
    path: 'chatlist',
    loadChildren: () => import('./chatlist/chatlist.module').then(m => m.ChatlistPageModule)
  },
  {
    path: 'add-medication',
    loadChildren: () => import('./pages/vet/add-medication/add-medication.module').then( m => m.AddMedicationPageModule)
  },
  {
    path: 'medication',
    loadChildren: () => import('./pages/farmers/medication/medication.module').then( m => m.MedicationPageModule)
  },
  {
    path: 'order-confirmation',
    loadChildren: () => import('./pages/farmers/order-confirmation/order-confirmation.module').then( m => m.OrderConfirmationPageModule)
  },
  {
    path: 'view-orders',
    loadChildren: () => import('./pages/farmers/view-orders/view-orders.module').then( m => m.ViewOrdersPageModule)
  },
  {
    path: 'view-all-orders',
    loadChildren: () => import('./pages/vet/view-all-orders/view-all-orders.module').then( m => m.ViewAllOrdersPageModule)
  },
  {
    path: 'register-users',
    loadChildren: () => import('./pages/register-users/register-users.module').then( m => m.RegisterUsersPageModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then( m => m.ForumPageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
