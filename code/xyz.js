document.addEventListener('DOMContentLoaded', () => { 

const form = document.getElementById('myForm'); 
const editButton = document.getElementById('editButton'); 
const submitButton = document.getElementById('submitButton'); 
const inputs = form.querySelectorAll('input, textarea'); 
const formDataContainer = document.getElementById('formData');
const storedName = document.getElementById('storedName'); 
const storedEmail = document.getElementById('storedEmail'); 
const storedMessage = document.getElementById('storedMessage'); 

const storedFormData = JSON.parse(localStorage.getItem('formData')) || {};
 
document.getElementById('name').value = storedFormData.name || ''; 
document.getElementById('email').value = storedFormData.email || ''; 
document.getElementById('message').value = storedFormData.message || ''; 


  
form.addEventListener('submit', async (e) => {
 e.preventDefault();
 
 const isValid = await validateFormData();
 if (isValid)
	 { 
       inputs.forEach(input => { 
          input.readOnly = true; 
		  });
		  
		submitButton.disabled = true;
		editButton.disabled = false;

        const formData = { name: document.getElementById('name').value, email: document.getElementById('email').value, message: 
        document.getElementById('message').value, }; 

        localStorage.setItem('formData', JSON.stringify(formData)); 

        displayStoredFormData(formData);
     }
 else 
     {
	 alert('Form data is not valid.'); 
     }
 
 }); 
 
 editButton.addEventListener('click', () => { 
   inputs.forEach(input => {
       input.readOnly = false;
	   }); 
	   
    submitButton.disabled = false;
    editButton.disabled = true;
    formDataContainer.classList.add('hidden');
 }); 
 
 async function validateFormData(){ 
   return true; 
   } 
   
function displayStoredFormData(formData) { 

storedName.textContent = formData.name; 
storedEmail.textContent = formData.email; 
storedMessage.textContent = formData.message; 
formDataContainer.classList.remove('hidden'); 

} 
});

