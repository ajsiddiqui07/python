document.addEventListener('DOMContentLoaded', () => {
    const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
    const msgDiv = document.getElementById('msg');
    let hideTimer = null;

    function showMessage(text, isError) {
        if (!msgDiv) {
            return;
        }
        msgDiv.textContent = text;
        msgDiv.style.display = 'block';
        msgDiv.style.color = isError ? '#dc2626' : '#166534';
        msgDiv.style.backgroundColor = isError ? '#fee2e2' : '#dcfce7';
        msgDiv.style.border = isError ? '1px solid #fca5a5' : '1px solid #86efac';
        msgDiv.style.padding = '10px 14px';
        msgDiv.style.marginBottom = '12px';
        msgDiv.style.borderRadius = '4px';

        if (hideTimer) {
            clearTimeout(hideTimer);
        }
        hideTimer = setTimeout(() => {
            msgDiv.style.display = 'none';
            msgDiv.textContent = '';
        }, 3000);
    }

    document.querySelectorAll('.save-beds-btn').forEach((button) => {
        button.addEventListener('click', async () => {
            const pk = button.dataset.pk;
            const row = button.closest('tr');
            const input = row.querySelector('.beds-input');
            const bedsCell = row.querySelector('.beds-cell');
            const rawValue = input.value.trim();
            const parsedValue = rawValue === '' ? null : Number(rawValue);

            try {
                const response = await fetch(`/pgs/${pk}/beds/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfInput ? csrfInput.value : '',
                    },
                    body: JSON.stringify({ available_beds: parsedValue }),
                });
                const data = await response.json();

                if (response.ok) {
                    bedsCell.textContent = data.available_beds;
                    showMessage(`Beds updated for ${data.name}`, false);
                } else {
                    showMessage(data.error || 'Failed to update beds.', true);
                }
            } catch (err) {
                showMessage('Network error while updating beds.', true);
            }
        });
    });
});
