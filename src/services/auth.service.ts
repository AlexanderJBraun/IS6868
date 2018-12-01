import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  product: any;
  customer: any;

  constructor(private http:Http) { }

  

  registerUser(user){
    console.log("firstLine of registeruser function");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers})
      .pipe(map(res => res.json()));
      
  } 


  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers})
      .pipe(map(res => res.json()));
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

 getUser(){
      return this.http.get('http://localhost:3000/users/users')
          .pipe(map(res => res.json()));
  }


  addUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/newUser',  user,{headers: headers})
      .pipe(map(res => res.json()));
  }
  
   deleteUser(id){
    return this.http.delete('http://localhost:3000/users/user/'+id)
      .pipe(map(res => res.json()));
  }
  
  changePassword(user, password, newPass){
    let data = {user,password,newPass}
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/editpassword',data,{headers: headers}).pipe(map(res => res.json()));

  }


}