document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const referenceId = params.get('rid');
    const apiUrl = 'https://script.google.com/macros/s/AKfycby6VcNPepcFIuZGPSi1DtS5Jl7p8EQK69tmVHjCY6PInyk8MDkTVcdjNsKYLGcl_xNVhg/exec'; // Updated API URL

    if (referenceId) {
        console.log('Reference ID:', referenceId);  // Log reference ID
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);  // Log fetched data

                // Check if data.data exists and is an array
                if (data && Array.isArray(data.data)) {
                    const records = data.data;
                    const result = records.find(row => row.rid === referenceId);
                    console.log('Result:', result);  // Log the found result

                    if (result) {
                        // Display the result data in the respective HTML elements
                        document.getElementById('rid').textContent = result.rid;
                        document.getElementById('name').textContent = result.name;
                        document.getElementById('position').textContent = result.position;
                        document.getElementById('domain').textContent = result.domain;
                        document.getElementById('time_range').textContent = result['time range'];
                        document.getElementById('projects').textContent = result.projects;
                        document.getElementById('certificate-details').style.display = 'table-row-group'; // Ensure the details are visible
                        document.getElementById('no-data').style.display = 'none'; // Hide the "no data" message
                    } else {
                        // If no result found for the provided rid, show the "no data" message
                        document.getElementById('certificate-details').style.display = 'none';
                        document.getElementById('no-data').style.display = 'block';
                    }
                } else {
                    // If the data structure is invalid, show the "no data" message
                    console.error('Error: Invalid data structure:', data);
                    document.getElementById('certificate-details').style.display = 'none';
                    document.getElementById('no-data').style.display = 'block';
                }
            })
            .catch(error => {
                // Handle any errors that occur during the fetch
                console.error('Error fetching the API data:', error);
                document.getElementById('certificate-details').style.display = 'none';
                document.getElementById('no-data').style.display = 'block';
            });
    } else {
        // If no rid parameter is found in the URL, show the "no data" message
        document.getElementById('certificate-details').style.display = 'none';
        document.getElementById('no-data').style.display = 'block';
    }
});
