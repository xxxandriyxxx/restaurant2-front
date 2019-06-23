import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material';

import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialod',
  templateUrl: './dialod.component.html',
  styleUrls: ['./dialod.component.css']
})
export class DialodComponent implements OnInit {

  form: FormGroup;
  name = '';
  description = '';
  price = '';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialodComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
  }


  ngOnInit() {
    this.form = this.fb.group({
        name: [this.name, []],
        description: [this.description, []],
        price: [this.price, []]
      }
    );
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
