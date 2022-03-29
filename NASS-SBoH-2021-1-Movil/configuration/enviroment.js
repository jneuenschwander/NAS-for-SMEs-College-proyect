import Constants from "expo-constants";

const { manifest } = Constants;
const URL = {
    //base:'http://nass2.bucaramanga.upb.edu.co/api/',
    base: `http://${manifest.debuggerHost.split(':').shift()}:4000/api/`,
    auth:'auth/',
    file: 'file/',
    admin: 'admin/'
}

export default URL