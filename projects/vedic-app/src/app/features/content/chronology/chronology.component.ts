import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vedic-chronology',
  templateUrl: './chronology.component.html',
  styleUrls: ['./chronology.component.scss'],
})
export class ChronologyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  gotoGoogle(deviceName: string = 'vedic clock') {
    deviceName = deviceName.split(' ').join('+');
    window.open(
      `https://www.google.com/search?q=${deviceName}&oq=${deviceName}`,
      '_blank'
    );
  }
}
