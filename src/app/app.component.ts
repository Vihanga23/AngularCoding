import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemAddEditComponent } from './item-add-edit/item-add-edit.component';
import { ItemService } from './services/item.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DialogserviceService } from './confirmDialogService/dialogservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Green Coding';


  displayedColumns: string[] = [
   'id',
   'itemTitle', 
   'itemDesc',
   'country',
   'category', 
   'date', 
   'price', 
   'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _ItemService: ItemService,
    private _coreService: CoreService,
    private dialogserviceService : DialogserviceService
    
   
  ){}

  ngOnInit(): void {
    this.getItemList();
  }

  openAddEditItemForm(){
    const DialogRef = this._dialog.open(ItemAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val){
          this.getItemList();
        }
      },
    });
  }

  getItemList(){
    this._ItemService.getItemList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteItems(id: number){
    this.dialogserviceService.openConfirmDialog()
    .afterClosed().subscribe(res =>{
      if(res){
        this._ItemService.deleteItems(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Employee Deleted!', 'Done')
            this.getItemList();
          },
          error: console.log,
        })
      }
    });
  }

  openEditItemForm(data: any){
  const DialogRef = this._dialog.open(ItemAddEditComponent, {
    data,
  });

  DialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val){
        this.getItemList();
      }
    },
  });
    
  }

  printThisPage(){
    window.print();
  }
}
