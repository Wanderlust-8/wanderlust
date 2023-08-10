const { Association } = require("sequelize");
const { TypePackage, Package,
        City, Airline,
        Activity, Country, Continent,
        CityOrigin, Comment, Itinerary} = require("../database");
        
const { Op } = require("sequelize");
//cargamos la funcion generadora de itinerarios
const {generateItinerary} = require("./itineraryController");

//funcion para actualizar las calificaciones de los paquetes
const updateCalification = async() => {
   try {
      const paquetes = await Package.findAll({
         include: [ {model: Comment} ]
      });
      paquetes.forEach(async(ele) => {
         let cal = 0;
         let suma = 0;
         let n = 0;
         const comment = ele.Comments;
         if(comment.length>0) {
            comment.forEach(e => {
               suma+=Number(e.calification);
               n++;
            });
            cal = suma/n;
         };
         //actualizamos la calificacion
         const updateRow = await Package.update({qualification: cal},{where: {id: ele.id}});
         
      });    
   } catch (error) {
       console.log(error.message);
   }

};


//funcion para crear un nuevo paquete
const addPackages = async (objeto) => {
  const {
    idTypePackage,
    title,
    description,
    initialDate,
    finalDate,
    totalLimit,
    standarPrice,
    promotionPrice,
    duration,
    originCity,
    idAirline,
    outboundFlight,
    returnFlight,
    image,
    qualification,
    service,
    idContinent,
    idCountry,
    idCity,
    idHotel,
    activitys,
    itinerary
  } = objeto;

  //validamos la informacion recibida
  if(!title || !description ) throw Error("Titulo o descripcion no definidos");
  if(!initialDate || !finalDate ) throw Error("Fechas de Inicio o Final no definidas");
  if(!outboundFlight) throw Error("Datos vuelo ida nod efinidos");
  if(!returnFlight) throw Error("Datos retorno Vuelo no definidos");
  if(!service) throw Error("Servicios No definidos");
  if(!image) throw Error("Imagen del paquete No definida");

  //validamos las llaves foraneas y datos numericos
  if( typeof idTypePackage !== "number") throw Error("Tipo de paquete No definido");
  if( typeof duration !== "number") throw Error("Duracion No definida");
  if( typeof standarPrice !== "number") throw Error("Precio standar No definido");
  if( typeof promotionPrice !== "number") throw Error("Precio de Promocion No definido");
  if( typeof totalLimit !== "number") throw Error("Cupo Total No definido");
  if( typeof originCity !== "number") throw Error("Ciudad Origen No definida");
  if( typeof idAirline !== "number") throw Error("Aerolinea No definida");
  if( typeof idHotel !== "number") throw Error("Hotel No definido");
  if( typeof idContinent !== "number") throw Error("Continente No definido");
  if( typeof idCountry !== "number") throw Error("Pais No definido");
  

  //armamos el nuevo json a subir en la BD
  const newPackage = {
    idTypePackage,
    title,
    description,
    initialDate,
    finalDate,
    totalLimit,
    standarPrice,
    promotionPrice,
    duration,
    originCity,
    idAirline,
    outboundFlight,
    idContinent,
    idCountry,
    returnFlight,
    image,
    qualification,
    idCity,
    idHotel,
    service,
  };

  const packageCreated = await Package.create(newPackage);
  const id = packageCreated.id;
  if(typeof id !== "number") throw Error("Paquete No pudo ser Creado");

  //agregamos las actividades del paquete
  if(activitys.length>0){
    activitys.forEach(async (ele) => {
      const newActivity = {
        name: ele.name,
        image: ele.image,
        price: ele.price,
        included: ele.included,
        idPackage: id,
        duration: ele.duration,
      };
      await Activity.create(newActivity);
    });
  };


  // Agregar el itinerario al paquete recién creado
  if(itinerary) {
     //si se envio el itinerario con los datos del paquete
     const newItinerary = {
        itinerary: JSON.stringify(itinerary),
        idPackage: id, // Asocia el itinerario con el paquete
     };
     await Itinerary.create(newItinerary);
  } else { //no se envio el itinerario crearemos uno nuevo
        const ciudad = await City.findByPk(packageCreated.idCity);
        const pais = await Country.findByPk(packageCreated.idCountry);
        const continente = await Continent.findByPk(packageCreated.idContinent);

        const datos ={continent: continente.name,
                   country: pais.name,
                   city: ciudad.name,
                   duration: packageCreated.duration,
                   idPackage: packageCreated.id};
        const resul = await generateItinerary(datos);           
  }; 
   
  return packageCreated;
};

