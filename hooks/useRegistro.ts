import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type RegistroType = {
    humor?: string;
    hidratacao?: string;
    pressao?: string;
    glicemia?: string;
    imc?: string;
};

export const useRegistro = () => {
    const [registros, setRegistros] = useState<RegistroType>({});

    useEffect(() => {
        loadRegistros();
    }, []);

    const loadRegistros = async () => {
        try {
            const saved = await AsyncStorage.getItem('@registros');
            if (saved) {
                setRegistros(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Erro ao carregar registros', e);
        }
    };

    const updateRegistro = async (type: keyof RegistroType, date: string) => {
        try {
            const currentData = await AsyncStorage.getItem('@registros');
            const registrosAtuais = currentData ? JSON.parse(currentData) : {};

            const novosRegistros = { ...registrosAtuais, [type]: date };

            await AsyncStorage.setItem('@registros', JSON.stringify(novosRegistros));
            setRegistros(novosRegistros);

            return true;
        } catch (e) {
            console.error('Erro ao atualizar registro', e);
            return false;
        }
    };

    return { registros, loadRegistros, updateRegistro };
};