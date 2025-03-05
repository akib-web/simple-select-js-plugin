function initializeSimpleSelect({ 
    selectId, 
    isSearchable = true, 
    isImage = true, 
    placeholder = 'Select an option', 
}) {
    console.log('Initializing Simple Select for ID:', selectId);

    let selectElement = document.getElementById(selectId); 
    if (selectElement) { 
        let parentNode = document.createElement('div');
        parentNode.className = `${selectId}_simsl_select_wrapper simsl_select_wrapper`;
        selectElement.parentNode.insertBefore(parentNode, selectElement); 
        parentNode.appendChild(selectElement);

        let dropDownElement = document.createElement('div'); 
        dropDownElement.className = `${selectId}_simsl_select_items simsl_select_items`; 

        let selectedDiv = document.createElement('div'); 
        selectedDiv.className = `${selectId}_simsl_item_selected simsl_item_selected`; 
        selectedDiv.innerText = placeholder;

        parentNode.appendChild(selectedDiv); 
        parentNode.appendChild(dropDownElement); 

        if (isSearchable) {
            let searchInput = document.createElement('input'); 
            searchInput.className = `${selectId}_simsl_search_input simsl_search_input`; 
            searchInput.type = 'text';
            searchInput.placeholder = 'Search...';
            searchInput.id = `${selectId}_searchInput`;
            dropDownElement.appendChild(searchInput); 
        }

        Array.from(selectElement.options).forEach(optionData => {
            let optionDiv = document.createElement('div');
            optionDiv.setAttribute("country_id", optionData.getAttribute('value'));
            optionDiv.className = optionData.getAttribute('selected') ? 'selected' : '';

            let title = optionData.getAttribute('title');
            let value = optionData.getAttribute('value');
            let imgSrc = optionData.getAttribute('imgSrc');

            if (isImage && imgSrc && title) {
                let img = document.createElement('img');
                img.src = imgSrc;
                img.alt = title;
                optionDiv.appendChild(img);
            }

            let textNode = document.createTextNode(title);
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

        let selectItemsDiv = parentNode.querySelector(`.${selectId}_simsl_select_items`);

        if (isSearchable) {
            let searchInput = dropDownElement.querySelector(`#${selectId}_searchInput`);
            searchInput.addEventListener('input', () => {
                let filter = searchInput.value.toLowerCase();
                let options = selectItemsDiv.querySelectorAll('div');

                options.forEach(option => {
                    let text = option.textContent || option.innerText;
                    option.style.display = text.toLowerCase().includes(filter) ? '' : 'none';
                });
            });
        }

        let setSelectedCountry = setInterval(() => {
            let countryId = selectElement.querySelector('option:checked').value;
            let matchingElement = dropDownElement.querySelector(`[country_id="${countryId}"]`);
            if (matchingElement) {
                selectedDiv.innerHTML = matchingElement.innerHTML;
            }
        }, 100);

        // setTimeout(() => {
            // selectElement.dispatchEvent(new Event('change'));
            // clearInterval(setSelectedCountry);
        // }, 1000);

        window.onload = () => {
            let interval = setInterval(() => {
                if (selectElement) {
                    selectElement.dispatchEvent(new Event('change'));
                    clearInterval(interval);
                    clearInterval(setSelectedCountry);
                }
            }, 100); // Check every 500ms until it's ready
        };
    } else { 
        console.error(`Element with ID #${selectId} not found.`); 
    }
}
