import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(){
    return this.httpClient.get("https://localiza-test-rc.herokuapp.com/api/tipo_producto/");
  }
}
