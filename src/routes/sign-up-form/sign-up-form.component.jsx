import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from '../../components/form-input/form-input.component'

const defaultformFields = {
   displayName:'',
   email:'',
   password:'',
   confirmPassword:''
}

const SignUpForm = ()=> {
   const [formFields, setformFields] = useState(defaultformFields);
   const {displayName, email, password, confirmPassword} = formFields;

   const handleChange = (event)=> {
      const {name, value} = event.target;
      setformFields({...formFields, [name]:value});
   };

   const resetformFields = ()=>{
      setformFields(defaultformFields);
   }

   const handleSubmit = async(event)=>{
      event.preventDefault();

      if (password !== confirmPassword){
         alert('Passwords do not match');
         return; 
      }

      try { 
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        console.log(user);
        if (user != null){
            const myobject = {
               displayName : displayName,
               email: email,
               uid:user.uid
            }

            await createUserDocumentFromAuth(myobject);
            console.log(user.uid);
        }
      } 
      catch(error){
         console.log(error.message);
      }
      resetformFields();
   }

   return (
      <div>
         <h1> Sign up with an email and password</h1>
         <form onSubmit={handleSubmit}>
            <FormInput 
               label='Display Name'
               type='text'
               onChange={handleChange} 
               name= 'displayName' 
               value= {displayName}/>
            <FormInput 
               label='Email'
               type='email'
               onChange={handleChange} 
               name= 'email' 
               value= {email}/>
            <FormInput 
               label='password'
               type='password'
               onChange={handleChange} 
               name= 'password' 
               value= {password}/>
            <FormInput 
               label='confirm password'
               type='password'
               onChange={handleChange} 
               name= 'confirmPassword' 
               value= {confirmPassword}/>                              
            <button type='submit'> Sign Up</button>                                   
         </form>
      </div>
   )
}
export default SignUpForm;