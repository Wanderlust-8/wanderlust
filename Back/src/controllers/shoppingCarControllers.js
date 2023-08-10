const { ShoppingCar, ItemsShoppingCar, Package, User } = require("../database");

//esta funcion calcula el valor total y actualiza en el fullValue del carrito
const updateTotal = async (idCar) => {
  const items = await ItemsShoppingCar.findAll({
    where: { idShoppingCar: idCar },
  });
  let suma = 0;
  items.forEach((ele) => {
    suma += ele.amount * ele.unitPrice;
  });
  try {
    const actualizado = await ShoppingCar.update(
      { fullValue: suma },
      { where: { id: idCar } }
    );
    return true;
  } catch (error) {
    return false;
  }
};


//esta funcion agrega items al carrito existente
const addItemsShoppingCar = async (item, id) => {
  const {
    amount,
    unitPrice,
    totalPrice,
    typeProduct,
    idProduct,
    title,
    image,
  } = item;

  if (
    !amount ||
    !unitPrice ||
    !totalPrice ||
    !typeProduct ||
    !idProduct ||
    !title ||
    !id ||
    !image
  ) {
    return { message: "Informacion Incompleta" };
  }
  const idCar = Number(id);
  //buscamos si ya existe el articulo dentro de los ya grabados
  const existe = await ItemsShoppingCar.findOne({
    where: { idShoppingCar: idCar, typeProduct, idProduct },
  });
  const newItem = {
    amount,
    unitPrice,
    totalPrice,
    typeProduct,
    idProduct,
    title,
    image,
    idShoppingCar: idCar,
  };
  //si no existe lo agregamos a los items
  if (existe == null) {
    const itemAdd = await ItemsShoppingCar.create(newItem);
  } else {
    //si ya existe actualizamos la cantidad
    const rows = ItemsShoppingCar.update(item, { where: { id: existe.id } });
 
  };
  const carUpdate = await updateTotal(idCar);
  console.log(carUpdate);
  //ahora devolvemos todo la info del carrito actualizado
  const car = await ShoppingCar.findByPk(idCar, {
    include: { model: ItemsShoppingCar },
  });
  return car;
};

//esta funcion crea un carrito nuevo para el usuario registrado
const addShoppingCar = async (uid) => {
  if (!uid) return { message: "Uid de Usuario No definido" };
  // Busca el usuario por uid
  const user = await User.findOne({ where: { uid: uid } });
  if (!user) return { message: "Usuario no encontrado" };
  // Usa el uid del usuario para crear el carrito de compras
  const [newCar, created] = await ShoppingCar.findOrCreate({
    where: { state: 0, idBill: 0, fullValue: 0, uidUser: uid, idUser: user.id },
  });
  return { idcar: newCar.id };
};


//esta rutina elimina items del carrito de compras
const deleteItemsShoppingCar = async (id) => {
 
  //eliminamos los items del carro de compras
  const idItem = Number(id);
  const existe = await ItemsShoppingCar.findByPk(idItem);
  const idCar = existe.idShoppingCar;

  if (existe !== null) {
    await existe.destroy();
  }
  //actualizamos el nuevo valor del carrito de compras
  const carUpdate = updateTotal(idCar);
  //hora devolvemos todo la info del carrito actualizada
  const car = await ShoppingCar.findByPk(idCar, {
    include: { model: ItemsShoppingCar },
  });
  return car;
};


//esta rutina devuelve el carrito identificado por el UID del usuario
const getShoppingCarByUser = async (uid) => {
  if (!uid) return { message: "Uid de Usuario No definido" };

  // Busca el carrito por uidUser
  const car = await ShoppingCar.findOne({
    where: { uidUser: uid },
    include: { model: ItemsShoppingCar },
  });
  if (!car) return { message: "Carrito no encontrado" };
  return car;
};


//esta rutina devuelve el carrito identificado por ID del carrito
const getShoppingCarById = async (id) => {
  const idCar = Number(id);
  const car = await ShoppingCar.findByPk(idCar, {
    include: { model: ItemsShoppingCar },
  });
  if (!car) return { message: "Carrito inexistente" };
  return car;
};


//esta ruta vacia completamente el carrito
const emptyShoppingCar = async (id) => {
  const idCar = Number(id);
  const registros = await ItemsShoppingCar.destroy({
    where: { idShoppingCar: idCar },
  });
  const carUpdate = await updateTotal(idCar);
  const car = await ShoppingCar.findByPk(idCar, {
    include: { model: ItemsShoppingCar },
  });
  return car;
};


//esta ruta devuelve todos los carritos
const getShoppingCar = async () => {
  const carritos = ShoppingCar.findAll();
  return carritos;
};

module.exports = {
  addShoppingCar,
  getShoppingCar,
  addItemsShoppingCar,
  deleteItemsShoppingCar,
  getShoppingCarById,
  getShoppingCarByUser,
  emptyShoppingCar,
};