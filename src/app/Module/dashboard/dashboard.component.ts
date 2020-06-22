import { Component, OnInit,ViewChild } from '@angular/core';
import {DashboardService} from '../../services/dashboard.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'body','Action'];
  dataSource : any = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this._dashboardService.getData().subscribe((response :any)=>{
      console.log("Get Data Response :",response);
      this.dataSource =new MatTableDataSource(response) ;
      this.dataSource.paginator = this.paginator;
    },
    error =>{
      console.log('get Data Error :',error);
    });
  }

}
