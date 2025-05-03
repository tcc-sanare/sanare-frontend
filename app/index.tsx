import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from '../constants/Colors';

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        // style={styles.splashLogo}
      />

      <Image
        source={require('../assets/images/sanare.png')}
        // style={styles.sanare}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    gap:'5%'
  }
  // splashLogo:{},
  // sanare:{}
});