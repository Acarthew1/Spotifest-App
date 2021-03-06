const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?client_id=337e3bf90cf94939a4f39b4bb4eca5ec&response_type=token&redirect_uri=https://spotifest-944cc.web.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private"
//const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?client_id=337e3bf90cf94939a4f39b4bb4eca5ec&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-public%20playlist-modify-private"
//const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?client_id=337e3bf90cf94939a4f39b4bb4eca5ec&response_type=token&redirect_uri=https://spoti-fest.co.uk/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

//https://spotifest-944cc.web.app/

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial
        }, {})
}

export default AUTH_ENDPOINT
