$(document).ready(function () {
    // Helper: Get URL parameter by name
    function getParameterByName(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // Fetch data based on category
    const category = getParameterByName('category');
    if (!category) {
        $('#tab1').html('<p class="text-danger">No category specified in URL.</p>');
        return;
    }

    const jsonPath = `assets/files/products/${category}.json`;

    $.getJSON(jsonPath, function (data) {
        const productData = data.products;
        const productKeys = Object.keys(productData);
        const firstProduct = productData[productKeys[0]];

        const productTypes = Object.keys(firstProduct);
        const navContainer = $('.nav.flex-column');
        const contentContainer = $('.tab-content');

        navContainer.empty();
        contentContainer.empty();

        productTypes.forEach((typeKey, index) => {
            const typeData = firstProduct[typeKey];
            const isActive = index === 0 ? 'active' : '';

            // Tab Button
            const tabButton = `
                <button class="nav-link ${isActive}" id="tab${index + 1}-tab" data-bs-toggle="pill" data-bs-target="#tab${index + 1}" type="button" role="tab">
                    ${typeData.full_name || typeKey}
                </button>`;
            navContainer.append(tabButton);

            // Tab Content
            let specList = '';
            for (const spec in typeData.key_specifications) {
                const value = Array.isArray(typeData.key_specifications[spec])
                    ? typeData.key_specifications[spec].join(', ')
                    : typeData.key_specifications[spec];
                specList += `<tr><td><strong>${spec}</strong></td><td>${value}</td></tr>`;
            }

            const applicationsList = typeData.applications.map(app => `<li>${app}</li>`).join('');

            const tabContent = `
                <div class="tab-pane fade show ${isActive}" id="tab${index + 1}" role="tabpanel">
                    <h4 class="pb-2">${typeData.full_name}</h4>
                    <p>${typeData.short_description}</p>
                    <h5 class="pb-2 pt-2">Key Specifications:</h5>
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <tbody>${specList}</tbody>
                        </table>
                    </div>
                    <h5 class="pb-2">Applications:</h5>
                    <ul>${applicationsList}</ul>
                </div>`;
            contentContainer.append(tabContent);
        });
    }).fail(function () {
        $('#tab1').html('<p class="text-danger">Failed to load product data.</p>');
    });
});
