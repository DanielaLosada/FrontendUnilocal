import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-business',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detail-business.component.html',
  styleUrls: ['./detail-business.component.css']
})
export class DetailBusinessComponent implements OnInit {

  additionalData: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.additionalData = JSON.parse(params['data']);
        console.log(this.additionalData);
      }
    });
  }
}
