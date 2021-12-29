export const printData=(errors,field,type)=>{
    // errors should be mapped from express validator
    if(errors!==undefined && errors[field]!==undefined && errors[field][type]!==undefined) {
        //console.log(errors[field][type]) 
        return errors[field][type];
    } else {
            return "";
        };
}