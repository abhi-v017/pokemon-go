function apidata() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            console.log('data fetched successfully', data)
        })
        .catch(error => {
            console.error('An error occurred:', error.message);
        })
}
apidata()