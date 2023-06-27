import { Role } from '@/models/role';
import { AppState } from '@/store/state';
import { GetAllPermissionsRequest, GetAllRoleRequest } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
  public ui: Observable<UiState>;
  public user;
  public roleList:Array<Role>
  public menu = MENU;

  constructor(
    public appService: AppService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetAllRoleRequest())

    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.roleList = state.allRoles.data;
      this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
      this.AllowMenuItems()
    });
    this.user = this.appService.user;

  }

  AllowMenuItems(){
    var user = JSON.parse(localStorage.getItem('TokenPayload'))
    var role = this.roleList.find(r => r.name === user.role)
    if (role && role.associatedPermission) {

      this.menu.forEach(item=>{
        role.associatedPermission.forEach((ap) => {
          if (ap.permission.module == item.name) {
            item.allowed = true
          }
          if (ap.permission.module == "Usuarios" || ap.permission.module == "Roles") {
              if (item.name == "Configuración") {
                  item.allowed = true
              }
              // item.children.forEach(child=>{
              //     if (ap.permission.module == child.name) {
              //         console.log("tiene a",item.name)
              //         child.allowed = true
              //     }
              // })
          }
        });
      })
    }


  }
}

export const MENU = [
  {
    name: 'Dashboard',
    iconClasses: 'fas fa-tachometer-alt',
    path: ['main/admin'],
    allowed: false
  },
  {
    name: 'Configuración',
    iconClasses: 'fas fa-cog',
    allowed: false,
    children: [
      {
        name: 'Roles',
        iconClasses: 'far fa-circle',
        path: ['../../main/admin/Roles'],
        allowed: false
      },
      {
        name: 'Usuarios',
        iconClasses: 'far fa-circle',
        path: ['../../main/admin/Usuarios'],
        allowed: false
      }
    ]
  },
  {
    name: 'Empleados',
    iconClasses: 'far fas fa-user-alt',
    path: ['main/admin/Empleados'],
    allowed: false
  },
  {
    name: 'Clientes',
    iconClasses: 'far fas fa-user-friends',
    path: ['main/admin/Clientes'],
    allowed: false
  },
  {
    name: 'Calendario',
    iconClasses: 'far fa-calendar-alt',
    path: ['main/admin/Calendario'],
    allowed: false
  },
  {
    name: 'Paquetes',
    iconClasses: 'far fa-image',
    path: ['main/admin/Paquetes'],
    allowed: false
  },
  {
    name: 'Pedidos',
    iconClasses: 'fas fa-columns',
    path: ['main/admin/Pedidos'],
    allowed: false
  }
];
