function initializeSimpleSelect({ 
    selectId, 
    isSearchable = true, 
    isImage = true, 
    placeholder = 'Select an option', 
}) {
    console.log('Initializing Simple Select for ID:', selectId);

    const selectElement = document.getElementById(selectId); 
    if (selectElement) { 
        const parentNode = document.createElement('div');
        parentNode.className = 'simsl_select_wrapper';
        selectElement.parentNode.insertBefore(parentNode, selectElement); 
        parentNode.appendChild(selectElement);

        const dropDownElement = document.createElement('div'); 
        dropDownElement.className = 'simsl_select_items'; 

        const selectedDiv = document.createElement('div'); 
        selectedDiv.className = 'simsl_item_selected'; 
        selectedDiv.innerText = placeholder;

        parentNode.appendChild(selectedDiv); 
        parentNode.appendChild(dropDownElement); 

        if (isSearchable) {
            const searchInput = document.createElement('input'); 
            searchInput.className = 'simsl_search_input'; 
            searchInput.type = 'text';
            searchInput.placeholder = 'Search...';
            searchInput.id = `${selectId}_searchInput`;
            dropDownElement.appendChild(searchInput); 
        }

        Array.from(selectElement.options).forEach(optionData => {
            const optionDiv = document.createElement('div');
            optionDiv.setAttribute("country_id", optionData.getAttribute('value'));
            optionDiv.className = optionData.getAttribute('selected') ? 'selected' : '';

            const title = optionData.getAttribute('title');
            const value = optionData.getAttribute('value');
            const imgSrc = optionData.getAttribute('imgSrc');

            if (isImage && imgSrc && title) {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = title;
                optionDiv.appendChild(img);
            }

            const textNode = document.createTextNode(title);
            optionDiv.appendChild(textNode);

            optionDiv.addEventListener('click', () => {
                selectedDiv.innerHTML = optionDiv.innerHTML; 
                selectElement.value = value; 
                selectElement.dispatchEvent(new Event('change')); 
                parentNode.classList.toggle('simsl_dropdown_active');
            });

            dropDownElement.appendChild(optionDiv);
        });

        selectedDiv.addEventListener('click', () => {
            parentNode.classList.toggle('simsl_dropdown_active');
        });

        window.addEventListener('click', (e) => {
            if (!parentNode.contains(e.target)) {
                parentNode.classList.remove('simsl_dropdown_active');
            }
        });

        const selectItemsDiv = parentNode.querySelector('.simsl_select_items');

        if (isSearchable) {
            const searchInput = dropDownElement.querySelector(`#${selectId}_searchInput`);
            searchInput.addEventListener('input', () => {
                const filter = searchInput.value.toLowerCase();
                const options = selectItemsDiv.querySelectorAll('div');

                options.forEach(option => {
                    const text = option.textContent || option.innerText;
                    option.style.display = text.toLowerCase().includes(filter) ? '' : 'none';
                });
            });
        }

        const setSelectedCountry = setInterval(() => {
            const countryId = selectElement.querySelector('option:checked').value;
            const matchingElement = dropDownElement.querySelector(`[country_id="${countryId}"]`);
            if (matchingElement) {
                selectedDiv.innerHTML = matchingElement.innerHTML;
            }
        }, 100);

        setTimeout(() => {
            selectElement.dispatchEvent(new Event('change'));
            clearInterval(setSelectedCountry);
        }, 1000);
    } else { 
        console.error(`Element with ID #${selectId} not found.`); 
    }
}
