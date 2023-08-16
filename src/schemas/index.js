import * as yup from "yup";
// validation for input field
export const signUpSchema = yup.object({
  Create_Group: yup.string().min(3,"Group Name Must Be At Least 3 Charachters").max(15).required("*Please Enter Group Name*"),
  description: yup
    .string()
    .min(10,"Description Must Be At Least 10 Charachters")
    .max(50)
    .required("*Please Enter Description*"),
  term: yup.array(
    yup.object({
      Enter_Term: yup
        .string()
        .min(3, "Written Term Have Contains Minimum 3 characters")
        .max(20, "Written Term Have Contains Maximum 20 characters")
        .required("*Please Enter Term*"),
      Enter_Definition: yup
        .string()
        .min(5, "Written Defination Have Contains Minimum 5 characters")
        .max(250, "Written Defination Have Contains Minimum 250 characters")
        .required("*Please Enter Definition*"),
    })
  ),
});
