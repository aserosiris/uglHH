import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage} from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'; //AGREGAR PARA USAR SQL
import { CarritoVtPage } from '../pages/carrito-vt/carrito-vt';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string;

  pages: any[];
  rutamail

  
  db: SQLiteObject;
  notaVenta
  detalleVenta







  constructor(  public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private alertCtrl:AlertController,
    private storage: Storage,
    private sqlite: SQLite,
    //Agregar para usar SQL
    private app:App) {

     
   
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Inicio', component:'HomePage', icon:'home'},
      {title: 'Descarga de Listas', component:'InicioDiaPage', icon:'create'},
      {title: 'Lista Clientes', component:'ClientesPage', icon:'list-box'},
      {title: 'PreVenta', component:'PreVentaClientesPage', icon:'search'},
      {title: 'Leaderboard', component:'HomePage', icon:'archive'}
    ];


    platform.registerBackButtonAction(() =>{ 
      let Nav = app.getActiveNavs()[0];
      let active= Nav.getActive();

     if(active.instance instanceof CarritoVtPage)
     {
      const prompt = this.alertCtrl.create({
        title:'Confirmación:',
      
          message:'Si regresa a página de Inicio el registro de esta nota de venta No será guardado.',
          buttons:[
            {
              text: 'Ir a Inicio.',
              handler:()=>{
                //this.nav.popTo(this.nav.getByIndex(1)); //regresa a a pagina del listado de clientes
                this.nav.setRoot("HomePage"); //regresa a la pagina de Inicio 
            }
          },
          {
            text:'Ir a Venta.',
            handler: ()=>{
            }       
          }
          ]
        });
        prompt.present();

      }

    })
  }

  ionViewWillEnter(){
    this.storage.get('useremail').then((val) =>{
      this.rutamail = val;
      console.log(this.rutamail)
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('useremail').then(loggedIn =>{
        if(loggedIn === null){
          this.nav.setRoot("LoginPage");
        }
        if(loggedIn !== null){
          this.nav.setRoot("HomePage");
        }
      });
    });

  }

  openPage(page) {
    if(page.component === "HomePage"){
      this.nav.setRoot(page.component);
    }else{
      this.nav.push(page.component);
    }
    
  }


    //******************************************************************************* */

showPrompt(){   //ventana emergente para agregar cantidad de piezas
     
    
  const prompt = this.alertCtrl.create({
       

    title:'CERRAR DIA',
    message:"ALERTA!!! estas por cerrar el dia, NO PODRAS SEGUIR VENDIENDO DESPUES DE ESTO",
    buttons:[
      {
        text: 'No terminar dia',
        handler: data =>{
          console.log('cancelado');
        }
    },
    {
      
      text:'Terminar dia',
      handler: data=>{
        this.logout()
      }

 
    }
   
    ]
  });
  prompt.present();
}

//******************************************************************************* */

  logout(){
    this.storage.remove('useremail');
    this.nav.setRoot("LoginPage");
    this.storage.remove('asistencia');


    


  }

  obtenerRuta(){
    
  }
/*
 
  */


}
