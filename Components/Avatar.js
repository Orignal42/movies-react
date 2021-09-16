import React from 'react'
import { StyleSheet, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class Avatar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            avatar: require('../Images/ic_tag_faces.png')
        }
        this._avatarClicked = this._avatarClicked.bind(this)
    }

    _avatarClicked() {
        launchImageLibrary({}, (response) => {
            console.log(response);
            if (response.didCancel) {

            }
            else if (response.error) {
                console.log('Erreur : ', response.error)
            }
            else {
                console.log('Photo : ', response.assets[0].uri)
                let requireSource = { uri: response.assets[0].uri }
                this.setState({
                    avatar: requireSource
                })
            }
        })
        const requestCameraPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "App Camera Permission",
                        message: "App needs access to your camera ",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission given");
                    launchCamera({}, (response) => {
                        console.log(response);
                        if (response.didCancel) {
                            requestCameraPermission()

                        }
                        else if (response.error) {
                            console.log('Erreur : ', response.error)
                        }
                        else {
                            console.log('Photo : ', response.assets[0].uri)
                            let requireSource = { uri: response.assets[0].uri }
                            this.setState({
                                avatar: requireSource
                            })
                        }
                    });
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        };
        requestCameraPermission()

    }

    render() {
        return (
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={this._avatarClicked}>
                <Image style={styles.avatar} source={this.state.avatar} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity: {
        margin: 5,
        width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#9B9B9B',
        borderWidth: 2
    }
})

export default Avatar