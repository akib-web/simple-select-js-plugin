const simpleSelect = {
    isSearchable : true,
    isImage : true,
    placeholder : 'Select an option',
    render : ([selectId]) => {
        console.log('id',selectId);
        console.log('id',simpleSelect.isSearchable);
        // Get the select element by its ID
        const selectElement = document.getElementById(selectId); 
        if (selectElement) { 
            // Step 2: Create the new parent element 
            const parentNode = document.createElement('div'); parentNode.className = 'simsl_select_wrapper'; 
            // Step 3: Insert the new parent element before the #calculator_sendto element 
            selectElement.parentNode.insertBefore(parentNode, selectElement); 
            // Step 4: Move the #calculator_sendto element inside the new parent element 
            parentNode.appendChild(selectElement); 
            console.log('Parent node created and appended successfully.'); 

            const dropDownElement = document.createElement('div'); 
            dropDownElement.className = 'simsl_select_items'; 
            const selectedDiv = document.createElement('div'); 
            selectedDiv.className = 'simsl_item_selected'; 
            selectedDiv.innerText = simpleSelect.placeholder;
            
            parentNode.appendChild(selectedDiv); 
            parentNode.appendChild(dropDownElement); 
            console.log('dropDownElement node created and appended successfully.'); 
            if(simpleSelect.isSearchable){
                const searchInput = document.createElement('input'); 
                searchInput.className = 'simsl_search_input'; 
                searchInput.type = 'text';
                searchInput.placeholder = 'Search...';
                searchInput.id = 'searchInput';
                dropDownElement.appendChild(searchInput); 
            }
            console.log('searchInput node created and appended successfully.'); 

            Array.from(selectElement.options).forEach(optionData => {
                const optionDiv = document.createElement('div');
                const img = document.createElement('img');
                // console.warn(optionData.getAttribute('imgSrc'));
                var imgSrc = optionData.getAttribute('imgSrc');
                var title = optionData.getAttribute('title');
                var value = optionData.getAttribute('value');

                img.src = imgSrc;
                img.alt = title;
                const textNode = document.createTextNode(title);
                optionDiv.appendChild(img);
                optionDiv.appendChild(textNode);

                optionDiv.addEventListener('click', () => {
                    selectedDiv.innerHTML = optionDiv.innerHTML; // Set the simsl_item_selected item
                    selectElement.value = value; // Set the value for form submission
                    //selectItemsDiv.style.display = 'none'; // Close the dropdown
                    parentNode.classList.toggle('active');
                });

                dropDownElement.appendChild(optionDiv);
            });

            // Toggle dropdown visibility
            selectedDiv.addEventListener('click', () => {
                parentNode.classList.toggle('active');
            });

            // Close dropdown if clicked outside
            window.addEventListener('click', (e) => {
                if (!parentNode.contains(e.target)) {
                    parentNode.classList.remove('active');
                }
            });

            const selectItemsDiv = parentNode.querySelector('.simsl_select_items');
            // Search functionality
            if(simpleSelect.isSearchable){
                searchInput.addEventListener('input', () => {
                    const filter = searchInput.value.toLowerCase();
                    const options = selectItemsDiv.querySelectorAll('div');

                    options.forEach(option => {
                        const text = option.textContent || option.innerText;
                        if (text.toLowerCase().indexOf(filter) > -1) {
                            option.style.display = '';
                        } else {
                            option.style.display = 'none';
                        }
                    });
                });
            }
        } 
        else{ 
            console.error('Element with ID #calculator_sendto not found.'); 
        }
    },
}