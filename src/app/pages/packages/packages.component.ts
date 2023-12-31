import { Package } from '@/models/package';
import { ChangeStatusPackageRequest, GetAllPackagesRequest, OpenModalCreatePackage, OpenModalDetailsPackage } from '@/store/ui/actions';
import { AppState } from '@/store/state';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { UiState } from '@/store/ui/state';

interface State {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  public ui: Observable<UiState>;
  public packagesList: Array<Package>;
  public filteredPackagesList: Array<Package>;
  public loading: boolean;
  public search: string
  public total: number

  private _state: State = {
    page: 1,
    pageSize: 5
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAllPackagesRequest());

    this.ui = this.store.select('ui');
    this.ui.subscribe((state: UiState) => {
      this.packagesList = state.allPackages.data,
      this.loading = state.allPackages.loading
      this.searchByName();
    });
  }

  matches(packageResolved: Package, term: string, pipe: PipeTransform) {
    return (
      packageResolved.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  openModalCreatePackage(pack?:Package) {
    this.store.dispatch(new OpenModalCreatePackage());
  }


  openEditPackageModal(pack:Package){
    console.log(pack)
    this.store.dispatch(new OpenModalCreatePackage(pack));
  }

  modalShowDetailsPackage(pack:Package){
    console.log(pack)
    this.store.dispatch(new OpenModalDetailsPackage(pack));
  }
  
  searchByName() {
    if (this.search === undefined || this.search.length <= 0) {
      this.filteredPackagesList = this.packagesList;
      this.total = this.filteredPackagesList.length;
      this.filteredPackagesList = this.filteredPackagesList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    } else {
      this.filteredPackagesList = this.packagesList.filter(packageModel => packageModel.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase().trim()));
      this.total = this.filteredPackagesList.length;
      this.filteredPackagesList = this.filteredPackagesList.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


  disablePackage(pack:Package){
    var text1 = ""
    var text2 = ""
    if(pack.status){
      text1 = "inhabilitar"
      text2 = "Inhabilitado"
    }else{
      text1 = "habilitar"
      text2 = "Habilitado"
    }
    Swal.fire({
      title: '¿Estás seguro de '+text1+' el paquete '+pack.name+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, '+text1,
      reverseButtons: true,
      customClass: {
        confirmButton: 'swal2-confirm-right',
        cancelButton: 'swal2-cancel-left'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new ChangeStatusPackageRequest(pack))

        Swal.fire(
          text2 + ' con éxito.'
        ).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 0);
        });
      }
    })
  }

  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this.searchByName();
  }
}