//Esta funcion devuelve todos los paquetes disponibles en la BD
const viewPackages = async () => {
  //primero llamamos a la funcion que actualiza las calificaciones de todos los paquetes
  await updateCalification();
  const paquetes = await Package.findAll({
    where: { active: true },
    include: [
      { association: "TypePackage", attributes: ["id", "name"] },
      { association: "Airline", attributes: ["id", "name"] },
      { association: "City", attributes: ["id", "name", "idCountry"] },
      { association: "Hotel", attributes: ["id", "name", "stars", "image", "calification", "details"]},
      { association: "Continent", attributes: ["id", "name"] },
      { association: "Country", attributes: ["id", "name"] },
      { association: "CityOrigin", attributes: ["id", "name"] },
      { model: Activity },
      { model: Comment },
      { model: Itinerary }
    ],
  });

  return paquetes;
};


//Esta funcion devuelve todos los paquetes disponibles y no disponibles en la BD
const viewPackagesAll = async () => {
  const paquetes = await Package.findAll({
    include: [
      { association: "TypePackage", attributes: ["id", "name"] },
      { association: "Airline", attributes: ["id", "name"] },
      { association: "City", attributes: ["id", "name", "idCountry"] },
      { association: "Hotel", attributes: ["id", "name", "stars", "image", "calification", "details"]},
      { association: "Continent", attributes: ["id", "name"] },
      { association: "Country", attributes: ["id", "name"] },
      { association: "CityOrigin", attributes: ["id", "name"] },
      { model: Activity },
      { model: Comment },
      { model: Itinerary }
    ],
  });
  return paquetes;
};

//Esta funcion devuelve un solo paquete mediante el ID
const getPackageById = async (idp) => {
  const paquete = await Package.findByPk(idp, {
    include: [
      { association: "TypePackage", attributes: ["id", "name"] },
      { association: "Airline", attributes: ["id", "name"] },
      { association: "City", attributes: ["id", "name", "idCountry"] },
      { association: "Hotel",attributes: ["id", "name", "stars", "image", "calification", "details"]},
      { association: "Continent", attributes: ["id", "name"] },
      { association: "Country", attributes: ["id", "name"] },
      { association: "CityOrigin", attributes: ["id", "name"] },
      { model: Activity },
      { model: Comment },
      { model: Itinerary }
    ],
  });
  return paquete;
};

//esta funcion hace una busqueda de paquetes en el campo titulo
const searchPackages = async (search) => {
  const paquetes = await Package.findAll({
    where: {
      active: true,
      title: {
        [Op.iLike]: `%${search}%`,
      },
    },
    include: [
      { association: "TypePackage", attributes: ["id", "name"] },
      { association: "Airline", attributes: ["id", "name"] },
      { association: "City", attributes: ["id", "name", "idCountry"] },
      { association: "Hotel",attributes: ["id", "name", "stars", "image", "calification", "details"]},
      { association: "Continent", attributes: ["id", "name"] },
      { association: "Country", attributes: ["id", "name"] },
      { association: "CityOrigin", attributes: ["id", "name"] },
      { model: Activity },
      { model: Comment },
      { model: Itinerary }
    ],
  });
  return paquetes;
};

//la sgte rutina almacena de forma masiva paquetes enviados desde un array
const addMassivePackages = async (array) => {
  array.forEach(async (objeto) => {
    await addPackages(objeto);
  });
  return "Array de paquetes cargado";
};

//la siguiente rutina permite modificar los paquetes
const updatePackages = async(objeto, idPackage) => {
    const {
       idTypePackage, title, description,
       initialDate, finalDate, totalLimit,
       standarPrice, promotionPrice, duration,
       originCity, idAirline, outboundFlight,
       returnFlight, image, qualification,
       service, idContinent, idCountry,
       idCity, idHotel,
    } = objeto;   

    //validamos la informacion recibida
    if(!idTypePackage || !title || !description ||
      !initialDate || !finalDate || !totalLimit ||
      !standarPrice || !promotionPrice || !duration ||
      !originCity || !idAirline || !outboundFlight ||
      !returnFlight || !image || !idContinent ||
      !idCountry || !idCity || !idHotel ||
      !qualification || !service) {
      return { message: "Datos Incompletos (3)" };
    };
    //actualizamos la info despues de haber validado
    const rows = await Package.update( objeto, { where: {id: idPackage} });
};

module.exports = {
  addPackages,
  viewPackages,
  getPackageById,
  searchPackages,
  addMassivePackages,
  updatePackages,
  viewPackagesAll,
};
