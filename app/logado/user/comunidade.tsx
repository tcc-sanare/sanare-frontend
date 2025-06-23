import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { useNavigation, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TABS = ['Para você', 'Salvos'];

const Dicas = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const [tabSelecionada, setTabSelecionada] = useState('Para você');
    const [salvos, setSalvos] = useState<string[]>([]);
    const { colors } = useTheme();

    const posts = [
        {
            id: '1',
            imagem: require('../../../assets/images/post1.png'),
            titulo: 'Dicas para\nemagrecimento',
            data: '16/05/25',
        },
        {
            id: '2',
            imagem: require('../../../assets/images/post2.png'),
            titulo: 'Receitas\nSaudáveis',
            data: '16/05/25',
        },
    ];


    const toggleSalvar = (id: string) => {
        setSalvos((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const renderPost = (post: { id: string; imagem: any; titulo: string; data: string }) => (
        <View key={post.id} style={{ marginTop: 34, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            <View style={{ position: 'relative' }}>
                <Image
                    source={post.imagem}
                    style={{ width: '100%', height: 204 }}
                    resizeMode="cover"
                />
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                }}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontFamily: 'Poppins-SemiBold',
                        color: '#fff',
                        lineHeight: 28,
                    }}>
                        {post.titulo}
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.push('./comentarios')}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 50,
                            paddingHorizontal: 24,
                            paddingVertical: 6,
                            marginTop: 12,
                        }}
                    >
                        <Text style={{
                            color: Colors.light.bluePrimary,
                            fontFamily: 'Poppins-Medium',
                            fontSize: 14,
                        }}>
                            Conversar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 10,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/images/Logocomunidade.png')}
                        style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
                    />
                    <View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: Colors.light.text }}>Sanare</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#999' }}>
                            Postado em {post.data}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => toggleSalvar(post.id)}>
                    <Image
                        source={
                            salvos.includes(post.id)
                                ? require('../../../assets/images/savecheio.png')
                                : require('../../../assets/images/savevazio.png')
                        }
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

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
            height: 130
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
            marginLeft: 100,
            marginRight: 0,
        },
        content: {
            paddingHorizontal: 20,
            paddingBottom: 40,
        },
        tabs: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        tab: {
            paddingBottom: 10,
            alignItems: 'center',
        },
        tabText: {
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: '#888',
        },
        tabTextSelected: {
            color: Colors.light.bluePrimary,
        },
        tabUnderline: {
            height: 3,
            width: '100%',
            backgroundColor: Colors.light.bluePrimary,
            marginTop: 4,
            borderRadius: 2,
        },
        navBar: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 95,
            width: '100%',
            backgroundColor: colors.background,
            paddingBottom: 10,
        },
        navItem: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        navIcon: {
            width: 33,
            height: 38,
            marginBottom: 4,
        },
        navIconActive: {
            tintColor: Colors.light.bluePrimary,
        },
        navText: {
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            color: colors.blackOpacity,
        },
        navTextActive: {
            fontFamily: 'Poppins-Medium',
            color: Colors.light.bluePrimary,
        },
    });

    const postsParaExibir =
        tabSelecionada === 'Para você'
            ? posts
            : posts.filter((post) => salvos.includes(post.id));

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Image
                        source={require('../../../assets/images/detalhe.png')}
                        style={styles.detalhe}
                        resizeMode="cover"
                    />
                    <Text style={styles.headerTitle}>Comunidade</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.tabs}>
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.tab}
                                onPress={() => setTabSelecionada(tab)}
                            >
                                <Text style={[
                                    styles.tabText,
                                    tabSelecionada === tab && styles.tabTextSelected
                                ]}>
                                    {tab}
                                </Text>
                                {tabSelecionada === tab && <View style={styles.tabUnderline} />}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* POSTS */}
                    {postsParaExibir.map(renderPost)}
                </View>
            </ScrollView>

            {/* NAV */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
                    <Image
                        source={require('../../../assets/images/inicio.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.navText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./comunidade')}>
                    <Image
                        source={require('../../../assets/images/comunidade.png')}
                        style={[styles.navIcon, styles.navIconActive]}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, styles.navTextActive]}>Comunidade</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./profile/profile')}>
                    <Image
                        source={require('../../../assets/images/perfil.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.navText}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Dicas;