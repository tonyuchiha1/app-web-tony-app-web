import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as converter from "xml-js";


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  listOfData: any;
  value = "";
  isVisible = false;
  resultSearch: any;
  encontrado = false;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private firebase: ServiceService) { }

  ngOnInit(): void {
    this.firebase.getProducts().subscribe((res) => {
      // @ts-ignore
      this.listOfData = res.map((e) => {
        return {
          ...e.payload.doc.data(),
          id: e.payload.doc.id
        }
      });
    });

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
    });
  }

  deleteProduct(id: string){
    this.firebase.deleteProduct(id).then(() => {
      alert("Producto Eliminado!")
    })
  }

  onChange(value: string) {
    this.value = value;
  }

  searchProduct(valor: string){
    // @ts-ignore
    const found = this.listOfData.find(element => element.codigo == valor);
    console.log(found);
    this.encontrado = (found)? true : false;
    this.resultSearch = found;
    this.showModal()
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.updateProduct()
    this.value = ""
  }

  handleCancel(){
    this.isVisible = false;
  }

  editData(data: any){
    this.resultSearch = data;
    this.encontrado = true;
    this.showModal();
  }

  updateProduct(){
    if (this.validateForm.valid) {
      this.firebase.updateProduct(this.validateForm.value, this.resultSearch.id).then(() => {
        alert("Producto Actualizado con Éxito");
        this.isVisible = false;
      }).catch(error => alert("Error al actualizar el producto"))
    }
  }

  isVisibleX = false;
  currentData: any;
  showModalX(data: any, b: boolean): void {
    this.currentData = data;
    this.isVisibleX = true;
    if (b){
      this.onSave();
    } else {
      this.onJson();
    }
  }

  handleOkX(): void {
    console.log('Button ok clicked!');
    this.isVisibleX = false;

  }

  handleCancelX(): void {
    console.log('Button cancel clicked!');
    this.isVisibleX = false;
  }

  outputXml: any;
  onSave(){
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(this.currentData);
    this.outputXml = xml;
  }

  onJson(){
    this.outputXml = this.currentData.value;
  }

}
