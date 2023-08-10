const {Activity, Package} = require('../database');

//esta funcion trae todas las actividades
const getActivity = async () => {
   const actiDb = await Activity.findAll();
   return actiDb;
};

//esta funcion devuelve actividad buscada por ID.
const getActivityById = async (id) => {
    const idAct = Number(id);
    const actiBd = await Activity.findByPk(idAct);
    return actiBd;
};

//esta funcion devuelve actividades buscadas por el name
const searchNameActivity = async (name) => {
    const activiDb = await Activity.findAll({
        where: {
            name:name
        },
    })
    return activiDb;
};

//funcion que guarda una sola actividad
const createActivity = async (name, image, price, included, duration, idPackage, totalLimit) => {
   if(!totalLimit)  totalLimit = 0; 
   try{
    const newActivity = await Activity.create({name, image, price, included, duration, idPackage, totalLimit})
   }catch (error) {
    console.error(error.message);
  }
   
};

//funcion para guardar varias actividades en un paquete
const createMassiveActivitys = async(array) => {
   if(array.length === 0) throw Error("Array enviado se enuentra vacio") ;
   const idP = array[0].idPackage;
   await Activity.bulkCreate(array);
   //actualizamos el campo totalLimit
   const paq = Package.findByPk(idP);
   await Activity.update({totalLimit: paq.totalLimit}, {where: {idPackage: idP}});
   return {message: "Actividades cargadas"};
};

//funcion para desactivar actividades
const desactivActivity = async (id, available) => {
  await Activity.update({ available: available }, { where: { id: id } });
  const activDesa = await Activity.findByPk(id);
  return activDesa;
}


//funcion para editar actividades
const updateActivity = async (id, newData) => {
    // Utiliza el método update de Sequelize para modificar los datos en la base de datos
    await Activity.update(newData, {
      where: { id: id },
    });
    
    // Después de la actualización, obtén los datos actualizados
    const updatedActivity = await Activity.findByPk(id);
    return updatedActivity;
  };
  




module.exports = {
    getActivity,
    searchNameActivity,
    createActivity,
    getActivityById,
    desactivActivity,
    updateActivity,
    createMassiveActivitys,
}


