$(document).ready(function() {

    const orderData = {
        items: [
            { id: 101, name: "Premium Wireless Headphones", qty: 1, price: 299.99, image: "https://via.placeholder.com/60" },
            { id: 102, name: "Wireless Earbuds Pro", qty: 2, price: 179.99, totalPrice: 359.98, image: "https://via.placeholder.com/60" }
        ],
        subtotal: 659.97,
        shippingFee: 0,
        taxAmount: 52.80,
        total: 712.77
    };

    function drawSummary() {
        let html = '';
        orderData.items.forEach(item => {
            html += `
                <div class="d-flex align-items-center mb-3">
                    <img src="${item.image}" class="product-img me-3">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 text-truncate-2 fw-bold">${item.name}</h6>
                        <small class="text-muted">Qty: ${item.qty}</small>
                    </div>
                    <div class="fw-medium ms-2">$${(item.totalPrice || item.price).toFixed(2)}</div>
                </div>`;
        });
        $('#orderItemsContainer').html(html);
        $('#subtotal').text(`$${orderData.subtotal}`);
        $('#shipping').text("FREE");
        $('#tax').text(`$${orderData.taxAmount}`);
        $('#totalPrice').text(`$${orderData.total}`);
    }
    drawSummary();

    
    // (Regex Patterns)
    const patterns = {
        fullName: /^[a-zA-Z\s]{3,50}$/, 
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phone: /^\+?[0-9]{10,15}$/, 
        address: /^[a-zA-Z0-9\s,.'-]{10,}$/, 
        city: /^[a-zA-Z\s]{2,30}$/,
        state: /^[a-zA-Z\s]{2,20}$/,
        zipCode: /^\d{5,10}$/,
        cardNumber: /^\d{16}$/,
        cardName: /^[a-zA-Z\s]{3,50}$/,
        expiryDate: /^(0[1-9]|1[0-2])\/?([2-9][0-9])$/, 
        cvv: /^\d{3,4}$/
    };

    function validateField(id, pattern, errorMsg) {
        const $field = $(`#${id}`);
        const value = $field.val().trim();
        const isValid = pattern.test(value);

        $field.removeClass('is-invalid is-valid');
        $field.next('.invalid-feedback').remove(); 

        if (!isValid) {
            $field.addClass('is-invalid');
            $field.after(`<div class="invalid-feedback">${errorMsg}</div>`);
            return false;
        } else {
            $field.addClass('is-valid');
            return true;
        }
    }

    $('#placeOrderBtn').on('click', function() {
        let isAllValid = true;

        $('.invalid-feedback').remove();
        $('.form-control, .form-select').removeClass('is-invalid is-valid');

        isAllValid &= validateField('fullName', patterns.fullName, "Please enter a valid name (letters only, min 3).");
        isAllValid &= validateField('email', patterns.email, "Please enter a valid email address.");
        isAllValid &= validateField('phone', patterns.phone, "Enter a valid phone number (10-15 digits).");
        isAllValid &= validateField('address', patterns.address, "Address must be at least 10 chars (letters/numbers).");
        isAllValid &= validateField('city', patterns.city, "Valid city name required.");
        isAllValid &= validateField('state', patterns.state, "Valid state name required.");
        isAllValid &= validateField('zipCode', patterns.zipCode, "ZIP code must be 5-10 digits.");
        
        if (!$('#country').val()) {
            $('#country').addClass('is-invalid').after('<div class="invalid-feedback">Please select a country.</div>');
            isAllValid = false;
        } else {
            $('#country').addClass('is-valid');
        }

        let cleanCard = $('#cardNumber').val().replace(/\s/g, '');
        if(!patterns.cardNumber.test(cleanCard)) {
            $('#cardNumber').addClass('is-invalid').after('<div class="invalid-feedback">Card must be 16 digits.</div>');
            isAllValid = false;
        } else {
            $('#cardNumber').addClass('is-valid');
        }

        isAllValid &= validateField('cardName', patterns.cardName, "Name on card must be letters only.");
        isAllValid &= validateField('expiryDate', patterns.expiryDate, "Use MM/YY format.");
        isAllValid &= validateField('cvv', patterns.cvv, "CVV must be 3 or 4 digits.");

        if (isAllValid) {
            const finalData = {
                customer: { name: $('#fullName').val(), email: $('#email').val(), phone: $('#phone').val() },
                shipping: { address: $('#address').val(), city: $('#city').val(), country: $('#country').val() },
                payment: { cardNum: cleanCard, expiry: $('#expiryDate').val() },
                order: orderData,
                timestamp: new Date().toISOString()
            };

            console.log("SUCCESS:", finalData);
            alert("Order placed successfully!");
        } else {
            $('html, body').animate({
                scrollTop: ($('.is-invalid').first().offset().top - 120)
            }, 500);
        }
    });

    $('#cardNumber').on('input', function() {
        let v = $(this).val().replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let parts = v.match(/.{1,4}/g);
        $(this).val(parts ? parts.join(' ') : '');
    });
});