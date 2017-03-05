import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-pasteleria',
  templateUrl: './pasteleria.component.html',
  styleUrls: ['./pasteleria.component.css']
})
export class PasteleriaComponent implements OnInit {

  nuevaPasteleria = {};
  editarPasteleria = {};
  pastelerias = [];
  formulario = {
    crearCerrado: true,
    editarCerrado: true
  };
  disabledButtons = {
    CrearFormSubmitButton: false,
    EditarFormSubmitButton: false
  };

  constructor(private _http: Http, private _masterURL: MasterURLService) {
  }

  ngOnInit() {
    this._http
      .get(this._masterURL.url + 'Pasteleria')
      .subscribe(
        res => {
          this.pastelerias = res.json()
        },
        err => {
          console.log('Error GET: ', err)
        }
      )
  }

  crearPasteleria(formulario: NgForm) {
    this.disabledButtons.CrearFormSubmitButton = true;
    this._http
      .post(this._masterURL.url + 'Pasteleria', {
        nombre: formulario.value.nombre,
        ciudad: formulario.value.ciudad,
        correo: formulario.value.correo
      })
      .subscribe(
        res => {
          console.log('Respuesta: ', res);
          this.nuevaPasteleria = {};
          this.disabledButtons.CrearFormSubmitButton = false;
          this.pastelerias.push(res.json());
          this.formulario.crearCerrado = true;
        },
        err => {
          console.log('Error: ', err);
          this.disabledButtons.CrearFormSubmitButton = false;
        },
        () => {
          console.log("Se completo la accion")
        }
      );
  }

  actualizarPasteleria(pasteleria: any) {
    let parametros = {
      nombre: pasteleria.nombre,
      ciudad: pasteleria.ciudad,
      correo: pasteleria.correo
    };

    if (parametros.nombre == '') {
      delete parametros.nombre
    }
    if (parametros.ciudad == '') {
      delete parametros.ciudad
    }
    if (parametros.nombre == '') {
      delete parametros.correo
    }

    this._http
      .put(this._masterURL.url + 'Pasteleria/' + pasteleria.id, parametros)
      .subscribe(
        res => {
          console.log('Respuesta: ', res.json());
          this.formulario.editarCerrado = true;
        },
        err => {
          console.log('Error: ', err)
        }
      )
  }

  borrarPasteleria(id: number) {
    let parametros = {
      id: id
    };
    this._http
      .delete(this._masterURL.url + "Pasteleria/" + parametros.id)
      .subscribe(
        res => {
          let pasteleriaBorrada = res.json();
          this.pastelerias = this.pastelerias.filter(value => pasteleriaBorrada.id != value.id)
        },
        err => {
          console.log(err)
        }
      )
  }
}
