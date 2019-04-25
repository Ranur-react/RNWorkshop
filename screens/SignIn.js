import React from 'react';
import { Button, TouchableOpacity, Text, TextInput, View } from 'react-native';

import { auth } from '../src/firebase.js';
import styles from './styles.js';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }
  handleEmailChange = (email) => {
    this.setState({ email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  handleSignUp = async () => {
    const { email, password } = this.state;
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      this.props.navigation.navigate('App');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };
  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign In</Text>

        {this.state.errorMessage !== '' && (
          <View style={styles.errorContainer}>
            <Text style={styles.textError}>{this.state.errorMessage}</Text>
          </View>
        )}
        <TextInput
          placeholder="email"
          placeholderTextColor="#6D757D"
          style={styles.textInput}
          onChangeText={this.handleEmailChange}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          placeholderTextColor="#6D757D"
          style={styles.textInput}
          onChangeText={this.handlePasswordChange}
        />
        <Button color="#4fd69c" title="Register" onPress={this.handleSignUp} />
        <TouchableOpacity
          style={styles.buttonTransparent}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignIn;
