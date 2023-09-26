document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const submitButton = document.getElementById('submitButton');
    const inputs = form.querySelectorAll('input, textarea');
    const formDataContainer = document.getElementById('formData');
    const formDataBody = document.getElementById('formDataBody');

    let storedFormDataList = JSON.parse(localStorage.getItem('formDataList')) || [];

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isValid = await validateFormData();
        if (isValid) {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            storedFormDataList.push(formData);

            localStorage.setItem('formDataList', JSON.stringify(storedFormDataList));

            inputs.forEach(input => {
                input.value = ''; // Clear the input fields
            });

            // Refresh the displayed entries
            displayStoredFormDataList(storedFormDataList);
        } else {
            alert('Form data is not valid.');
        }
    });

    async function validateFormData() {
        return true; // You can add validation logic here
    }

    function displayStoredFormDataList(formDataList) {
        // Clear the existing table body
        formDataBody.innerHTML = '';

        // Loop through the stored form data and add rows to the table
        formDataList.forEach((formData, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formData.name}</td>
                <td>${formData.email}</td>
                <td>${formData.message}</td>
                <td>
                    <button onclick="editEntry(${index})">Edit</button>
                    <button onclick="deleteEntry(${index})">Delete</button>
                </td>
            `;
            formDataBody.appendChild(row);
        });

        // Show the table
        formDataContainer.classList.remove('hidden');
    }

    // Edit an entry
    window.editEntry = function (index) {
        const entryToEdit = storedFormDataList[index];
        if (entryToEdit) {
            // Populate the form with the selected entry's data
            document.getElementById('name').value = entryToEdit.name;
            document.getElementById('email').value = entryToEdit.email;
            document.getElementById('message').value = entryToEdit.message;

            // Remove the entry from the list
            storedFormDataList.splice(index, 1);

            // Update local storage
            localStorage.setItem('formDataList', JSON.stringify(storedFormDataList));

            // Enable the submit button
            submitButton.disabled = false;

            // Refresh the displayed entries
            displayStoredFormDataList(storedFormDataList);
        }
    };

    // Delete an entry
    window.deleteEntry = function (index) {
        if (confirm('Are you sure you want to delete this entry?')) {
            storedFormDataList.splice(index, 1);

            // Update local storage
            localStorage.setItem('formDataList', JSON.stringify(storedFormDataList));

            // Refresh the displayed entries
            displayStoredFormDataList(storedFormDataList);
        }
    };

    // Display any existing stored data on page load
    displayStoredFormDataList(storedFormDataList);
});
