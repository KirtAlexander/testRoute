import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
    images = [
      { src: 'https://th.bing.com/th/id/R.11134f0489e2365dd86deea7db7db4e3?rik=FIBGUWHshb2uqw&riu=http%3a%2f%2fpinkplankton.com%2fwp-content%2fuploads%2f2016%2f02%2fguatape8.jpg&ehk=EUQZrFufkmBZSqmHDWhjbWC%2bPRdD3vJ%2bZyBruX2rYOg%3d&risl=&pid=ImgRaw&r=0', alt: 'Slide 1' },
      { src: 'https://expotur-eco.com/wp-content/uploads/2019/08/cropped-Guatap%C3%A9.jpg', alt: 'Slide 2' },
      { src: 'https://cdn.getyourguide.com/img/location/5d301e2a59924.jpeg/88.jpg', alt: 'Slide 3' }
    ];
}
