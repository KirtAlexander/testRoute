import {Component} from '@angular/core';
import {DateTime} from 'luxon';
import packageInfo from './../../../../../package.json';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.scss']
})
export class FooterClientComponent {

  public appVersion = packageInfo.version;
  public currentYear: string = DateTime.now().toFormat('y');
}
