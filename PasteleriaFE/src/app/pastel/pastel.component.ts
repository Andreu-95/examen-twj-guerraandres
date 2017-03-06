import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-pastel',
  templateUrl: './pastel.component.html',
  styleUrls: ['./pastel.component.css']
})
export class PastelComponent implements OnInit {

  private _parametros: any;
  nuevoPastel = {};
  editarPastel = {};
  pasteles = [];
  pasteleria = {};
  formularioP = {
    crearCerrado: true,
    editarCerrado: true
  };
  disabledButtonsP = {
    CrearFormSubmitButton: false,
    EditarFormSubmitButton: false
  };

  constructor(private _ActivatedRoute: ActivatedRoute, private _http: Http, private _masterURL: MasterURLService) {
  }

  ngOnInit() {
    this._ActivatedRoute.params.subscribe(parametros => {
      this._parametros = parametros;
      this._http
        .get(this._masterURL.url + 'Pastel?idPasteleria=' + this._parametros.idPasteleria)
        .subscribe(
          res => {
            this.pasteles = res.json()
          },
          err => {
            console.log('Error: ', err)
          }
        )
    });

    this._http
      .get(this._masterURL.url + 'Pasteleria?id=' + this._parametros.idPasteleria)
      .subscribe(
        res => {
          this.pasteleria = res.json()
        },
        err => {
          console.log('Error GET: ', err)
        }
      )
  }

  crearPastel(formulario: NgForm) {
    this.disabledButtonsP.CrearFormSubmitButton = true;
    this._http
      .post(this._masterURL.url + 'Pastel', {
        nombre: formulario.value.nombre,
        tiempoElaboracion: formulario.value.tiempoElaboracion,
        urlFoto: formulario.value.urlFoto,
        idPasteleria: this._parametros.idPasteleria
      })
      .subscribe(
        res => {
          console.log('Respuesta: ', res);
          this.nuevoPastel = {};
          this.disabledButtonsP.CrearFormSubmitButton = false;
          this.pasteles.push(res.json());
          this.formularioP.crearCerrado = true;
        },
        err => {
          console.log('Error: ', err);
          this.disabledButtonsP.CrearFormSubmitButton = false;
        },
        () => {
          console.log("Se completo la accion")
        }
      );
  }

  actualizarPastel(pastel: any) {
    let parametros = {
      nombre: pastel.nombre,
      tiempoElaboracion: pastel.tiempoElaboracion,
      urlFoto: pastel.urlFoto
    };

    if (parametros.nombre == '') {
      delete parametros.nombre
    }
    if (parametros.tiempoElaboracion == '') {
      delete parametros.tiempoElaboracion
    }
    if (parametros.urlFoto == '') {
      delete parametros.urlFoto
    }

    this._http
      .put(this._masterURL.url + 'Pastel/' + pastel.id, parametros)
      .subscribe(
        res => {
          console.log('Respuesta: ', res.json());
          this.formularioP.editarCerrado = true;
        },
        err => {
          console.log('Error: ', err)
        }
      )
  }

  borrarPastel(id: number) {
    let parametros = {
      id: id
    };
    this._http
      .delete(this._masterURL.url + "Pastel/" + parametros.id)
      .subscribe(
        res => {
          let pastelBorrado = res.json();
          this.pasteles = this.pasteles.filter(value => pastelBorrado.id != value.id)
        },
        err => {
          console.log(err)
        }
      )
  }
}
