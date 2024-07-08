document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const referenceId = params.get('rid');
    const apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=kbXyfmGrP4X21o_MK10z55LaNQmlrKTQTQd67WMbdbPdjoJFV9uG0AKPX2yxi30BTSaFLSufc6U4xnPy5nGOUNqT9DF_OYRrm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIsDKIwUYotFyfNcVJzJqmGvSULHARThWuHBgSnTNoz3Hkdorz0XnkR2v4yGSrYHvxSksElpiPxenQZ_yswogU_iKlrA50qxHQ&lib=MtPXOhk1BstOikaykFYxCauM4e3ywuRvV';

    if (referenceId) {
        console.log('Reference ID:', referenceId);  // Log reference ID
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);  // Log fetched data

                // Check if data.data exists and is an array
                if (data && Array.isArray(data.data)) {
                    const result = data.data.find(row => row.rid === referenceId);
                    console.log('Result:', result);  // Log the found result

                    if (result) {
                        document.getElementById('certificate_number').textContent = result.certificate_number;
                        document.getElementById('name').textContent = result.name;
                        document.getElementById('designation').textContent = result.designation;
                        document.getElementById('institute').textContent = result.institute;
                        document.getElementById('workshop_organizer').textContent = result.workshop_organizer;
                        document.getElementById('workshop_name').textContent = result.workshop_name;
                        document.getElementById('workshop_date').textContent = result.workshop_date;
                        document.getElementById('avatar').src = result.avatar_url || "https://i.stack.imgur.com/34AD2.jpg";
                    } else {
                        document.getElementById('certificate-details').style.display = 'none';
                        document.getElementById('no-data').style.display = 'block';
                    }
                } else {
                    console.error('Error: Invalid data structure:', data);
                    document.getElementById('certificate-details').style.display = 'none';
                    document.getElementById('no-data').style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching the API data:', error);
                document.getElementById('certificate-details').style.display = 'none';
                document.getElementById('no-data').style.display = 'block';
            });
    } else {
        document.getElementById('certificate-details').style.display = 'none';
        document.getElementById('no-data').style.display = 'block';
    }
});
