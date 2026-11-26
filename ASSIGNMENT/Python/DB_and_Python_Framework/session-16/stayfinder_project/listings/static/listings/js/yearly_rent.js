document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('yearly-rent-btn');
    const output = document.getElementById('yearly-rent-output');

    if (!button || !output) {
        return;
    }

    button.addEventListener('click', () => {
        const monthlyRent = Number(button.dataset.rent);
        const yearlyRent = monthlyRent * 12;
        output.textContent = `Yearly rent: ₹${yearlyRent}`;
    });
});
