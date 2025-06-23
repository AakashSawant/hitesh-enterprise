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
        const coverImage = data.cover;
        const productData = data.products;
        const productKeys = Object.keys(productData);
        const firstProduct = productData[productKeys[0]];

        const productTypes = Object.keys(firstProduct);
        const navContainer = $('.nav.flex-column');
        const contentContainer = $('.tab-content');

        navContainer.empty();
        contentContainer.empty();
        $("#details-div-section").css('background-image','url("'+coverImage+'")')
        $(".productName").text(category.replace('-', ' '))

        productTypes.forEach((typeKey, index) => {
            const typeData = firstProduct[typeKey];
            const isActive = index === 0 ? 'active' : '';

            // Tab Button
            const tabButton = `
                <button class="nav-link ${isActive}" id="tab${index + 1}-tab" data-bs-toggle="pill" data-bs-target="#tab${index + 1}" type="button" role="tab">
                    ${typeData.full_name || typeKey}
                </button>`;
            navContainer.append(tabButton);

            // Tab Content - Specifications
            let specList = '';
            for (const spec in typeData.key_specifications) {
                const value = Array.isArray(typeData.key_specifications[spec])
                    ? typeData.key_specifications[spec].join(', ')
                    : typeData.key_specifications[spec];
                specList += `<tr><td><strong>${spec}</strong></td><td>${value}</td></tr>`;
            }

            // Applications
            let applicationsList = '';
            if (typeData.applications) {
                applicationsList = typeData.applications.map(app => `<li>${app}</li>`).join('');
            }

            // Optional Benefits (for Dope Dyed)
            let benefitsSection = '';
            if (typeData.benefits) {
                let benefitItems = Object.entries(typeData.benefits).map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join('');
                benefitsSection = `
                    <h5 class="pb-2">Benefits:</h5>
                    <ul>${benefitItems}</ul>
                `;
            }

            // Optional Functional Variants
            let variantsSection = '';
            if (typeData.functional_variants) {
                const variants = typeData.functional_variants.map(v => `<li>${v}</li>`).join('');
                variantsSection = `
                    <h5 class="pb-2">Functional Variants:</h5>
                    <ul>${variants}</ul>
                `;
            }

            // Optional Value Added Services
            let valueServicesSection = '';
            if (typeData.value_added_services) {
                const services = typeData.value_added_services.map(s => `<li>${s}</li>`).join('');
                valueServicesSection = `
                    <h5 class="pb-2">Value-Added Services:</h5>
                    <ul>${services}</ul>
                `;
            }

            // Optional Dyeing Infrastructure
            let dyeInfraSection = '';
            if (typeData.dyeing_infrastructure) {
                const waterSystem = typeData.dyeing_infrastructure["Water System"];
                const capabilities = typeData.dyeing_infrastructure.Capabilities.map(c => `<li>${c}</li>`).join('');
                dyeInfraSection = `
                    <h5 class="pb-2">Dyeing Infrastructure:</h5>
                    <p><strong>Water System:</strong> ${waterSystem}</p>
                    <ul>${capabilities}</ul>
                `;
            }

            // Final Tab Content
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
                    ${benefitsSection}
                    ${variantsSection}
                    ${valueServicesSection}
                    ${dyeInfraSection}
                    <h5 class="pb-2">Applications:</h5>
                    <ul>${applicationsList}</ul>
                </div>`;

            contentContainer.append(tabContent);
        });
    }).fail(function () {
        $('#tab1').html('<p class="text-danger">Failed to load product data.</p>');
    });
});
