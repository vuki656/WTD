import auth from '@react-native-firebase/auth'
import * as React from 'react'
import {
    Button,
    Text,
    View,
} from 'react-native'

export const Home: React.FunctionComponent = () => {
    const handleLogout = () => {
        void auth().signOut()
    }

    return (
        <View style={{ backgroundColor: 'red', marginTop: 200 }}>
            <Button
                onPress={handleLogout}
                title="Logout"
            />
            <Text>
                Hello122
            </Text>
        </View>
    )
}
