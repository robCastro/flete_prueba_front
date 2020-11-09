import { Component, OnInit } from '@angular/core';
import { TipoProductoService } from '../services/tipo-producto.service';
import { TipoProducto } from '../models/tipo-producto';
import { Cotizacion } from '../models/cotizacion';
import { Resultado } from '../models/resultado';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tiposProductos: TipoProducto[] = [];
  cotizacion: Cotizacion = new Cotizacion();
  resultado: Resultado = new Resultado();
  procesado = false;

  constructor(
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    this.tipoProductoService
      .findAll()
      .toPromise()
      .then((tipos: TipoProducto[]) => {
        console.log(tipos);
        this.tiposProductos = tipos;
      })
      .catch(error => console.log(error));
  }

  cambioDeTipo(evento: any){
    const codBuscar = parseInt(evento.detail.value);
    this.cotizacion.tipoProducto = this.tiposProductos.find(tipo => {
      return tipo.codTipoProducto === codBuscar;
    });
  }

  enviar(){
    this.resultado.flete = (this.cotizacion.costo * this.cotizacion.tipoProducto.porcentajeFlete);
    this.resultado.combustible = this.cotizacion.costo * this.cotizacion.tipoProducto.porcentajeCombustible;
    this.resultado.seguro = this.cotizacion.costo * this.cotizacion.tipoProducto.porcentajeSeguro;
    this.resultado.aduanas = this.cotizacion.costo * this.cotizacion.tipoProducto.porcentajeAduanal;
    this.resultado.impuestos = this.cotizacion.costo * this.cotizacion.tipoProducto.porcentajeImpuestos;
    this.resultado.iva = this.cotizacion.tipoProducto.cobrarIva ? this.cotizacion.costo * 0.13 : 0;
    this.resultado.cargos = this.resultado.flete + this.resultado.combustible + 
      this.resultado.seguro + this.resultado.aduanas + this.resultado.impuestos + this.resultado.iva;
    this.resultado.total = this.cotizacion.costo + this.resultado.cargos;
    console.log(this.cotizacion);
    console.log(this.resultado);
    this.procesado = true;
  }
}
