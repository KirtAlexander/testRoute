import { AppState } from '@/store/state';
import { OpenModalLogin } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { Component } from '@angular/core';
import { HostBinding, OnInit} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppService } from '@services/app.service';
import { Observable } from 'rxjs';



const BASE_CLASSES = 'main-header navbar navbar-expand';
@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
  @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public searchForm: UntypedFormGroup;
    public userLogin: any; 

    constructor(
        private appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.navbarVariant}`;
            
            this.userLogin = state.userLoged.data;
        });
    }

    openModalLogin() {
        this.store.dispatch(new OpenModalLogin());
      }
    

    logout() {
        this.appService.logout();
    }

}
