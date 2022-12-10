import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrls: ['./content-menu.component.css']
})
export class ContentMenuComponent implements OnInit {
  searchForm!: FormGroup;
  value = "";

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ]
    });
  }

  ngOnInit(): void {

  }

  onChange(value: string) {
    this.value = value;
  }
}
