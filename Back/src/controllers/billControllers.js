const {Bill, ItemsBill, ShoppingCar, ItemsShoppingCar, Package, Activity, User} = require("../database");
const { Association } = require("sequelize");

//esta funcion agrega una nueva factura
const addBill = async(datos) => {
    const {idCar} = datos;
    if(!idCar) return {message: "Datos Incompletos"};
    //traemos la info del carrito a grabar en la nueva factura
    const car = await ShoppingCar.findByPk(idCar);
    //validamos si el valor total de la factura es mayor que cero
    if(car.fullValue === 0) return {message: "Valor a facturar no puede ser cero"};
    //validamos si la transaccion fue completada
    if(car.state === 0) return {message: "No se ha completado el pago"};

    //traemos el ultimo consecutivo numeracion factura 
    let numero = "000000";
    const facturas = await Bill.findAll();
    facturas.forEach(ele => {
       if(ele.number > numero) numero = ele.number;
    });
    const n = Number(numero) + 1;
    let num = "000000"+n.toString();
    const lo = num.length;
    const consecu = num.substring(lo-6);
    const impuesto = car.fullValue*10/100;
    const vtotal = Number(car.fullValue) + Number(impuesto);
    //generamos el objeto para insertar el nuevo registro
    const newBill = {
        number: consecu,
        subtotal: car.fullValue,
        taxes: impuesto,
        fullValue: vtotal,
        uidUser: car.uidUser,
        idUser: car.idUser,
        idTransaction: car.idTransaction,
    };
    //grabamos nuevo registro en tabla Bill
    const nBill = await Bill.create(newBill);
    //cargamos los items del carrito
    const items = await ItemsShoppingCar.findAll({where: {idShoppingCar: idCar}});

    //almacenamos los nuevos registros de la factura
    let array = [];
    items.forEach(e => {
       const obj = {
          amount: e.amount,
          unitPrice: e.unitPrice,
          totalPrice: e.amount * e.unitPrice,
          typeProduct: e.typeProduct,
          idProduct: e.idProduct,
          title: e.title,
          idBill: nBill.id,
       };
       array.push(obj);
    });

    const itemsGrabados = ItemsBill.bulkCreate(array);
    //ahora vaciamos el carrito de compras
    await emptyShoppingCar(idCar);
    //devolvemos la factura grabada
    return getBillById(nBill.id);
};


//esta funcion devuelve una factura por su ID
const getBillById = async(id) => {
   if(!id) return {message: "Id no definido"};
   const idBill = Number(id);
   const fact = await Bill.findByPk(idBill, {
      include: [
         {model: ItemsBill},
         {association: "User", attributes: ['name', 'lastName', 'email', 'address', 'phoneNumber', 'dni']},
   ]});
   return fact;
};


//esta ruta vacia completamente el carrito
const emptyShoppingCar = async (id) => {
    const idCar = Number(id);
    const registros = await ItemsShoppingCar.destroy({
      where: { idShoppingCar: idCar },
    });
    await ShoppingCar.update({state: 0, idTransaction: null, fullValue: 0}, {where: {id: idCar}});
    
    const car = await ShoppingCar.findByPk(idCar, {
      include: { model: ItemsShoppingCar },
    });
    return car;
  };


  //esta ruta devuelve todas las facturas grabadas
  const getAllBill = async() => {
     const facturas = await Bill.findAll({ include:
       [
         {model: ItemsBill},
         {association: "User", attributes: ['name', 'lastName', 'email', 'address', 'phoneNumber', 'dni']},

      ]});
     return facturas;
  };

  //esta ruta agrega compras masivas para cargar a la BD
  const addMassiveBill = async(nventas) => {
       //traemos el ultimo consecutivo numeracion factura 
       let numero = "000000";
       const facturas = await Bill.findAll();
       facturas.forEach(ele => {
          if(ele.number > numero) numero = ele.number;
       });
       //cargamos todos los paquetes 
       const paquetes = await Package.findAll({
         include: [
           { model: Activity },
         ],
       });
       const npaq = paquetes.length;
       //cargamos los usuarios existentes
       const users = await User.findAll();
       const nusers = users.length;

       //se grabaran N facturas
       for(let i=0;i<nventas;i++){
          let paq = Math.floor(Math.random()*npaq);
          let usu = Math.floor(Math.random()*nusers);
          let selPaq = paquetes[paq];
          let n = Number(numero) + 1;
          let num = "000000"+n.toString();
          let lo = num.length;
          let consecu = num.substring(lo-6);
          numero = consecu;
          //seleccionamos aleatoriamente una actividad del paquete
          let acti = selPaq.Activities.filter(ele => !ele.included);
          let nacti = acti.length;
          let act = Math.floor(Math.random()*nacti);
          let selActi = acti[act];
          let stotal = selPaq.promotionPrice * 2 + selActi.price * 2;
          let impuesto = stotal * 0.1;
          //generamos el objeto para insertar el nuevo registro
          let newBill = {
             number: consecu,
             subtotal: stotal,
             taxes: impuesto,
             fullValue: stotal + impuesto,
             uidUser: users[usu].uid,
             idUser: users[usu].id,
             idTransaction: await devuelveIdTransaction(),
             date: await devuelveFecha(),
          };   
    
         
          //grabamos la nueva factura
          const nBill = await Bill.create(newBill);
          const idFactura = nBill.id;
          //grabamos el item del paquete
          let obj = {
            amount: 2,
            unitPrice: selPaq.promotionPrice,
            totalPrice: selPaq.promotionPrice * 2,
            typeProduct: 1,
            idProduct: selPaq.id,
            title: selPaq.title ,
            idBill: idFactura,
          }
          let itemgrabado = await ItemsBill.create(obj);
          //grabamos el items de actividades
          obj = {
            amount: 2,
            unitPrice: selActi.price,
            totalPrice: selActi.price * 2,
            typeProduct: 2,
            idProduct: selActi.id,
            title: selActi.name ,
            idBill: idFactura,
          }
          itemgrabado = await ItemsBill.create(obj);
    
       };

  };

  //esta funcion devuelve una cadena de 15 caracteres como Id de transaccion
  const devuelveIdTransaction = () => {
     const cadena = "ABCDEFGHIJKLMNOPQRESTUVWXYZ01234567899";
     let result = "";
     for(let i=0;i<15;i++){
        const n = Math.floor(Math.random()*cadena.length);
        const car = cadena[n];
        result+=car;
     };
     return result;
  };

  const devuelveFecha = () => {
     const mes= Math.floor(Math.random()*12);
     if(mes === 0) mes = 1;
     const años = ["2021", "2022",'2023'];
     const i= Math.floor(Math.random()*4);
     const año = años[i];
     const dia= Math.floor(Math.random()*28);
     if(año==='2023' && mes>7) mes = 7;
     let nmes = mes;
     let ndia = dia;
     if(mes<10) nmes = "0"+mes;
     if(dia<10) ndia = "0"+dia;
     const fecha = año+"-"+nmes+"-"+ndia+' 10:14:51';
     return fecha;
  };

module.exports = { addBill, getBillById, getAllBill, addMassiveBill };