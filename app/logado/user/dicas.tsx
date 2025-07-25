import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// const API_KEY = 'api_live_yzL6FHSTwFTveo2V00AkOOOXWGXPJq7XJ1fKxg4RP'; // apitube.io
const API_KEY = 'pub_5898043526834fa5a53572f0215f2da9'; //newsData.io

const Dicas = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [noticias, setNoticias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const buscarNoticias = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        // `https://api.apitube.io/v1/news/everything?category.id=medtop:20000458,medtop:20000464,medtop:20001358,medtop:20000470,medtop:20001239&language.code=pt&q=&api_key=${API_KEY}`
        // https://api.apitube.io/v1/news/everything?title=health&language.code=pt&q=&api_key=${API_KEY}
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=pt&category=health&country=br`
      );
      const data = await response.json();
      setNoticias(data.results || []);
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarNoticias();
  }, []);

  const abrirLink = (url: string) => {
    if (url) Linking.openURL(url);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: Colors.light.bluePrimary,
      paddingTop: 50,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30,
      height: 120,
    },
    detalhe: {
      position: 'absolute',
      width: 417,
      height: 190,
      top: -90,
      left: 0,
    },
    headerTitle: {
      fontSize: 26,
      fontFamily: 'Poppins-Medium',
      color: '#fff',
      marginLeft: 119,
      marginRight: 20,
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    card: {
      backgroundColor: colors.saudeCard,
      padding: 16,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 16,
    },
    imagem: {
      width: 80,
      height: 80,
      borderRadius: 8,
      alignSelf: 'center',
    },
    dicaTitulo: {
      fontFamily: 'Poppins-Bold',
      color: Colors.light.bluePrimary,
      fontSize: 13,
    },
    dicaTexto: {
      fontFamily: 'Poppins-Regular',
      fontSize: 13,
      color: Colors.light.black,
    },
    fonteInfo: {
      fontSize: 11,
      color: '#666',
      marginTop: 4,
    },
    botaoLink: {
      marginTop: 15,
      backgroundColor: Colors.light.bluePrimary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: 150,
      height: 30,
      borderRadius: 8,
    },
    textoLink: {
      color: 'white',
      fontSize: 13,
      fontFamily: 'Poppins-Medium',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/detalhe.png')}
          style={styles.detalhe}
          resizeMode="cover"
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dicas</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.light.bluePrimary} />
        ) : (
          noticias.map((noticia, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={
                  noticia.image_url
                    ? { uri: noticia.image_url }
                    : require('@/assets/images/prevencao.png')
                }
                style={styles.imagem}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.dicaTitulo}>{noticia.title}</Text>
                {/* <Text style={styles.dicaTexto}>
                  {noticia.description || 'Sem descrição'}
                </Text> */}
                <Text style={styles.fonteInfo}>
                  {noticia.pubDate?.substring(0, 10)} |{' '}
                  {noticia.country?.[0]?.toUpperCase() || '??'} | {noticia.source_id}
                </Text>

                {noticia.link && (
                  <TouchableOpacity
                    style={styles.botaoLink}
                    onPress={() => abrirLink(noticia.link)}
                  >
                    <Text style={styles.textoLink}>Abrir no navegador</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Dicas;