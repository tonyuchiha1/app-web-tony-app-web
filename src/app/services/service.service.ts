import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Auth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isLoggedIn = false;

  constructor(private afs: AngularFirestore, private auth: Auth) {

  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email.trim(), password.trim())
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    return signOut(this.auth).then((res) => {
      localStorage.removeItem('user');
    });
  }

  async addProduct(data: any){
    await this.afs.firestore.collection('Productos').add(data);
  }

  getProducts(): Observable<any>{
    return this.afs.collection('Productos').snapshotChanges();
  }

  async deleteProduct(id: string) {
    await this.afs.firestore.collection('Productos').doc(id).delete();
  }

  async updateProduct(data: any, id: string) {
    await this.afs.collection('Productos').doc(id).update(data);
  }
}
