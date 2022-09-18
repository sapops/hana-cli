const cds = require('@sap/cds')

cds
  .connect("db")
  .then(({ db }) =>
    db?.before("READ", (req) =>{
        let from_ref = req?.context?.query?.SELECT?.from?.ref;

        Array.isArray(from_ref) && from_ref.forEach(
            (ref, index, array) => String(ref).startsWith("public.") && array.splice(index, 1, ref.replace("public.",""))
        );

    }
      
    )
  );

module.exports = class {}