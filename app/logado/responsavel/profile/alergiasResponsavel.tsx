import DropdownList from "@/components/DropdownList";
import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { getAllergies } from "@/http/get-allergies";
import { Allergy } from "@/interfaces/allergy";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AlergiasResponsavel() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const [antiInflamatorios, setAntiInflamatorios] = useState<
    { id: string; description: string }[]
  >([]);
  const [analgesicos, setAnalgesicos] = useState<
    { id: string; description: string }[]
  >([]);
  const [antibioticos, setAntibioticos] = useState<
    { id: string; description: string }[]
  >([]);
  const [anticonvulsivantes, setAnticonvulsivantes] = useState<
    { id: string; description: string }[]
  >([]);
  const [alergias, setAlergias] = useState<Allergy[] | undefined>(undefined);

  useEffect(() => {
    getAllergies()
      .then((response) => {
        setAlergias(response.allergies);
      })
      .catch((error) => {
        console.error("Erro ao carregar alergias:", error);
      });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: "10%",
      backgroundColor: colors.background,
    },
    scrollContainer: {
      paddingBottom: 50,
      paddingHorizontal: 20,
    },
    seta: {
      margin: 35,
      resizeMode: "contain",
      marginBottom: "20%",
    },
    body: {
      marginHorizontal: "10%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10%",
    },
    textView: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20%",
      width: "85%",
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontFamily: "Poppins-Regular",
      color: colors.black,
    },
    viewBtn: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "10%",
    },
    btn: {
      width: 250,
      height: 70,
      borderRadius: 50,
      overflow: "hidden",
    },
    btnText: {
      color: Colors.light.white,
      fontFamily: "Poppins-Medium",
      fontSize: 25,
    },
    btnGradient: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
  });

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => router.push("./edit-dados")}>
            <Image
              source={require("../../../../assets/images/seta.png")}
              style={styles.seta}
            />
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.textView}>
              <Text style={styles.text}>Selecione as alergias que possui.</Text>
            </View>

            <View>
              {alergias && (
                <>
                  <DropdownList
                    title="Antibióticos"
                    items={alergias
                      .filter((a) => a.type === "antibiotic")
                      .map((a) => ({
                        id: a.id,
                        name: a.name,
                      }))}
                    selected={antibioticos}
                    setSelected={setAntibioticos}
                  />

                  <DropdownList
                    title="Anti-inflamatórios"
                    items={alergias
                      .filter((a) => a.type === "anti-inflammatory")
                      .map((a) => ({
                        id: a.id,
                        name: a.name,
                      }))}
                    selected={antiInflamatorios}
                    setSelected={setAntiInflamatorios}
                  />

                  <DropdownList
                    title="Analgésicos"
                    items={alergias
                      .filter((a) => a.type === "analgesic")
                      .map((a) => ({
                        id: a.id,
                        name: a.name,
                      }))}
                    selected={analgesicos}
                    setSelected={setAnalgesicos}
                  />

                  <DropdownList
                    title="Anticonvulsivantes"
                    items={alergias
                      .filter((a) => a.type === "anticonvulsant")
                      .map((a) => ({
                        id: a.id,
                        name: a.name,
                      }))}
                    selected={anticonvulsivantes}
                    setSelected={setAnticonvulsivantes}
                  />
                </>
              )}
            </View>
          </View>
          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Keyboard.dismiss();
                router.push("./edit-dados");
              }}
            >
              <LinearGradient
                colors={["#005EB7", "#CEECF5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 3.8 }}
                style={styles.btnGradient}
              >
                <Text style={styles.btnText}>Salvar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
