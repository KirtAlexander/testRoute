import { Package } from '@/models/package';
import { AppState } from '@/store/state';
import { GetAllPackagesRequest, OpenModalDetailsPackage } from '@/store/ui/actions';
import { UiState } from '@/store/ui/state';
import { Component, OnInit } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {
  public ui: Observable<UiState>;
  public packagesList: Array<Package>;
  public filteredPackagesList: Array<Package>;
  public loading: boolean;
  public search: string
  public total: number

  constructor(private store: Store<AppState>) {
  }
  ngOnInit(): void {
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

  calculateDays(departureDate: Date, returnDate: Date): number {

    if (!(departureDate instanceof Date) || !(returnDate instanceof Date)) {
      departureDate = new Date(departureDate); 
      returnDate =new Date(returnDate); 
    }
    const fechaSalida = departureDate;
    // Fecha de regreso
    const fechaRegreso = returnDate;

    // Diferencia en milisegundos
    const diferenciaMilisegundos = fechaRegreso.getTime() - fechaSalida.getTime();

    // Convertir la diferencia de milisegundos a días
    const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
    const diferenciaDias = Math.floor(diferenciaMilisegundos / unDiaEnMilisegundos);

    return diferenciaDias
  }


  modalShowDetailsPackage(pack: Package) {
    this.store.dispatch(new OpenModalDetailsPackage(pack));
  }

  searchByName() {
    console.log(this.packagesList)
    if (this.search === undefined || this.search.length <= 0) {
      this.filteredPackagesList = this.packagesList;
      this.total = this.filteredPackagesList.length;
      this.filteredPackagesList = this.filteredPackagesList;
    } else {
      this.filteredPackagesList = this.packagesList.filter(packageModel => packageModel.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase().trim()));
      this.total = this.filteredPackagesList.length;
      this.filteredPackagesList = this.filteredPackagesList;
    }
  }

}

