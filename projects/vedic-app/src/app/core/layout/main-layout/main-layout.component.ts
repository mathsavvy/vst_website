import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

interface IbgTypes { type: string; url: string; }

@Component({
  selector: 'vedic-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  public isMenu: boolean = false;
  public isHeader: boolean = true;
  public bgTypes: IbgTypes[] = [
    { type: 'cloud', url: "assets/clouds.mp4" },
    { type: 'night', url: "assets/night.mp4" },
    { type: 'reeds', url: "assets/reeds.mp4" },
    { type: 'sunrise', url: "assets/sunrise.mp4" },
    { type: 'sunset', url: "assets/sunset.mp4" }
  ];

  private subs: Subscription[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.queryParams.subscribe((params) => {
        this.isHeader = true;

        if (params.tv) {
          this.isHeader = false;
        }
      })
    );

  }

  get bgValue() {
    // 6 to 10 morning graphics
    // 10 to 4 afternoon 
    // 4 to 8 evening 
    // 8 to 6 night

    const hours = new Date().getHours();

    if (hours >= 6 && hours < 10) {
      // day
      return "assets/sunrise.mp4";
    }

    if (hours >= 10 && hours < 16) {
      // afternoon
      return "assets/afternoon.mp4";
    }

    if (hours >= 16 && hours < 20) {
      // night
      return "assets/sunset.mp4";
    }

    if (hours >= 20 || hours < 6) {
      // sunset

      return "assets/night.mp4";
    }

    return "assets/sunrise.mp4";
  }

  toggleClick() {
    this.isMenu = !this.isMenu;
  }

  ngOnDestroy() {
    this.subs?.forEach((sub: Subscription) => {
      sub?.unsubscribe();
    });
  }
}
