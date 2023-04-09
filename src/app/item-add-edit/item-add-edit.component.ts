import { Component ,OnInit, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-item-add-edit',
  templateUrl: './item-add-edit.component.html',
  styleUrls: ['./item-add-edit.component.scss']
})
export class ItemAddEditComponent implements OnInit {

  itemForm: FormGroup;
  
  category: string[] = [
    'Food',
    'Electronic',
    'Furniture',
    'Equipments',
    'Vehicles'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _itemService: ItemService, 
    private _dialogRef: MatDialogRef<ItemAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
    
    ){
    this.itemForm =this._fb.group ({
      itemTitle: '',
      itemDesc: '',
      category: '',
      price: '',
      date: '',
      country:'',
    })
  }

  myControl = new FormControl('');
  options: string[] = ['Sri Lanka','United States', 'Australia', 'United Kingdom', 'India', 'South Africa', 'Japan', 'Canada'];
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.itemForm.patchValue(this.data)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onFormSubmit(){
    if(this.itemForm.valid) {
      if(this.data) {
        this._itemService.updateItems(this.data.id, this.itemForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Item Update Successfully!')
            this._dialogRef.close(true);
        },
  
        error: (err: any) =>{
          console.error(err);
          
        }
        });
      }else {
        this._itemService.addItems(this.itemForm.value).subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Item add Successfully!')
            this._dialogRef.close(true);
        },
  
        error: (err: any) =>{
          console.error(err);
          
        }
        });
      }
      
    }
  }

}
