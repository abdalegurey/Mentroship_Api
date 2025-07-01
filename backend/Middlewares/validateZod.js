export const validate = (schema) => (req, res, next) => {

   const result = schema.safeParse(req.body);

    console.log("Validation result:", result);

    if (!result.success) {
     const formatted = result.error.format();
    console.log("Formatted errors:", formatted._errors);
    console.log("formetedkeys", Object.keys(formatted));
    console.log("formattedvalues", Object.values(formatted));
    console.log("result",result)
       
          return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.keys(formatted).map(field => ({
        field,
        message: formatted[field]?._errors?.[0] || 'Invalid input'
      }))
    });
    }

    next();


}

// export const validate = (schema) => (req, res, next) => {
//   const result = schema.safeParse(req.body);

//   if (!result.success) {
//     const formatted = result.error.format();

//     return res.status(400).json({
//       success: false,
//       message: "Validation failed",
//       errors: Object.keys(formatted).map(field => ({
//         field,
//         message: formatted[field]?._errors?.[0] || 'Invalid input'
//       }))
//     });
//   }

 
//   next();
// };
