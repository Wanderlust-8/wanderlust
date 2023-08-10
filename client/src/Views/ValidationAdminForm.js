export function validationCreateForm (input){
    let errors={}

    const MayusRegex = /^[A-Z]/;
    const PriceRegex = /^\d+(\.\d{1,2})?$/

    const title =input.title
    const description = input.description
    const initialDate = input.initialDate
    const finalDate = input.finalDate
    const totalLimit = input.totalLimit
    const standarPrice=input.standarPrice
    const service = input.service
    const duration = input.duration
    const originCity = input.originCity
    const idAirline = input.idAirline
    const outboundFlight = input.outboundFlight
    const returnFlight = input.returnFlight
    const image = input.image
    const qualification = input.qualification
    const idContinent = input.idContinent
    const idCountry = input.idCountry
    const idCity = input.idCity
    const idHotel = input.idHotel

    if(!title){
        errors.title='Nombre del paquete es requerido'
    }
    if(!MayusRegex.test(title)){
        errors.title = 'por favor inicie con mayuscula'
    }
    if(title && title.length>100){
        errors.title = 'El nombre es demadiado largo'
    }
    
    if(!description){
        errors.description='Descripcion del paquete es requerida'
    }
    if(!MayusRegex.test(description)){
        errors.description = 'Por favor inicie con mayuscula'
    }
    if(description && description.length>150){
        errors.description = 'La descipción es demadiado larga'
    }

    if(!initialDate){
        errors.initialDate='Por favor selcciones una fecha de salida'
    }
    if(!finalDate){
        errors.finalDate='Por favor seleccione una fecha de regreso'
    }

    if(!totalLimit){
        errors.totalLimit='Por favor ingrese una cantidad de cupos valida'
    }

    if(totalLimit && totalLimit>100){
        errors.totalLimit='Por favor ingrese una cantidad de cupos entre 1 y 100'
    }

    if(!standarPrice){
        errors.standarPrice='Por favor ingrese un precio valido'
    }
    if(!PriceRegex.test(standarPrice)){
        errors.standarPrice='Por favor ingrese un precio valido'
    }
   
    if(service && service.length>150){
        errors.service = 'El servicio es demadiado largo'
    }

    if(!duration){
        errors.duration='Por favor ingrese una estancia valida'
    }
    if (duration && !isValidDuration(initialDate, finalDate, duration)) {
        errors.duration = 'La duración ingresada no coincide con las fechas seleccionadas';
      }
    if(!originCity){
        errors.originCity='Por favor seleccione una ciudad'
    }

    if(!idAirline){
        errors.idAirline='Por favor seleccione una aerolinea'
    }

    if(!outboundFlight){
        errors.outboundFlight='Por favor ingrese datos del Vuelo de salida'
    }

    if(!MayusRegex.test(outboundFlight)){
        errors.outboundFlight = 'Por favor inicie con mayuscula'
    }

    if(!returnFlight){
        errors.returnFlight='Por favor ingrese datos del Vuelo de regreso'
    }

    if(!MayusRegex.test(returnFlight)){
        errors.returnFlight = 'Por favor inicie con mayuscula'
    }

    if(!image){
        errors.image='Por favor cargue una imagen'
    }
    if(!qualification){
        errors.qualification='Por Favor ingrese un numero entre 1 y 5'
    }
    if(!idContinent){
        errors.idContinent='Por favor seleccione un continente'
    }
    if(!idCountry){
        errors.idCountry='Por favor seleccione un pais de destino'
    }
    if(!idCity){
        errors.idCity='Por favor seleccione una ciudad de destino'
    }
    if(!idHotel){
        errors.idHotel='Por favor seleccione un hote'
    }
    
    return errors

}


function isValidDuration(start, end, dur) {
    if (start && end && dur) {
      const differenceInDays = calculateDateDifference(start, end);
      return differenceInDays === Number(dur);
    }
    return true;
  }

  function calculateDateDifference(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(differenceInDays);
}
