import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import Colors from '../constants/Colors';

export default function Index() {

  const router = useRouter();
  const { user, selfMonitor, caregiver } = useUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/welcome");
      return;
    } else if (user) {
      router.replace(!caregiver ? "/logado/user/home" : "/logado/responsavel/home");
    }
  }, [user]);


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
      />

      <Image
        source={require('../assets/images/sanare.png')}
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
    gap: '5%'
  }
});