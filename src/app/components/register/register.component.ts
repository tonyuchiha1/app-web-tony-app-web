import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../../services/service.service";
import * as converter from 'xml-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private firebase: ServiceService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
    });
  }

  addProduct(){
    if (this.validateForm.valid) {
      this.firebase.addProduct(this.validateForm.value).then(() => {
        alert("Producto Registrado con Éxito")

      }).catch(error => alert("Error al registrar el producto"))
    }
  }



}
